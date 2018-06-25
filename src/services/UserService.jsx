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
    
    consultarEmail(email, sucesso, erro) {

        let trataFetch = (resultado) => {
            if (resultado.ok) {
                resultado.json().then(sucesso)
            } else {
                resultado.json().then(
                    (resultadoErro) => erro(resultadoErro)
                )
            }
        };

        fetch(`api/usuarios/email?email=${email}`, {
            method: "GET"
        }).then(trataFetch);
    }
    
    recuperar(id, sucesso, erro){
        let trataFetch = (resultado) => {
            if (resultado.ok) {
                resultado.json().then(sucesso)
            } else {
                resultado.json().then(
                    (resultadoErro) => erro(resultadoErro)
                )
            }
        };

        fetch(`api/usuarios/recuperar/${id}`, {
            method: "GET"
        }).then(trataFetch);
    }
    
    alterarSenha(codigo, usuario, sucesso, erro) {
        //console.log(item);
        fetch(`api/usuarios/recuperar?codigo=${codigo}`, {
            method: "PUT",
            headers: new Headers({
                'Content-Type': 'application/json'
            }),
            body: JSON.stringify(usuario)
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
    
    inserirCodigoRecuperacao(usuarioCodigo, sucesso, erro) {
        fetch(`api/usuarios/code`, {
            method: "POST",
            headers: new Headers({
                'Content-Type': 'application/json'
            }),
            body: JSON.stringify(usuarioCodigo)
        }).then((resultado) => {
            if (resultado.ok) {
                resultado.json().then(sucesso)
            } else {
                resultado.json().then(
                    (resultadoErro) => erro(resultadoErro)
                )
            }

        });
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
