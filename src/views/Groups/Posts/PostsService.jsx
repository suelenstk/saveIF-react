import ServicoRest from "../../../ServicoRest";

export default class PostService extends ServicoRest {

    constructor() {
        super("api/posts");
    }   

}