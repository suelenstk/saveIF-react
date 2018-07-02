import ServicoRest from "../../ServicoRest";
import servicoLogin from "../../login/ServicoLogin";

export default class GroupService extends ServicoRest {

    constructor() {
        super("api/grupos");
    }

    listarGrupoIntegrantes(id, pagina, sucesso, erro) {
        let trataFetch = (resultado) => {

            if (resultado.ok) {
                resultado.json().then(sucesso)
            } else {
                resultado.json().then(
                    (resultadoErro) => erro(resultadoErro)
                )
            }
        };
        fetch(`api/grupos/integrantes/${id}?pagina=` + pagina, {
            headers: new Headers({
                'Authorization': servicoLogin.getAuthorization(),
            }),
            method: "GET"
        }).then(trataFetch);
    }

    listarParticipantes(id, pagina, sucesso, erro) {
        let trataFetch = (resultado) => {

            if (resultado.ok) {
                resultado.json().then(sucesso)
            } else {
                resultado.json().then(
                    (resultadoErro) => erro(resultadoErro)
                )
            }
        };
        fetch(`api/usuario/participantes/${id}?pagina=` + pagina, {
            headers: new Headers({
                'Authorization': servicoLogin.getAuthorization(),
            }),
            method: "GET"
        }).then(trataFetch);
    }

    listarGrupoEspecifico(id, sucesso, erro) {
        let trataFetch = (resultado) => {
            if (resultado.ok) {
                resultado.json().then(sucesso)
            } else {
                resultado.json().then(
                    (resultadoErro) => erro(resultadoErro)
                )
            }
        };
        fetch(`api/grupos/${id}`, {
            headers: new Headers({
                'Authorization': servicoLogin.getAuthorization(),
            }),
            method: "GET"
        }).then(trataFetch);
    }


     convidarParticipante(idGrupo, idUsuario, sucesso, erro) {
       fetch(`api/grupos/${idGrupo}/convite/${idUsuario}`, {
            method: "PUT",
            headers: new Headers({
                'Authorization': servicoLogin.getAuthorization(),
                'Content-Type': 'application/json'
            }),
            body: JSON.stringify(idUsuario) 
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
    
    removerParticipante(idGrupo, idUsuario, sucesso, erro) {
       fetch(`api/grupos/${idGrupo}/remover/${idUsuario}`, {
            method: "DELETE",
            headers: new Headers({
                'Authorization': servicoLogin.getAuthorization(),
                'Content-Type': 'application/json'
            })
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

    solicitar(id, idUsuario, sucesso, erro) {
        fetch(`api/grupos/${id}/solicitar/${idUsuario}`, {
            method: "POST",
            headers: new Headers({
                'Authorization': servicoLogin.getAuthorization(),
                'Content-Type': 'application/json'
            })
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

    aceitarSolicitacao(idGrupo, idUsuario, idNotificacao, sucesso, erro) {
        fetch(`api/grupos/${idGrupo}/inscricao/${idUsuario}/aceite/${idNotificacao}`, {
            method: "PUT",
            headers: new Headers({
                'Authorization': servicoLogin.getAuthorization(),
                'Content-Type': 'application/json'
            })
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

    recusarSolicitacao(idGrupo, idUsuario, idNotificacao, sucesso, erro) {
        fetch(`api/grupos/${idGrupo}/inscricao/${idUsuario}/negacao/${idNotificacao}`, {
            method: "PUT",
            headers: new Headers({
                'Authorization': servicoLogin.getAuthorization(),
                'Content-Type': 'application/json'
            })
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


    atualizar(group, id, idCategoria, sucesso, erro) {
        console.log(idCategoria);
        fetch(`api/grupos/${id}/${idCategoria}`, {
            method: "PUT",
            headers: new Headers({
                'Authorization': servicoLogin.getAuthorization(),
                'Content-Type': 'application/json'
            }),
            body: JSON.stringify(group)
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
    listarCoordenadores(id, sucesso, erro) {
        let trataFetch = (resultado) => {
            if (resultado.ok) {
                resultado.json().then(sucesso)
            } else {
                resultado.json().then(
                    (resultadoErro) => erro(resultadoErro)
                )
            }
        };
        fetch(`api/grupos/${id}/coordenadores`, {
            headers: new Headers({
                'Authorization': servicoLogin.getAuthorization(),
            }),
            method: "GET"
        }).then(trataFetch);
    }

    tornarCoordenador(idGrupo, idUsuario, sucesso, erro) {
        fetch(`api/grupos/${idGrupo}/coordenador/${idUsuario}`, {
             method: "PUT",
             headers: new Headers({
                 'Authorization': servicoLogin.getAuthorization(),
                 'Content-Type': 'application/json'
             })
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


}