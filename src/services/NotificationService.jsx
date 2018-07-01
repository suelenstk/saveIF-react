import servicoLogin from "../login/ServicoLogin";

class NotificationService {

    listarNotificacaoUsuario(id, pagina, sucesso, erro) {

        let trataFetch = (resultado) => {

            if (resultado.ok) {
                resultado.json().then(sucesso)
            } else {
                resultado.json().then(
                    (resultadoErro) => erro(resultadoErro)
                )
            }
        };

        fetch(`/api/usuarios/${id}/notificacoes?pagina=`+ pagina, {
            headers: new Headers({
                'Authorization': servicoLogin.getAuthorization(),

            }),
            method: "GET"
        }).then(trataFetch);
    }

    listarNotificacaoGrupo(id, pagina, sucesso, erro) {


        let trataFetch = (resultado) => {
            if (resultado.ok) {
                resultado.json().then(sucesso)
            } else {
                resultado.json().then(
                    (resultadoErro) => erro(resultadoErro)
                )
            }
        };
        fetch(`/grupos/${id}/notificacoes`, {
            headers: new Headers({
                'Authorization': servicoLogin.getAuthorization(),

            }),
            method: "GET"
        }).then(trataFetch);
    }

    apagar(id, sucesso, erro) {
        fetch(`/api/notificacoes/${id}`, {
                headers: new Headers({
                    'Authorization': servicoLogin.getAuthorization()
                }),
                method: "DELETE"
            }
        ).then((resposta) => {
            if (resposta.ok) {
                sucesso();
            } else {
                resposta.json().then(erro);
            }

        });

    }

    numeroNotificacoesUsuario(id, sucesso, erro) {

        let trataFetch = (resultado) => {
            if (resultado.ok) {
                resultado.json().then(sucesso)
            } else {
                resultado.json().then(
                    (resultadoErro) => erro(resultadoErro)
                )
            }
        };
        fetch(`/api/usuarios/${id}/numeronotificacoes`, {
            headers: new Headers({
                'Authorization': servicoLogin.getAuthorization(),
            }),
            method: "GET"
        }).then(trataFetch);
    }

}

let notificationService = new NotificationService();

export default notificationService;