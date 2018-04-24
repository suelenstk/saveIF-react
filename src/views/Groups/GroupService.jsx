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

}