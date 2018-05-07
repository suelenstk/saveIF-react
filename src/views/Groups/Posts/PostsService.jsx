
import servicoLogin from "../../../login/ServicoLogin";

export default class PostService {

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
    
    inserirEmTopico(item, idGrupo, sucesso, erro) {
        console.log(item);
       
        fetch(`api/posts/${idGrupo}`, {
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