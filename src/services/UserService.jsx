import ServicoRest from "../ServicoRest";

export default class UserService extends  ServicoRest {
        constructor(){
            super("api/usuarios/");
        }
        
}