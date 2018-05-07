import React, {Component} from 'react';
        import {
        Grid, Row, Col,
                FormGroup, ControlLabel, FormControl, Table
        } from 'react-bootstrap';
        import {Card} from '../../../components/Card/Card.jsx';
        import {FormInputs} from '../../../components/FormInputs/FormInputs.jsx';
        import {UserCard} from '../../../components/UserCard/UserCard.jsx';
        import Button from '../../../elements/CustomButton/CustomButton.jsx';
        import done from "../../../assets/img/done.png";
        import HelpBlock from "react-bootstrap/es/HelpBlock";
        
        
        export default class NewTopic extends React.Component {

        constructor(props) {
                super(props);
                this.state = {
                topic: this.props.topic,
                campoNomeTopico:"none",
                adicionarTopico: "Novo Tópico",
                campoTopico: false,   
                error: "",
                msgErro:""
                };
        }

        componentWillReceiveProps(proximoEstado) {
        this.setState({topic: proximoEstado.topic});
        }

        setNome(valor){
            this.setState(
                    (anterior)=>
                            {                                
                            anterior.topic.nome=valor;
                            return anterior;
                            }
                    );
            
        }
        
        setConfigNovoTopico(){
            this.setState({
            campoTopico: !this.state.campoTopico
            }); 
            
            if (!this.state.campoTopico){
            this.setState({
                campoNomeTopico: "",
                adicionarTopico: "Cancelar",             
            });  
        }else {
           this.setState({
                campoNomeTopico: "none",
                adicionarTopico: "Novo Tópico"
            }); 
        }
        this.setNome("");
        this.setError ("");
        
        }
        
        setError (estilo, msg){
            this.setState({
                error: estilo,
                msgErro: msg
            });
        }
        
        verificaSeErroMudou () {
        var nome = this.state.topic.nome;
        var convertido = nome.toLowerCase();
        
        if(convertido=="geral"){
            this.setError("error", "Tópico "+nome+" não pode ser utilizado!");
            return true;
        }else {
            this.setError ("", "");
            return false;
        }     
        }

        confirmar() {
            
      
        if (this.verificaSeErroMudou()){
            
        }else if (this.state.topic.nome) {
                this.props.inserir(this.state.topic);
                this.setConfigNovoTopico();
        } else {
                this.setError("error", "Campo nome não pode ser vazio!");
        }
        }

        render() {
        let erroTopico=null;
        if (this.state.error=="error"){
            
            erroTopico=<HelpBlock>{this.state.msgErro}</HelpBlock>
            
        }else erroTopico="";
        
        
        return (
                <Col md={4}>
                        <Card
                            title="Tópicos"
                            
                            content={
                            <form>
                                <Table responsive>  
                                
                                        <tr>Topico 1</tr>
                                        <tr>Topico 2</tr>
                                        <tr>Topico 3</tr>
                                        
                                        <tr>
                                        <td style={{display: this.state.campoNomeTopico}}>
                                        <FormGroup controlId="formControlsText" validationState={this.state.error}>
                                            <ControlLabel>Nome</ControlLabel>
                                
                                        <FormControl
                                            type="text"                                               
                                            placeholder="Nome do Tópico"
                                            value={this.state.topic.nome}
                                            onChange={(e) => this.setNome(e.target.value)}                     
                                            />  
                                        <FormControl.Feedback />
                                        
                                        </FormGroup>
                                        {erroTopico}
                                        </td>
                                        <td><Button style={{borderStyle: "none", display: this.state.campoNomeTopico}} onClick={(e) => {this.confirmar();}}><img src={done} width="25px" height="20px"/></Button></td>
                                        </tr>                                 
                                </Table>
             
                            <Button
                            bsStyle="danger"
                            pullRight
                            fill
                            block
                            onClick={(e) => {
                                            this.setConfigNovoTopico ();
                                            }}
                            >
                            {this.state.adicionarTopico}
                            </Button>
                            <div className="clearfix"></div>
                            </form>
                                }
                            
                          />
                    </Col>

    

    );
    }
    }
