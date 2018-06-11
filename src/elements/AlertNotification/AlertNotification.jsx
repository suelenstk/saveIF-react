import React, {Component} from 'react';
import Alert from "react-bootstrap/es/Alert";
import Button from "react-bootstrap/es/Button";


export class AlertNotification extends Component {
    render() {
        return (
            <Alert bsStyle="info" className="alert-with-icon">
                {(this.props.btnCloseEvent === "disable") ?
                    <Button className="close" style={{display: "none"}}/> :
                    <Button
                        type="button"
                        aria-hidden="true"
                        className="close"
                        onClick={(e) => {
                            if (this.props.btnCloseEvent) {
                                this.props.btnCloseEvent();
                            }
                        }}
                    >
                        &#x2715;
                    </Button>
                }
                <span data-notify="icon" className="pe-7s-bell"/>
                <span data-notify="message">
                    {/*usuario com link, caso exista*/}
                    {this.props.textoUsuario !== "" ?
                        this.props.textoUsuario
                        : ""}

                    {/* TODO habilitar quando a tarefa 1.12 Ver perfil dos usuarios estiver implementada */}
                    {/*<a href={"/#/usuarios/" + this.props.linkUsuario}>*/}
                    {/*{this.props.textoUsuario}*/}
                    {/*</a> :*/}
                    {/*""}*/}

                    {/*mensagem principal vinda do servidor*/}
                    {this.props.mensagem}

                    {/*grupo com link, que sempre existira, na modelagem atual*/}
                    <a href={"/#/MyGroups/" + this.props.linkGrupo + "/geral"}>
                    {this.props.textoGrupo}
                </a>

                </span>


                {(this.props.btnFirstName === "disable") ? "" :
                    <Button
                        className="btnFirstAction"
                        onClick={() => {
                            if (this.props.btnFirstEvent) {
                                this.props.btnFirstEvent();
                            }
                        }}
                    >
                        {this.props.btnFirstName}
                    </Button>}
                {(this.props.btnSecondName === "disable") ? "" :
                    <Button
                        className="btnSecondAction"
                        onClick={() => {
                            if (this.props.btnSecondEvent) {
                                this.props.btnSecondEvent();
                            }
                        }}
                    >
                        {this.props.btnSecondName}
                    </Button>}
            </Alert>
        );
    }
}

export default AlertNotification;