import ServicoRest from "../../ServicoRest";

export default class GroupService extends ServicoRest{

    constructor(){
        super("api/grupos");
    }

}