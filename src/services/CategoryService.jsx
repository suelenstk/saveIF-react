import servicoLogin from "../login/ServicoLogin";
import ServicoRest from "../ServicoRest";

export default class CategoryService extends ServicoRest{
    
    constructor() {
            super("api/grupos");
    }
    
    listarNaoPaginado(sucesso, erro) {

        let trataFetch = (resultado) => {
            if (resultado.ok) {
                resultado.json().then(sucesso)
            } else {
                resultado.json().then(
                    (resultadoErro) => erro(resultadoErro)
                )
            }
        };

        fetch("/api/categorias", {
            headers: new Headers({
               'Authorization': servicoLogin.getAuthorization(),
            }),
            method: "GET"
        }).then(trataFetch);
    }

}