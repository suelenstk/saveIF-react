
import servicoLogin from "../../../login/ServicoLogin";

export default class PostService {

    listarPostGeral(id,pagina, sucesso, erro) {


        let trataFetch = (resultado) => {

            if (resultado.ok) {
                resultado.json().then(sucesso)
            } else {
                resultado.json().then(
                    (resultadoErro) => erro(resultadoErro)
                )
            }
        };

        fetch(`api/grupos/${id}/geral?pagina=` + pagina, {
            headers: new Headers({
                'Authorization': servicoLogin.getAuthorization(),

            }),
            method: "GET"
        }).then(trataFetch);
    }

    
    listarPostEspecifico(id,idt,pagina,sucesso, erro) {

        let trataFetch = (resultado) => {

            if (resultado.ok) {
                resultado.json().then(sucesso);
            } else {
                resultado.json().then(
                    (resultadoErro) => erro(resultadoErro)
                )
            }
        };

        fetch(`api/grupos/${id}/posts/${idt}?pagina=` + pagina, {
            headers: new Headers({
                'Authorization': servicoLogin.getAuthorization(),

            }),
            method: "GET"
        }).then(trataFetch);
    }
    
    inserirEmTopico(item, idGrupo, idTopico, sucesso, erro) {
        console.log(item);
       
        fetch(`api/grupos/${idGrupo}/topicos/${idTopico}/posts`, {
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


}