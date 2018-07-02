import React, {Component} from 'react';
import {Col, Grid, Image, Row} from 'react-bootstrap';
import ListParticipants from './ListParticipants.jsx';
import Card from '../../components/Card/Card';
import Button from '../../elements/CustomButton/CustomButton.jsx';
import GroupService from './GroupService';
import ServicoLogin from '../../login/ServicoLogin';
import Alert from "react-bootstrap/es/Alert";

class GroupEnter extends Component {

    constructor(props) {
        super(props);

        this.state = {
            grupo: {nome: ""},
            id: this.props.id,
            solicitar: this.props.solicitar,
            idUsuario: this.props.user,
            pagina: ""
        };

        this.GroupService = new GroupService();
        this.listarGrupo();
        this.listarParticipantes();
    }

    setarItem(paginaResultado) {
        this.setState({
            pagina: paginaResultado
        });
    }

    setarGrupo(resultado) {
        this.setState({
            grupo: resultado
        });
    }


    listarParticipantes() {
        this.GroupService.listarParticipantes(this.state.id, 0,
            (resultado) => {
                this.setarItem(resultado);
            },
            (erro) => {
                console.log("Erro:");
                console.log(erro);
            }
        );
    }

    listarGrupo() {
        this.GroupService.listarGrupoEspecifico(this.state.id,
            (resultado) => {
                this.setarGrupo(resultado);
                this.verificarSolicitante();
            },
            (erro) => {
                console.log("Erro:");
                console.log(erro);
            }
        );
    }

    confirmar() {
        this.state.solicitar(this.state.id, this.state.idUsuario);
        this.setState({solicitante: true});
    }

    verificarSolicitante() {
        let resultado = false;
        for (let i = 0; i < this.state.grupo.solicitantesGrupo.length; i++) {
            if (this.state.idUsuario === this.state.grupo.solicitantesGrupo[i].id) {
                resultado = true;
            }
        }
        this.setState({solicitante: resultado});
    }

    render() {
        let btnSolicitacao = "";
        if (this.state.grupo.tipoPrivacidade) {
            if (this.state.grupo.tipoPrivacidade.toLowerCase() !== "privado") {
                if (!this.state.solicitante) {
                    btnSolicitacao = <Button
                        className="btnSaveif"
                        pullRight
                        fill
                        type="submit"
                        onClick={() => {
                            this.confirmar()
                        }}>
                        Solicitar Inscrição
                    </Button>;
                } else {
                    btnSolicitacao = <Alert bsStyle="success" id="res" style={{float: "right"}}>
                        Solicitação enviada, aguardando resposta.
                    </Alert>;
                }
            }
        }

        if (this.state.grupo.nome !== "")
            return (
                <div className="content">
                    <Grid fluid>
                        <Row>
                            <Col md={12}>
                                <Card
                                    ctAllGroups
                                    content={
                                        <Row>
                                            <Image src={"/api/grupos/" + this.props.id + "/imagem?" +
                                            ServicoLogin.getAuthorizationGet()} responsive width="450"/>
                                            <Col lg={12} md={12} sm={12} xs={12}>
                                                <h2>{this.state.grupo.nome}</h2>
                                                <br/>
                                                <h5>Descrição</h5>
                                                <p style={{marginLeft: 20}}>{this.state.grupo.descricao}</p>
                                                <br/>
                                                <h5>Categorias</h5>
                                                <p style={{marginLeft: 20}}>{this.state.grupo.categoria.nome}</p>
                                                <br/>
                                                <h5>Tipo de privacidade</h5>
                                                <p style={{marginLeft: 20}}>{this.state.grupo.tipoPrivacidade}</p>
                                                <br/>
                                                <h5>Participantes</h5>
                                                <ListParticipants pagina={this.state.pagina}/>
                                                {btnSolicitacao}
                                                <br/><br/>
                                                <hr/>
                                            </Col>
                                        </Row>
                                    }
                                />
                            </Col>
                        </Row>
                    </Grid>
                </div>
            );
        else
            return <div>Não foi selecionado nenhum grupo.</div>
    }
}

export default GroupEnter;