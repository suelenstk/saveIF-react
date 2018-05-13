import ServicoRest from "../ServicoRest";
import servicoLogin from "../login/ServicoLogin";

class ListUserService extends ServicoRest{
    constructor() {
        super("api/usuarios");
    }

    listarNaoPaginado( sucesso, erro) {

        let trataFetch = (resultado) => {

            if (resultado.ok) {
                resultado.json().then(sucesso)
            } else {
                resultado.json().then(
                    (resultadoErro) => erro(resultadoErro)
                )
            }
        };

        fetch("/api/usuarios/listar",{
            headers: new Headers({
                'Authorization': servicoLogin.getAuthorization(),
            }),
            method: "GET"
        }).then(trataFetch);
    }

    pesquisarPaginado(nome, pagina, sucesso, erro) {
        let trataFetch = (resultado) => {
            if (resultado.ok) {
                resultado.json().then(sucesso)
            } else {
                resultado.json().then(
                    (resultadoErro) => erro(resultadoErro)
                )
            }
        };

        fetch("/api/usuarios/pesquisar/nome?contem=" + nome + "&pagina=" + pagina, {
            headers: new Headers({
                'Authorization': servicoLogin.getAuthorization(),
            }),
            method: "GET"
        }).then(trataFetch);

    }

}

let listUserService = new ListUserService();

export default listUserService;