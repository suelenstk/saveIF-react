import ServicoRest from "../../../ServicoRest";
import servicoLogin from "../../../login/ServicoLogin";

export default class PostService extends ServicoRest {

    constructor() {
        super("api/posts");
    }   

    listarPostGeral(id, sucesso, erro) {


        let trataFetch = (resultado) => {

            if (resultado.ok) {
                resultado.json().then(sucesso)
            } else {
                resultado.json().then(
                    (resultadoErro) => erro(resultadoErro)
                )
            }
        };

        fetch(`api/grupos/${id}/geral`, {
            headers: new Headers({
                'Authorization': servicoLogin.getAuthorization(),

            }),
            method: "GET"
        }).then(trataFetch);
    }


}