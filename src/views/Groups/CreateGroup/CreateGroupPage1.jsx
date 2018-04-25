import React, { Component } from 'react';
import {
    Grid, Row, Col,
    FormGroup, ControlLabel, FormControl, Radio, Checkbox
} from 'react-bootstrap';
import {Link} from 'react-router-dom'

import {Card} from '../../../components/Card/Card.jsx';
import {FormInputs} from '../../../components/FormInputs/FormInputs.jsx'
import {UserCard} from '../../../components/UserCard/UserCard.jsx';
import Button from '../../../elements/CustomButton/CustomButton.jsx';


class CreateGroupPage1 extends Component {
    

    constructor(props) {

    super(props);
    this.state={
                group:this.props.group,
            };  
    }
        
        componentWillReceiveProps(proximoEstado){
            this.setState({group:proximoEstado.group});
            
        }
        
        setNome(valor){
            this.setState(
                    (anterior)=>
                            {
                            anterior.group.nome=valor;
                            return anterior;
                            }
                    );
            
        }
        
        setDescricao(valor){
            this.setState(
                    (anterior)=>
                            {
                            anterior.group.descricao=valor;
                            return anterior;
                            }
                    );
            
        }
        
        setCategoria(valor){
            this.setState(
                    (anterior)=>
                            {
                            anterior.group.categoria=valor;
                            return anterior;
                            }
                    );
            
        }
        
        setPrivacidade(valor){
            this.setState(
                    (anterior)=>
                            {
                            anterior.group.privacidade=valor;
                            return anterior;
                            }
                    );
            
        }
        
        createGroup(){
             
            if(this.state.group.nome){
                    if(this.state.solicitacao.id){
                       
                        this.props.editar(this.state.group.id, this.state.group);
                    }
                    else {     
                        this.props.inserir(this.state.group);                       
                        }
                    } else {
                        alert("Preencha todos os campos!");
                    }  

    }

    render() {
        return (
            <div className="content">
                <Grid fluid>
                    <Row>
                        <Col md={8}>
                            <Card
                                title="Criar Grupo"                   
                                content={ 
                                <form>
                                <FormInputs
                                
                                            ncols = {["col-md-12"]}
                                            proprieties = {[
                                                {
                                                 label : "Nome do Grupo",
                                                 type : "text",
                                                 bsClass : "form-control",
                                                 placeholder : "Nome",                                   
                                                }             
                                            ]}
                                            
                                                             
                                        />
                                        
                                        <Row>
                                            <Col md={12}>
                                                <FormGroup controlId="formControlsTextarea">
                                                
                                                    <ControlLabel>Descrição</ControlLabel>
                                                    <FormControl rows="5" componentClass="textarea" bsClass="form-control" placeholder="Descreva seu grupo"/>
                                                </FormGroup>
                                            </Col>
                                        </Row>
                                        
                                        <FormGroup controlId="formControlsSelect" className="col-md-12">
                                            
                                            <ControlLabel>Categorias</ControlLabel>
                                            <FormControl componentClass="select" placeholder="categoria">
                                                <option value="Desenvolvimento de Sistemas Web">Desenvolvimento de Sistemas Web</option>
                                                <option value="Aplicações Android">Aplicações Android</option>
                                                <option value="Java">Java</option>                         
                                            </FormControl>
                                        </FormGroup>                                       
                                       
                                    <FormGroup>
                                    <ControlLabel>Privacidade</ControlLabel><br/>
                                    
                                        <Radio name="radioGroup" inline value="aberto">
                                            Aberto
                                        </Radio>
                                        <Radio name="radioGroup" inline value="publico">
                                            Público
                                        </Radio>
                                        <Radio name="radioGroup" inline value="privado">
                                            Privado
                                        </Radio>
                                     
                                    </FormGroup>
                                    
                                        <Button
                                            bsStyle="danger"
                                            pullRight
                                            fill
                                            type="submit"
                                           
                                        >   
                                            Criar grupo
                                        </Button>
                                        
                                        <div className="clearfix"></div>
                                </form>
                                }
                            />
                            
                        </Col>
                        <Col md={4}>
                            <Card
                                content={
                                <div>
                                <h3>Grupo Aberto</h3>
                                <p>É um grupo onde todos podem participar sem a necessidade de convite ou solicitação.</p>
                                <h3>Grupo Público</h3>
                                <p>É um grupo onde todos podem solicitar a participação e ingressar mediante a aprovação do administrador.</p>
                                <h3>Grupo Privado</h3>
                                <p>É um grupo onde todos podem participar mediante o convite do administrador.</p>
                            </div>
                                }
                            />
                        </Col>
                    </Row>
                    <div style={{display: 'table'}}>
                            <div style={{display: 'table', float: 'left'}}>
                            <div className="circle" style={{backgroundColor: 'red', color: 'white'}}>1</div>
                            <h4 style={{float: 'right', padding: '0px 10px 0px 10px'}}>Crie o Grupo</h4>
                            </div>
                            
                            <div style={{display: 'table', float: 'left'}}>
                            <div className="circle">2</div>
                            <h4 style={{float: 'right', padding: '0px 10px 0px 10px'}}>Convide Participantes</h4>
                            </div>
                            
                            <div style={{display: 'table', float: 'left'}}>
                            <div className="circle">3</div>
                            <h4 style={{float: 'right', padding: '0px 10px 0px 10px'}}>Pronto</h4>
                            </div>
                            </div>
                </Grid>
            </div>
        );
    }
}

export default CreateGroupPage1;
