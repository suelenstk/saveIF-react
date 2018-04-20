import ServicoRest from "../ServicoRest";
import base64 from "base-64/base64.js";

class ServicoLogin {
    constructor() {
        //super("api/login");
    }

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
                    this.dados = dados;
                    sucesso(dados);
                })

            } else {
                resposta.json().then(erro);
            }

        }).catch(erro);
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
        if (this.usuario && this.senha) {
            return this.dados;
        } else {
            return false;
        }
    }

    getUsuario(){
        let id = this.dados.id;
        return  id;
    }
    
}

let servicoLogin = new ServicoLogin();

//servicoLogin.login("admin","1234");

export default servicoLogin;