import ServicoRest from "../ServicoRest";

export default class CourseService extends  ServicoRest {
        constructor(){
            super("api/cursos/");
        }
        
}