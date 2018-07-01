import servicoLogin from "../../../login/ServicoLogin";

export default class TopicService {

    inserirEmGrupo(item, idGrupo, sucesso, erro) {
        // console.log(item);

        fetch(`api/topicos/${idGrupo}`, {
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

    listarTopicosGrupo(id, pagina, sucesso, erro) {


        let trataFetch = (resultado) => {

            if (resultado.ok) {
                resultado.json().then(sucesso)

            } else {
                resultado.json().then(
                    (resultadoErro) => erro(resultadoErro)
                )
            }
        };

        fetch(`api/grupos/${id}/topicos?pagina=` + pagina, {
            headers: new Headers({
                'Authorization': servicoLogin.getAuthorization(),
            }),
            method: "GET"
        }).then(trataFetch);
    }

    listarTopicosEspecifico(id, sucesso, erro) {


        let trataFetch = (resultado) => {

            if (resultado.ok) {
                resultado.json().then(sucesso)

            } else {
                resultado.json().then(
                    (resultadoErro) => erro(resultadoErro)
                )
            }
        };

        fetch(`api/topicos/${id}`, {
            headers: new Headers({
                'Authorization': servicoLogin.getAuthorization(),

            }),
            method: "GET"
        }).then(trataFetch);
    }

    marcarTopicoResolvido(idGrupo, idTopico, sucesso, erro) {
        fetch(`api/grupos/${idGrupo}/topicos/${idTopico}/resolvido`, {
            method: "PUT",
            headers: new Headers({
                'Authorization': servicoLogin.getAuthorization()
            })
        }).then((resultado) => {
            if (resultado.ok) {
                sucesso()
            } else {
                resultado.json().then(
                    (resultadoErro) => erro(resultadoErro)
                )
            }
        });
    }

}