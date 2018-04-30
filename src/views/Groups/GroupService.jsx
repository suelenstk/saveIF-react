import ServicoRest from "../../ServicoRest";
import servicoLogin from "../../login/ServicoLogin";

export default class GroupService extends ServicoRest {

    constructor() {
        super("api/grupos");
    }

    listarGrupoIntegrantes(id,pagina, sucesso, erro) {


        let trataFetch = (resultado) => {

            if (resultado.ok) {
                resultado.json().then(sucesso)
            } else {
                resultado.json().then(
                    (resultadoErro) => erro(resultadoErro)
                )
            }
        };

        fetch(`api/grupos/integrantes/${id}?pagina=` + pagina, {
            headers: new Headers({
                'Authorization': servicoLogin.getAuthorization(),

            }),
            method: "GET"
        }).then(trataFetch);
    }

    listarParticipantes(id,pagina, sucesso, erro) {


        let trataFetch = (resultado) => {

            if (resultado.ok) {
                resultado.json().then(sucesso)
            } else {
                resultado.json().then(
                    (resultadoErro) => erro(resultadoErro)
                )
            }
        };

        fetch(`api/usuario/participantes/${id}?pagina=` + pagina, {
            headers: new Headers({
                'Authorization': servicoLogin.getAuthorization(),

            }),
            method: "GET"
        }).then(trataFetch);
    }
    
    solicitar(id, item, sucesso, erro) {
        console.log(item);
        fetch(`api/grupos/solicitar/${id}`, {
            method: "POST",
            headers: new Headers({
                'Authorization': servicoLogin.getAuthorization(),
                'Content-Type': 'application/json'
            }),
            body: JSON.stringify(item)
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