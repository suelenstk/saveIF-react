import React, {Component} from 'react';
import Alert from "react-bootstrap/es/Alert";
import Button from "react-bootstrap/es/Button";


export class AlertNotification extends Component {
    render() {
        return (
            <Alert bsStyle="info" className="alert-with-icon">
                {(this.props.btnCloseEvent) ?
                    <Button
                        type="button"
                        aria-hidden="true"
                        className="close"
                        onClick={(e) => {
                        }}
                    >
                        &#x2715;
                    </Button> :
                    <Button className="close" style={{display: "none"}}/>
                }
                <span data-notify="icon" className="pe-7s-bell"/>
                <span data-notify="message">
                    {/*usuario com link, caso exista*/}
                    {this.props.textoUsuario != null ?
                        this.props.textoUsuario
                        : ""}

                    {/* TODO habilitar quando a tarefa 1.12 Ver perfil dos usuarios estiver implementada */}
                    {/*<a href={this.props.linkUsuario}>*/}
                    {/*{this.props.textoUsuario}*/}
                    {/*</a> :*/}
                    {/*""}*/}

                    {/*mensagem principal vinda do servidor*/}
                    {this.props.mensagem}

                    {/*grupo com link, que sempre existira, na modelagem atual*/}
                    <a href={this.props.linkGrupo}>
                    {this.props.textoGrupo}
                </a>

                </span>


                {(this.props.btnFirstName) ?
                    <Button
                        className="btnFirstAction"
                        onClick={(e) => {
                            if (this.props.btnFirstEvent) {
                            }
                        }}
                    >
                        {this.props.btnFirstName}
                    </Button> : ""}
                {(this.props.btnSecondName) ?
                    <Button
                        className="btnSecondAction"
                        onClick={(e) => {
                            if (this.props.btnSecondEvent) {
                            }
                        }}
                    >
                        {this.props.btnSecondName}
                    </Button> : ""}
            </Alert>
        );
    }
}

export default AlertNotification;