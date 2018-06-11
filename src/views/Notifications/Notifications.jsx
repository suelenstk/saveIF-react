import React from 'react';
import Grid from "react-bootstrap/es/Grid";
import Row from "react-bootstrap/es/Row";
import Col from "react-bootstrap/es/Col";
import AlertNotification from "../../elements/AlertNotification/AlertNotification";
import notificationService from "../../services/NotificationService";
import GroupService from "../Groups/GroupService";
import UserService from "../../services/UserService";
import PaginationSaveIf from "../../elements/PaginationSaveIf/PaginationSaveIf";
import servicoLogin from "../../login/ServicoLogin";


class Notifications extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            listaNotifUsuario: "",
            sucesso: "",
            pagina: 0,
        };

        this.setState({
            listaNotifUsuario: this.listarNotificacaoUsuario(0)
        });
        this.groupService = new GroupService();
        this.userService = new UserService();
    }

    listarNotificacaoUsuario(pagina) {

        notificationService.listarNotificacaoUsuario(
            this.props.user.id, pagina,
            (sucesso) => {
                this.setState({listaNotifUsuario: sucesso});
            },
            (erro) => {
                console.log("Erro:");
                console.log(erro);
            }
        );
        this.setState({pagina: pagina});
    }

    aceitarSolicitacao(idGrupo, idUsuario, idNotificacao) {
        this.groupService.aceitarSolicitacao(
            idGrupo, idUsuario, idNotificacao,
            () => {
                this.listarNotificacaoUsuario(this.state.pagina);
            },
            (erro) => {
                console.log("Erro:");
                console.log(erro);
            }
        );
    }

    recusarSolicitacao(idGrupo, idUsuario, idNotificacao) {
        this.groupService.recusarSolicitacao(
            idGrupo, idUsuario, idNotificacao,
            () => {
                this.listarNotificacaoUsuario(this.state.pagina);
            },
            (erro) => {
                console.log("Erro:");
                console.log(erro);
            }
        );
    }

    aceitarConvite(idGrupo, idNotificacao) {
        this.userService.aceitarConvite(
            idGrupo, servicoLogin.getUsuario(), idNotificacao,
            () => {
                this.listarNotificacaoUsuario(this.state.pagina);
            },
            (erro) => {
                console.log("Erro:");
                console.log(erro);
            }
        );
    }

    recusarConvite(idGrupo, idNotificacao) {
        this.userService.recusarConvite(
            idGrupo, servicoLogin.getUsuario(), idNotificacao,
            () => {
                this.listarNotificacaoUsuario(this.state.pagina);
            },
            (erro) => {
                console.log("Erro:");
                console.log(erro);
            }
        );
    }


    render() {
        let campoNotifUsuario = null;

        if (this.state.listaNotifUsuario.totalPages) {
            campoNotifUsuario =
                <div>
                    {this.state.listaNotifUsuario.content.map((notificacao) => {
                        return <Row key={notificacao.id}>
                            <Col md={10}>
                                <AlertNotification
                                    linkUsuario={notificacao.linkUsuario}
                                    textoUsuario={notificacao.textoUsuario}
                                    mensagem={notificacao.descricao}
                                    linkGrupo={notificacao.linkGrupo}
                                    textoGrupo={notificacao.textoGrupo}
                                    btnCloseEvent={notificacao.tipo !== "mensagem" ? "disable" :
                                        () => {

                                        }}
                                    btnFirstName={notificacao.tipo === "solicitacao" ? "Confirmar" :
                                        (notificacao.tipo === "convite" ? "Aceitar" : "disable")}
                                    btnFirstEvent={() => {
                                        if (notificacao.tipo === "solicitacao") {
                                            this.aceitarSolicitacao(notificacao.linkGrupo, notificacao.linkUsuario, notificacao.id);
                                        } else if (notificacao.tipo === "convite") {
                                            this.aceitarConvite(notificacao.linkGrupo, notificacao.id);
                                        }
                                    }}
                                    btnSecondName={notificacao.tipo === "solicitacao" ? "Excluir solicitação" :
                                        (notificacao.tipo === "convite" ? "Recusar" : "disable")}
                                    btnSecondEvent={() => {
                                        if (notificacao.tipo === "solicitacao") {
                                            this.recusarSolicitacao(notificacao.linkGrupo, notificacao.linkUsuario, notificacao.id);
                                        } else if (notificacao.tipo === "convite") {
                                            this.recusarConvite(notificacao.linkGrupo, notificacao.id);
                                        }
                                    }}
                                />
                            </Col>
                        </Row>
                    })}
                </div>
        } else {
            campoNotifUsuario =
                <div style={{margin: "20px"}}>
                    <p>Você não tem notificações</p>
                </div>
        }

        return (
            <div className="content">
                <Grid fluid>
                    <div className="content">
                        <h4 className="title">Notificações de usuário</h4>
                        {campoNotifUsuario}
                    </div>
                </Grid>
                <PaginationSaveIf
                    lista={this.state.listaNotifUsuario}
                    pagina={this.state.pagina}
                    setPagina={(pagina) => {
                        this.listarNotificacaoUsuario(pagina);
                    }}
                />
            </div>
        );
    }
}

export default Notifications;