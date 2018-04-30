import React, {Component} from 'react';
import {
    Grid, Row, Col,
    FormGroup, ControlLabel, FormControl, Modal
} from 'react-bootstrap';

import {Card} from '../../../components/Card/Card.jsx';
import {FormInputs} from '../../../components/FormInputs/FormInputs.jsx';
import {UserCard} from '../../../components/UserCard/UserCard.jsx';
import Button from '../../../elements/CustomButton/CustomButton.jsx';
import PostsService from '../../Posts/PostsService.jsx';
import servicoLogin from "../../../login/ServicoLogin";

import avatar from "../../../assets/img/faces/face-3.jpg";

export default class NovoPost extends React.Component {
    
    constructor(props, context) {
    super(props, context);

    this.state = {   
      post:this.props.post
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
        
    
    setArquivo(valor) {
        this.setState(
                (anterior) => {
            anterior.arquivo = valor;
            return valor;
        }

        );
    }
    
    confirmar() {
        
    if (this.state.post.titulo&&
                this.state.post.texto) {  
                    this.props.inserir(this.state.post);
    }else {
        alert ("Preencha os campos Título e Descrição");
    }
    }

   

  render() {
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
            <form>
                  <FormGroup controlId="formControlsText">
                                            <ControlLabel>Título</ControlLabel>
                                            <FormControl
                                                type="text"                                               
                                                placeholder="Título"
                                                value={this.state.post.titulo}
                                                onChange={(e) => this.setTitulo(e.target.value)}
                                            />
                                        </FormGroup>
                                        

                    <Row>
                      <Col md={12}>
                        <FormGroup controlId="formControlsTextarea">
                          <ControlLabel>Descrição</ControlLabel>
                          <FormControl rows="4" componentClass="textarea"
                            bsClass="form-control"
                            placeholder="Descrição" 
                            value={this.state.post.texto}
                            onChange={(e) => this.setTexto(e.target.value)}
                            />
                        </FormGroup>
                      </Col>
                    </Row>

                    <FormInputs
                      onChange={(e) => {
                            e.preventDefault()
                            this.setArquivo(e.target)}}
                      ncols={["col-md-6"]}
                      proprieties={[
                        {
                          label: "Selecione um arquivo: ",
                          type: "file",
                          bsClass: "form-control",
                          placeholder: "File",
                        }
                      ]}
                    />

                    
                    <div className="clearfix"></div>
                  </form>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.props.voltar}>Voltar</Button>
            <Button
                      onClick={(e) => {
                        this.confirmar()}}
                      bsStyle="danger"
                      pullRight
                      fill
                      type="submit"
                    >
                      Postar
                </Button>
          </Modal.Footer>
        </Modal>
    );
  }
}
