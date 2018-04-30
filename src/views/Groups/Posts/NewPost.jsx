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
    
    constructor(props) {
    super(props);

    this.state = {   
      post:this.props.post,
      update:0,
      arquivo: {}
    };
  }
  
    componentWillReceiveProps(proximoEstado) {
        this.setState({post: proximoEstado.produto});

    }

    setTitulo(valor) {
        this.setState(
                (anterior) => {     
            anterior.post.titulo = valor;
            return anterior;
        }
        );

    }

    setTexto(valor) {
        this.setState(
                (anterior) => {
            anterior.post.texto = valor;
            return valor;
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
    
    confirmar(form) {
        
    this.props.inserir(this.state.post);
    console.log ("Post: ");
    console.log (this.state.post);
                    
        let formData = new FormData(form);
        fetch("/api/posts/" + this.state.post.arquivo + "/arquivo", {
            method: "POST",

            headers: new Headers({
                'Authorization': servicoLogin.getAuthorization()

            }),
            body: formData
        }).then((resultado) => {
            if (resultado.ok) {
                this.setState(
                (anterior) =>
        {
            anterior.update = anterior.update+1;
            console.log("Mudou!");
            return anterior;
        }
        );         
            } else {
                resultado.json().then(
                        (resultadoErro) => console.log(resultadoErro)
                )
            }

        });

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
              Contained Modal
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form>
                  <FormGroup controlId="formControlsText">
                                            <ControlLabel>Título</ControlLabel>
                                            <FormControl
                                                type="text"                                               
                                                placeholder="Título"
                                                
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
