import base64 from "base-64/base64.js";

class ServicoLogin {

    login(usuario, senha, sucesso, erro) {
        this.usuario = usuario;
        this.senha = senha;

        fetch(`api/usuarios/login`, {
                headers: new Headers({
                    'Authorization': this.getAuthorization()
                }),
                method: "GET"
            }
        ).then((resposta) => {
            if (resposta.ok) {
                resposta.json().then((dados) => {
                    this.token = resposta.headers.get("token");
                    sessionStorage.setItem("token", this.token);
                    this.dados = dados;
                    sucesso(dados);
                })

            } else {
                resposta.json().then(erro);
            }

        }).catch(erro);
    }

    validarLogin() {

        fetch(`api/usuarios/validarLogin`, {
                headers: new Headers({
                    'Authorization': "Bearer " + sessionStorage.getItem("token")
                }),
                method: "GET"
            }
        ).then((resposta) => {
            if (resposta.ok) {
                resposta.json().then((dados) => {
                    this.dados = dados;
                    this.token = sessionStorage.getItem("token");
                    console.log("sucesso" + this.dados);
                })

            } else {
                console.log("erro" + resposta.json().then());
            }

        }).catch();
    }

    revogaLogin() {
        sessionStorage.removeItem("token");
        console.log("removeu token");
    }

    getAuthorizationGet() {
        return "token=" + this.token;
    }

    getAuthorization() {
        if (this.token) {
            return "Bearer " + this.token;
        } else
            return "Basic " + base64.encode(this.usuario + ":" + this.senha);
    }

    logado() {
        if (this.dados) {
            return this.dados;
        } else {
            return false;
        }
    }

    getUsuario() {
        return this.dados.id;
    }

}

let servicoLogin = new ServicoLogin();

export default servicoLogin;