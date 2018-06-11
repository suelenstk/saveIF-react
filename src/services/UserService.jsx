import ServicoRest from "../ServicoRest";
import servicoLogin from "../login/ServicoLogin";

export default class UserService extends ServicoRest {
    constructor() {
        super("api/usuarios/");
    }

    consultarExistencia(email, sucesso, erro) {

        let trataFetch = (resultado) => {
            if (resultado.ok) {
                resultado.json().then(sucesso)
            } else {
                resultado.json().then(
                    (resultadoErro) => erro(resultadoErro)
                )
            }
        };

        fetch(`api/usuarios/consultar?email=${email}`, {
            method: "GET"
        }).then(trataFetch);
    }

    aceitarConvite(idGrupo, idUsuario, idNotificacao, sucesso, erro) {
        fetch(`api/usuarios/${idUsuario}/convite/${idGrupo}/aceite/${idNotificacao}`, {
            method: "PUT",
            headers: new Headers({
                'Authorization': servicoLogin.getAuthorization(),
                'Content-Type': 'application/json'
            })
        }).then((resultado) => {
            if (resultado.ok) {
                sucesso();
            } else {
                resultado.json().then(
                    (resultadoErro) => erro(resultadoErro)
                )
            }
        });
    }

    recusarConvite(idGrupo, idUsuario, idNotificacao, sucesso, erro) {
        fetch(`api/usuarios/${idUsuario}/convite/${idGrupo}/negacao/${idNotificacao}`, {
            method: "PUT",
            headers: new Headers({
                'Authorization': servicoLogin.getAuthorization(),
                'Content-Type': 'application/json'
            })
        }).then((resultado) => {
            if (resultado.ok) {
                sucesso();
            } else {
                resultado.json().then(
                    (resultadoErro) => erro(resultadoErro)
                )
            }
        });
    }

}
