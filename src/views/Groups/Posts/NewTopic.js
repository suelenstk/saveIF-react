import React, {Component} from 'react';
        import {
        Grid, Row, Col,
                FormGroup, ControlLabel, FormControl
        } from 'react-bootstrap';
        import {Card} from '../../../components/Card/Card.jsx';
        import {FormInputs} from '../../../components/FormInputs/FormInputs.jsx';
        import {UserCard} from '../../../components/UserCard/UserCard.jsx';
        import Button from '../../../elements/CustomButton/CustomButton.jsx';
        import PostsService from '../../Posts/PostsService.jsx';
        import servicoLogin from "../../../login/ServicoLogin";
        import done from "../../../assets/img/done.png";
        
        
        export default class NewTopic extends React.Component {

        constructor(props) {
        super(props);
                this.state = {
                campoNomeTopico:"none",
                adicionarTopico: "Novo Tópico",
                campoTopico: false
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
                <Col md={4}>
                        <Card
                            title="Tópicos"
                            
                            content={
                            <form>
                                <table class="table table-sm">
                                    <tbody>
                                        <tr>
                                        <td style={{display: this.state.campoNomeTopico}}>
                                        <FormGroup controlId="formControlsText">
                                            <ControlLabel>Nome</ControlLabel>
                                
                                        <FormControl
                                            type="text"                                               
                                            placeholder="Nome do Tópico"
                                
                                            onChange={(e) => this.setNome(e.target.value)}                       
                                            />
                                        </FormGroup>
                                        </td>
                                        <td><Button style={{borderStyle: "none", display: this.state.campoNomeTopico}} onClick={(e) => {this.setConfigNovoTopico();}}><img src={done} width="25px" height="20px"/></Button></td>
                                        </tr>
                                    </tbody>
                                </table>
             
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
