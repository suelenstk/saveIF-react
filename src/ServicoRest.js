import servicoLogin from "./login/ServicoLogin";

export default class ServicoRest {

    constructor(url) {
        this.url = url;
    }

    apagar(id, sucesso, erro) {
        fetch(`${this.url}/${id}`, {
                headers: new Headers({
                    'Authorization': servicoLogin.getAuthorization()
                }),
                method: "DELETE"
            }
        ).then((resposta) => {
            if (resposta.ok) {
                sucesso();
            } else {
                resposta.json().then(erro);
            }

        });

    }

    inserir(item, sucesso, erro) {
        console.log(item);
        console.log("Aqui");
        fetch(this.url, {
            method: "POST",
            headers: new Headers({
                'Authorization': servicoLogin.getAuthorization(),
                'Content-Type': 'application/json'
            }),
            body: JSON.stringify(item)
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

    inserirSemAutorizacao(item, sucesso, erro) {
        console.log(item);
        fetch(this.url, {
            method: "POST",
            headers: new Headers({
                'Content-Type': 'application/json'
            }),
            body: JSON.stringify(item)
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

    editar(id, item, sucesso, erro) {
        console.log(item);
        fetch(`${this.url}/${id}`, {
            method: "PUT",
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


    listarPaginado(pagina, sucesso, erro) {

        let trataFetch = (resultado) => {
            if (resultado.ok) {
                resultado.json().then(sucesso)
            } else {
                resultado.json().then(
                    (resultadoErro) => erro(resultadoErro)
                )
            }
        };

        fetch(this.url + "?pagina=" + pagina, {
            headers: new Headers({
                'Authorization': servicoLogin.getAuthorization(),

            }),
            method: "GET"
        }).then(trataFetch);
    }

}