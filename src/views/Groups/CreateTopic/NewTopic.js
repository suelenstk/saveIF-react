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
            error: "",
            msgErro: "",
            erroTopico: this.props.erroTopico
        };

        this.topicService = new TopicService();

        this.listarTopicos(0);

    }

    listarTopicos(pagina) {
        this.topicService.listarTopicosGrupo(this.props.idGrupo, pagina,
            (resultado) => {
                console.log(resultado);
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
        this.setState({topic: proximoEstado.topic});
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
        this.setError("");

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
            this.setError("", "");
            return false;
        }
    }

    confirmar() {

        if (this.verificaSeErroMudou()) {

        } else if (this.state.topic.nome) {
            this.props.inserir(this.state.topic);

            this.setConfigNovoTopico();


        } else {
            this.setError("error", "Campo nome não pode ser vazio!");
        }
        this.listarTopicos(this.state.pagina);
    }

    verTopico(id, topico) {

        return (topico.nome === 'Geral') ? `MyGroups/${id}/geral` : `MyGroups/${id}/posts/${topico.id}`;
    }

    render() {

        let erroTopico = null;

        let statusNext = true;
        let statusPrev = true;
        //alert(this.state.pagina.totalPages);

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
                            <form>
                                <Table responsive>
                                    {this.state.topico.content.map((topico) => {
                                        return <Link to={{pathname: `/${this.verTopico(this.props.idGrupo, topico)}`}}>
                                            <UserChip
                                                value={this.props.idGrupo}
                                                key={this.props.idGrupo}
                                                nome={topico.nome}
                                                alt={topico.nome}
                                                icone="pe-7s-folder"
                                                largura="30%"
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
                                        <td><Button style={{borderStyle: "none", display: this.state.campoNomeTopico}}
                                                    onClick={() => {
                                                        this.confirmar();
                                                    }}><img src={done} alt="" width="25px" height="20px"/></Button></td>
                                    </tr>
                                </Table>

                                <Button
                                    bsStyle="danger"
                                    pullRight
                                    fill
                                    block
                                    onClick={() => {
                                        this.setConfigNovoTopico();
                                    }}
                                >
                                    {this.state.adicionarTopico}
                                </Button>
                                <div className="clearfix"/>
                            </form>
                        }

                    />
                </Col>


            );
        else
            return <div/>
    }
}
