import ServicoRest from "../ServicoRest";

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
        
}