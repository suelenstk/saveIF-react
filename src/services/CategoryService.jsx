
class CategoryService {
    constructor() {
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
                // 'Authorization': servicoLogin.getAuthorization(),
            }),
            method: "GET"
        }).then(trataFetch);
    }

}

let categoryService = new CategoryService();

export default categoryService;