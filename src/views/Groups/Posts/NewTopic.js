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
        
        
        export default class NewTopic extends React.Component {

        constructor(props) {
        super(props);
                this.state = {
                campoNomeTopico:"none"
                };
        }

        componentWillReceiveProps(proximoEstado) {
        this.setState({post: proximoEstado.post});
        }

        setNome(valor){
        this.setState(
                (anterior) =>
        {
        anterior.post.nome = valor;
                return anterior;
        }
        );
        }
        
        abreCampoNome (){
            this.setState({
            campoNomeTopico: ""
        });
        }

        confirmar() {

        if (this.state.post.titulo &&
                this.state.post.texto) {
        this.props.inserir(this.state.post);
        } else {
        alert ("Preencha os campos Título e Descrição");
        }
        }



        render() {
        return (
                <Col md={3}>
                        <Card
                            title="Tópicos"
                            
                            content={
                            <form>
                            <FormGroup controlId="formControlsText" style={{display: this.state.campoNomeTopico}}>
                                <ControlLabel>Nome</ControlLabel>
                            <FormControl
                                type="text"                                               
                                placeholder="Nome do Tópico"
                                
                                onChange={(e) => this.setNome(e.target.value)}
                                />
                            </FormGroup>
                            <Button
                            bsStyle="danger"
                            pullRight
                            fill
                            block
                            onClick={(e) => {
                                            this.abreCampoNome();                                            
                                            }}
                            >
                            Novo Tópico
                            </Button>
                            <div className="clearfix"></div>
                            </form>
                                }
                            
                          />
                    </Col>

    

    );
    }
    }
