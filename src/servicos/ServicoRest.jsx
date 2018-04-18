export default class ServicoRest{

    constructor(url){
        this.url = url
    }

    listar(pagina, sucesso, erro) {

        let trataFetch=(resultado) => {

            if (resultado.ok) {
                resultado.json().then(sucesso)
            } else {
                resultado.json().then(
                        (resultadoErro) => erro(resultadoErro)
                ) 
            }
        };
        
        fetch(this.url + "?pagina=" + pagina, {
            method: "GET"
        }).then(trataFetch);


    }

}