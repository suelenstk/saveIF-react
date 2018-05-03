import ServicoRest from "../../../ServicoRest";

export default class TopicService extends ServicoRest {

    constructor() {
        super("api/topicos");
    }

}