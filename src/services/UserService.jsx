import ServicoRest from "../ServicoRest";
import servicoLogin from "../login/ServicoLogin";

class UserService  {
        constructor(){
           
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
    
            fetch("/api/usuarios/listar", {
                headers: new Headers({
                    'Authorization': servicoLogin.getAuthorization(),
                }),
                method: "GET"
            }).then(trataFetch);
        }
    
    }
    
let userService = new UserService();        
export default UserService;