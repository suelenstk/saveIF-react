import ServicoRest from "../../servicos/ServicoRest";

export default class GroupService extends ServicoRest{

    constructor(){
        super("api/grupos");
    }

}