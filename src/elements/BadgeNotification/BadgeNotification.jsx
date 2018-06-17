import React, {Component} from 'react';
import Badge from "react-bootstrap/es/Badge";
import notificationService from "../../services/NotificationService";
import servicoLogin from "../../login/ServicoLogin";

export class BadgeNotification extends Component {
    constructor(props) {
        super(props);
        this.state = {
            totalNotificacoes: null
        };
        this.numeroNotificacoesUsuario();
    }

    async numeroNotificacoesUsuario() {
        while (true) {
            await this.sleep(1000);
            notificationService.numeroNotificacoesUsuario(
                servicoLogin.getUsuario(),
                (sucesso) => {
                    this.setState({totalNotificacoes: sucesso});
                },
                (erro) => {
                    console.log("Erro:");
                    console.log(erro);
                }
            );
        }
    }

    sleep(tempo) {
        return new Promise((e) => setTimeout(e, tempo));
    }

    render() {
        let badge = "";
        if (this.state.totalNotificacoes !== 0) {
            badge =
                <Badge id="notification">{this.state.totalNotificacoes}</Badge>;
        } else {
            badge = "";
        }
        return (
            <div>
                {badge}
            </div>
        );
    }
}

export default BadgeNotification;