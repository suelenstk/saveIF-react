import React, {Component} from 'react';
import {
    Grid, Row, Col,
    FormGroup, ControlLabel, FormControl, Modal, HelpBlock
} from 'react-bootstrap';

import {Card} from '../../../components/Card/Card.jsx';
import {FormInputs} from '../../../components/FormInputs/FormInputs.jsx';
import {UserCard} from '../../../components/UserCard/UserCard.jsx';
import Button from '../../../elements/CustomButton/CustomButton.jsx';
import Loading from 'react-loading';
import avatar from "../../../assets/img/faces/face-3.jpg";

export default class NewPost extends React.Component {
    
    constructor(props) {
    super(props);

    this.state = {   
      post:this.props.post,
      estadoArquivo: null,
      errorDescricao: "",
      errorTitulo: "",
      msgErroDescricao:"",
      msgErroTitulo:""
    };
  }
  
    componentWillReceiveProps(proximoEstado) {
        this.setState({post: proximoEstado.post});

    }

    setTitulo(valor){
            this.setState(
                    (anterior)=>
                            {
                            anterior.post.titulo=valor;
                            return anterior;
                            }
                    );
            
        }
        
    setTexto(valor){
            this.setState(
                    (anterior)=>
                            {
                            anterior.post.texto=valor;
                            return anterior;
                            }
                    );
            
        }    
        
    
    setEstadoArquivo(valor){
        
        let valorTrocado = null;
        if (!valor){
           valorTrocado = !this.state.estadoArquivo; 
        }
        this.setState({
            estadoArquivo: valorTrocado
        }); 
        }
        
    setErrorTitulo (estilo, msg){
            this.setState({
                errorTitulo: estilo,
                msgErroTitulo: msg
            });
        }
        
    setErrorDescricao (estilo, msg){
            this.setState({
                errorDescricao: estilo,
                msgErroDescricao: msg
            });
        }
    
    confirmar(arquivo) {
        
    if (this.state.post.titulo&&
                this.state.post.texto) {          
                    this.setErrorDescricao("", "");
                    this.setErrorTitulo("", "");
                    this.props.inserir(this.state.post, arquivo, this.state.estadoArquivo);
                    this.setEstadoArquivo(true);          
    }
    if (!this.state.post.titulo){
        this.setErrorTitulo("error", "Campo Titulo não pode ser vazio!");   
    }else this.setErrorTitulo("", "");   
    if (!this.state.post.texto){
        this.setErrorDescricao("error", "Campo Descrição não pode ser vazio!");
    }else this.setErrorDescricao("", "");
    
    }

  render() {
   
    let erroTitulo=null;

        if (this.state.errorTitulo==="error"){
            
            erroTitulo=<HelpBlock>{this.state.msgErroTitulo}</HelpBlock>
            
        }else erroTitulo="";
        
    let erroDescricao=null;

        if (this.state.errorDescricao==="error"){
            
            erroDescricao=<HelpBlock>{this.state.msgErroDescricao}</HelpBlock>
            
        }else erroDescricao="";
    return (
      <Modal
          show={this.props.show}
          onHide={this.props.voltar}
          container={this}
          aria-labelledby="contained-modal-title"
        >
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title">
              Novo Post
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
         
                  <FormGroup controlId="formControlsText">
                                            <ControlLabel>Título</ControlLabel>
                                            <FormControl
                                                type="text"                                               
                                                placeholder="Título"
                                                value={this.state.titulo}
                                                onChange={(e) => this.setTitulo(e.target.value)}
                                            />
                                        </FormGroup>
                                        {erroTitulo}

                        <FormGroup controlId="formControlsTextarea">
                          <ControlLabel>Descrição</ControlLabel>
                          <FormControl rows="4" componentClass="textarea"
                            bsClass="form-control"
                            placeholder="Descrição" 
                            value={this.state.texto}
                            onChange={(e) => this.setTexto(e.target.value)}
                            />
                        </FormGroup>
                        {erroDescricao}
                 
          </Modal.Body>
          <Modal.Footer>
            <form method="post" encType="multipart/form-data"  
                    onSubmit={(event) => {
                            event.preventDefault();
                            this.confirmar(event.target);
}}>    
                <input name="arquivo" type="file" onClick={() => this.setEstadoArquivo(true)} onChange={() => this.setEstadoArquivo()} style={{float:"left"}}/> 
                  
                    <div style={{float:"right", display: this.props.loading}}><Loading type ='spinningBubbles' color='#FF4A55' height={30} width={30}/></div>
                    
                    <br/><br/><br/>
        <Button onClick={this.props.voltar}>Voltar</Button>
            <Button                    
                      bsStyle="danger"
                      pullRight
                      fill
                      type="submit"
                    >
                      Postar
                </Button>
                </form>
          </Modal.Footer>
        </Modal>
    );
  }
}
