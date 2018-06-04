import React from 'react';
import Grid from "react-bootstrap/es/Grid";
import Row from "react-bootstrap/es/Row";
import Col from "react-bootstrap/es/Col";
import AlertNotification from "../../elements/AlertNotification/AlertNotification";
import notificationService from "../../services/NotificationService";

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





    render() {
        let campoNotifUsuario = null;

        if (this.state.listaNotifUsuario.totalPages) {
            campoNotifUsuario =
                <div>
                    {this.state.listaNotifUsuario.content.map((notificacao) => {
                        return <Row>
                            <Col md={10}>
                                <AlertNotification
                                    message={"Você " + notificacao.descricao}
                                    link={notificacao.link}
                                    textoLink={notificacao.textoLink}
                                    btnFirstName={"Aceitar"}
                                    btnSecondName={"Agora não"}
                                />
                            </Col>
                        </Row> 
                    })}
                </div>
        } else {
            console.log("entrou no else");
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

                        <h4 className="title">Convites para grupos(modelo estático)</h4>
                        <Row>
                            <Col md={10}>
                                <AlertNotification
                                    message={"Você foi convidado a participar do grupo Desenvolvimento de sistemas 2"}
                                    btnFirstName={"Aceitar"}
                                    btnSecondName={"Agora não"}
                                />
                            </Col>
                        </Row>
                        <h4 className="title">Solicitações de participação em grupos(modelo estático)</h4>
                        <Row>
                            <Col md={10}>
                                <AlertNotification
                                    message={"Pedro Silva solicitou participação no grupo Teste de Software"}
                                    btnFirstName={"Confirmar"}
                                    btnSecondName={"Excluir solicitação"}
                                />
                            </Col>
                        </Row>
                        <h4 className="title">Atualizações de grupos(modelo estático)</h4>
                        <Row>
                            <Col md={10}>
                                <AlertNotification
                                    btnCloseEvent={true}
                                    message={"O grupo ADS tem novas mensagens"}
                                />
                            </Col>
                        </Row>

                    </div>
                </Grid>
            </div>
        );
    }
}

export default Notifications;