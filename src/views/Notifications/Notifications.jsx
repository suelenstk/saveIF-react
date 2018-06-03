import React, {Component} from 'react';
import Grid from "react-bootstrap/es/Grid";
import Row from "react-bootstrap/es/Row";
import Col from "react-bootstrap/es/Col";
import AlertNotification from "../../elements/AlertNotification/AlertNotification";

class Notifications extends Component {
    render() {
        return (
            <div className="content">
                <Grid fluid>
                    <div className="content">
                        <h4 className="title">Convites para grupos</h4>
                        <Row>
                            <Col md={10}>
                                <AlertNotification
                                    message={"Você foi convidado a participar do grupo Desenvolvimento de sistemas 2"}
                                    btnFirstName={"Aceitar"}
                                    btnSecondName={"Agora não"}
                                />
                            </Col>
                        </Row>
                        <h4 className="title">Solicitações de participação em grupos</h4>
                        <Row>
                            <Col md={10}>
                                <AlertNotification
                                    message={"Pedro Silva solicitou participação no grupo Teste de Software"}
                                    btnFirstName={"Confirmar"}
                                    btnSecondName={"Excluir solicitação"}
                                />
                            </Col>
                        </Row>
                        <h4 className="title">Atualizações de grupos</h4>
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