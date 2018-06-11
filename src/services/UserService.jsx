import ServicoRest from "../ServicoRest";
import servicoLogin from "../login/ServicoLogin";

export default class UserService extends  ServicoRest {
        constructor(){
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

    solicitarParticipacao(idUsuario, idGrupo, sucesso, erro) {
        fetch(`api/usuarios/${idUsuario}/grupos/${idGrupo}`, {
            method: "POST",
            headers: new Headers({
                'Authorization': servicoLogin.getAuthorization()
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