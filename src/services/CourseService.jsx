class CourseService {
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

        fetch("/api/cursos", {
            headers: new Headers({
                // 'Authorization': servicoLogin.getAuthorization(),
            }),
            method: "GET"
        }).then(trataFetch);
    }

}

let courseService = new CourseService();

export default courseService;