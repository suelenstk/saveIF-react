import servicoLogin from "../login/ServicoLogin";

class NotificationService{

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

        fetch(`/api/usuarios/${id}/notificacoes`, {
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

}

let notificationService = new NotificationService();

export default notificationService;