import React, {Component} from 'react';
import {
    Grid, Row, Col,
    FormGroup, ControlLabel, FormControl
} from 'react-bootstrap';

import {Card} from '../../components/Card/Card.jsx';
import {FormInputs} from '../../components/FormInputs/FormInputs.jsx';
import {UserCard} from '../../components/UserCard/UserCard.jsx';
import Button from '../../elements/CustomButton/CustomButton.jsx';
import PostsService from '../Posts/PostsService.jsx';
import servicoLogin from "../../login/ServicoLogin";

import avatar from "../../assets/img/faces/face-3.jpg";

class NovoPost extends Component {
    
  constructor(props) {
        super(props);
        this.state = {  
            update:0,
            post:{},
            arquivo: {}
        };

        this.postsService = new PostsService();

    }

    componentWillReceiveProps(proximoEstado) {
        this.setState({post: proximoEstado.produto});

    }

    setTitulo(valor) {
        this.setState(
                (anterior) =>
        {
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
        
 
    console.log ("Post: ");
    console.log (this.state.post);
        
        
    
        this.postsService.inserir(this.state.post, 
                            (grupo)=>{
                                
                                alert("Post criado com sucesso!");
                                                   
                            },
                            (erro)=>{
                                console.log("Erro!");
                                console.log(erro);
                                }
                            );
                    
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
      <div className="content">
        <Grid fluid>
          <Row>
            <Col md={8}>
              <Card
                title="Novo Post"
                content={
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

                    <Button
                      onClick={(e) => {
                        this.confirmar(this.state.arquivo)}}
                      bsStyle="danger"
                      pullRight
                      fill
                      type="submit"
                    >
                      Postar
                </Button>
                    <div className="clearfix"></div>
                  </form>
                }
              />

            </Col>
          </Row>
        </Grid>
      </div>

    );
  }
}
export default NovoPost;