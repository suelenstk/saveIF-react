import React, { Component } from 'react';
import {
    Grid, Row, Col,
    FormGroup, ControlLabel, FormControl
} from 'react-bootstrap';

import {Card} from '../../../components/Card/Card.jsx';
import {FormInputs} from '../../../components/FormInputs/FormInputs.jsx';
import {UserCard} from '../../../components/UserCard/UserCard.jsx';
import Button from '../../../elements/CustomButton/CustomButton.jsx';

import cancelar from "../../../assets/img/ic_highlight_off_black_48px.svg";
import avatar from "../../../assets/img/faces/face-3.jpg";


class CreateGroupPage2 extends React.Component {

    constructor(props) {
        super(props);
        this.state = {chip: true};
        console.log(this.state.chip);
    }
    
    fechaChip = () => this.setState({chip: false});

    render() {
        return (
            <div className="content">
                <Grid fluid>
                    <Row>
                        <Col md={8}>
                            <Card
                                title="Adicione participantes ao grupo"                   
                                content={ 
                                <form>
                                <FormInputs
                                            ncols = {["col-md-12"]}
                                            proprieties = {[
                                                {
                                                 label : "Nome do Grupo",
                                                 type : "text",
                                                 bsClass : "form-control",
                                                 value : "DEV II",  
                                                 disabled: true
                                                }             
                                            ]}
                                        />
                                        
                                        <Row>
                                            <Col md={12}>
                                                <FormGroup controlId="formControlsTextarea">
                                                    <ControlLabel>Descrição</ControlLabel>
                                                    <FormControl rows="5" componentClass="textarea" bsClass="form-control" value="Grupo para desenvolvimento de sistemas II" disabled="true"/>
                                                </FormGroup>
                                            </Col>
                                        </Row>
                                        
                                        <FormGroup controlId="formControlsSelect" className="col-md-12">
                                            <ControlLabel>Categorias</ControlLabel>
                                            <FormControl componentClass="select" value="Desenvolvimento de Sistemas Web" disabled="true">
                                                <option value="">Desenvolvimento de Sistemas Web</option>
                                                <option value="">Aplicações Android</option>
                                                <option value="">Java</option>                         
                                            </FormControl>
                                        </FormGroup>
                      
                                        <FormGroup controlId="formControlsConvidados" className="col-md-12">
                                        <ControlLabel>Convidados</ControlLabel><br/>
                                        
                                        <div className="chip" style={{width: '200px'}}
                                        chip={this.state.chip}
                                        docked={false}
                                        onRequestChange={(chip) => this.setState({chip})}
                                        >
                                        <img src={avatar} alt="Person" width="96" height="96"/>
                                            
                                            John Doe
             
                                        <span class="closebtn" style={{float: 'right'}} onClick={this.fechaChip}>&times;</span>
                                        </div>
                                        
                                        <div className="chip" style={{width: '200px'}}
                                        chip={this.state.chip}
                                        docked={false}
                                        onRequestChange={(chip) => this.setState({chip})}
                                        >
                                        <img src={avatar} alt="Person" width="96" height="96"/>
                                            
                                            John Doe
             
                                        <span class="closebtn" style={{float: 'right'}} onClick={this.fechaChip}>&times;</span>
                                        </div>
                                        
                                        </FormGroup> 
                                        
                                        <Button
                                            bsStyle="danger"
                                            pullRight
                                            fill
                                            type="submit"
                                            href="/CreateGroupPage2"
                                        >
                                            Criar Grupo
                                        </Button>
                                        
                                        <Button
                                            bsStyle="danger"
                                            pu czllRight
                                       
                                            type="submit"
                                            href="/CreateGroupPage2"
                                        >
                                            Voltar
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
                                        <ControlLabel>Participantes</ControlLabel><br/>
                                        <FormInputs
                                            ncols = {["col-md-12"]}
                                            proprieties = {[
                                                {
                                                 type : "text",
                                                 bsClass : "form-control",
                                                 placeholder : "Pesquisar",                                   
                                                }             
                                            ]}
                                            
                                        />

                                        <div className="chip" style={{width: '200px'}}
                                        chip={this.state.chip}
                                        docked={false}
                                        onRequestChange={(chip) => this.setState({chip})}
                                        >
                                        <img src={avatar} alt="Person" width="96" height="96"/>
                                            
                                            John Doe
             
                                        <span class="closebtn" style={{float: 'right'}} onClick={this.fechaChip}>&times;</span>
                                        </div>
                                        <br/><br/>
                                        <div className="chip" style={{width: '200px'}}
                                        chip={this.state.chip}
                                        docked={false}
                                        onRequestChange={(chip) => this.setState({chip})}
                                        >
                                        <img src={avatar} alt="Person" width="96" height="96"/>
                                            
                                            John Doe
             
                                        <span class="closebtn" style={{float: 'right'}} onClick={this.fechaChip}>&times;</span>
                                        </div>
                                        
                                        </div> 
                           
                                
                                }
                            />
                            
                <a href="" style={{color: 'red'}}> Pular esta etapa &gt;&gt;</a>
                            
                        </Col>
                    </Row>
                    <div style={{display: 'table'}}>
                            <div style={{display: 'table', float: 'left'}}>
                            <div className="circle">1</div>
                            <h4 style={{float: 'right', padding: '0px 10px 0px 10px'}}>Crie o Grupo</h4>
                            </div>
                            
                            <div style={{display: 'table', float: 'left'}}>
                            <div className="circle" style={{backgroundColor: 'red', color: 'white'}}>2</div>
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

export default CreateGroupPage2;
