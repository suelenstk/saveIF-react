import React from 'react';
import {Col, ControlLabel, FormControl, FormGroup, Table} from 'react-bootstrap';
import {Card} from '../../../components/Card/Card.jsx';
import Button from '../../../elements/CustomButton/CustomButton.jsx';
import done from "../../../assets/img/done.png";
import HelpBlock from "react-bootstrap/es/HelpBlock";
import TopicService from './TopicService';
import {Link} from 'react-router-dom';
import Pager from "react-bootstrap/es/Pager";
import UserChip from "../../../elements/UserChip/UserChip";

export default class NewTopic extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            topic: this.props.topic,
            campoNomeTopico: "none",
            adicionarTopico: "Novo Tópico",
            topico: {titulo: "teste"},
            pagina: 0,
            campoTopico: false,
            error: null,
            msgErro: "",
            erroTopico: this.props.erroTopico,
            grupo: this.props.grupo,
            coordenador: this.props.coordenador
        };
        this.topicService = new TopicService();
        this.listarTopicos(0);
    }

    listarTopicos(pagina) {
        this.topicService.listarTopicosGrupo(this.state.grupo.id, pagina,
            (resultado) => {
                this.setarTopico(resultado);
            },
            (erro) => {
                console.log("Erro:");
                console.log(erro);
            }
        );
    }

    setarTopico(resultado) {
        this.setState({
            topico: resultado
        });
    }

    componentWillReceiveProps(proximoEstado) {
        this.setState({
            topic: proximoEstado.topic,
            erroTopico: proximoEstado.erroTopico,
            grupo: proximoEstado.grupo,
            coordenador: proximoEstado.coordenador
        });
        this.listarTopicos(this.state.pagina);
    }

    setNome(valor) {
        this.setState(
            (anterior) => {
                anterior.topic.nome = valor;
                return anterior;
            }
        );
    }

    setConfigNovoTopico() {
        this.setState({
            campoTopico: !this.state.campoTopico
        });

        if (!this.state.campoTopico) {
            this.setState({
                campoNomeTopico: "",
                adicionarTopico: "Cancelar",
            });
        } else {
            this.setState({
                campoNomeTopico: "none",
                adicionarTopico: "Novo Tópico"
            });
        }
        this.setNome("");
        this.setError(null);
    }

    setError(estilo, msg) {
        this.setState({
            error: estilo,
            msgErro: msg
        });
    }

    verificaSeErroMudou() {
        let nome = this.state.topic.nome;
        let convertido = nome.toLowerCase();

        if (convertido === "geral") {
            this.setError("error", "Tópico " + nome + " não pode ser utilizado!");
            return true;
        } else {
            this.setError(null, "");
            return false;
        }
    }

    confirmar() {
        if (this.verificaSeErroMudou()) {

        } else if (this.state.topic.nome) {
            this.props.inserir(this.state.topic,
                () => {
                    this.listarTopicos(this.state.pagina);
                }
            );
            this.setConfigNovoTopico();
        } else {
            this.setError("error", "Campo nome não pode ser vazio!");
        }
    }

    static verTopico(id, topico) {
        return (topico.nome === 'Geral') ? `MyGroups/${id}/geral` : `MyGroups/${id}/posts/${topico.id}`;
    }

    render() {
        let erroTopico = null;

        let statusNext = true;
        let statusPrev = true;

        if (this.state.pagina > 0) {
            statusPrev = false;
        }

        if (this.state.pagina < this.state.topico.totalPages - 1) {
            statusNext = false;
        }

        if (this.state.error === "error") {

            erroTopico = <HelpBlock>{this.state.msgErro}</HelpBlock>

        } else erroTopico = "";

        if (this.state.topico.titulo !== "teste")
            return (
                <Col md={4}>
                    <Card
                        title="Tópicos"

                        legend={
                            <Pager>
                                {(!statusPrev) ?
                                    <Pager.Item
                                        previous
                                        disabled={statusPrev}
                                        onClick={() => {
                                            this.listarTopicos(this.state.pagina - 1);
                                            this.state.pagina--;
                                        }}
                                    >
                                        &lt; Anterior
                                    </Pager.Item> : ""}
                                {(!statusNext) ?
                                    <Pager.Item
                                        next
                                        disabled={statusNext}
                                        onClick={() => {
                                            this.listarTopicos(this.state.pagina + 1);
                                            this.state.pagina++;
                                        }}
                                    >
                                        Próxima &gt;
                                    </Pager.Item> : ""}

                            </Pager>
                        }

                        content={
                            <div>
                                <Table responsive>
                                    {this.state.topico.content.map((topico) => {
                                        return <Link key={topico.id}
                                                     to={{pathname: `/${NewTopic.verTopico(this.state.grupo.id, topico)}`}}>
                                            <UserChip
                                                value={this.state.grupo.id}
                                                key={this.state.grupo.id}
                                                nome={topico.nome}
                                                alt={topico.nome}
                                                topico={topico.dataFinalizacao ? "pe-7s-check" : "pe-7s-folder"}
                                                largura="30%"
                                                resolvido={!!topico.dataFinalizacao}
                                            />
                                        </Link>
                                    })}
                                    <tr>
                                        <td style={{display: this.state.campoNomeTopico}}>
                                            <FormGroup controlId="formControlsText" validationState={this.state.error}>
                                                <ControlLabel>Nome</ControlLabel>

                                                <FormControl
                                                    type="text"
                                                    placeholder="Nome do Tópico"
                                                    value={this.state.topic.nome}
                                                    onChange={(e) => this.setNome(e.target.value)}
                                                />
                                                <FormControl.Feedback/>

                                            </FormGroup>
                                            {erroTopico}
                                        </td>
                                        <td>
                                            <Button
                                                style={{borderStyle: "none", display: this.state.campoNomeTopico}}
                                                onClick={() => {
                                                    this.confirmar();
                                                }}
                                            >
                                                <img src={done} alt="" width="25px" height="20px"/>
                                            </Button>
                                        </td>
                                    </tr>
                                </Table>

                                {this.state.coordenador ?
                                    <Button
                                        style={{width: "100%"}}
                                        className="btnSaveif"
                                        pullRight
                                        fill
                                        block
                                        onClick={() => {
                                            this.setConfigNovoTopico();
                                        }}
                                    >
                                        {this.state.adicionarTopico}
                                    </Button> : ""
                                }
                                <div className="clearfix"/>
                                <br/>
                            </div>
                        }
                    />
                </Col>
            );
        else
            return <div/>
    }
}
