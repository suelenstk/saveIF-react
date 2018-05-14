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
        import TopicService from './TopicService';
        import {Link} from 'react-router-dom';
        import Pager from "react-bootstrap/es/Pager";
        
        
        export default class NewTopic extends React.Component {

        constructor(props) {
            
        
                super(props);
                this.state = {
                topic: this.props.topic,
                campoNomeTopico:"none",
                adicionarTopico: "Novo Tópico",
                topico:{titulo:"teste"},
                pagina:0,
                campoTopico: false,   
                error: "",
                msgErro:""
                };
                
                this.topicService = new TopicService();
                
                this.listarTopicos(0);
                
        }
        
    listarTopicos(pagina) {
        this.topicService.listarTopicosGrupo(this.props.idGrupo,pagina,
                (resultado) => {
            console.log(resultado);
            this.setarTopico(resultado);
        },
                (erro) => {
            console.log("Erro:");
            console.log(erro);
        }
        );
    }   

    
    setarTopico(resultado) {
        
        this.setState({
            topico: resultado
        });
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
        
        verTopico(id,topico){  
            
            return (topico.nome === 'Geral')? `MyGroups/${id}/geral`:`MyGroups/${id}/posts/${topico.id}`;               
        }

        render() {
        
        let erroTopico=null;
        
        let statusNext = true;
        let statusPrev = true;
        //alert(this.state.pagina.totalPages);
        
        if (this.state.pagina > 0) {
            statusPrev = false;
        }

        if (this.state.pagina < this.state.topico.totalPages - 1) {
            statusNext = false;
        }
        
        
        console.log(this.state.topico);
        if (this.state.error==="error"){
            
            erroTopico=<HelpBlock>{this.state.msgErro}</HelpBlock>
            
        }else erroTopico="";
        
        if(this.state.topico.titulo !== "teste")
        return (
                <Col md={4}>
                        <Card
                            title="Tópicos"
                            
                             legend={
                    <Pager>
                        
                    <Pager.Item
                            previous
                            disabled={statusPrev}
                            onClick={(e) => {
                                this.listarTopicos(this.state.pagina - 1);
                                this.state.pagina--;
                            }}
                        >
                            &lt; Anterior
                        </Pager.Item>
                        <Pager.Item
                            next
                            disabled={statusNext}
                            onClick={(e) => {
                                this. listarTopicos(this.state.pagina + 1);
                                this.state.pagina++;
                            }}
                        >
                            Próxima &gt;
                        </Pager.Item>
                        
                    </Pager>
                }
                            
                            content={
                            <form>
                                <Table responsive>  
                                    {this.state.topico.content.map((topico) => {
                                       return <Link to={{ pathname: `/${this.verTopico(this.props.idGrupo,topico)}`}} style={{color:"#000000"}}>{topico.nome}<br/></Link>
                                    })}
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
    else
        return <div></div>
    }
    }
