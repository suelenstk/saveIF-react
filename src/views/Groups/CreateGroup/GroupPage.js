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
import CreateGroupElement from './CreateGroupElement';
import RightCard from './RightCard';
import GroupService from '../GroupService.jsx';

class GroupPage extends React.Component {

constructor (props){
    super(props);

    this.state = {
        disabled: false,  
        privacy: "",
        information: "",
        search: "none",
        invite: "none",
        photo: "none",
        page1: "red",
        page2: "",
        page3: "",
        group:{}
    }

    this.groupService = new GroupService();

}


render() {

    return (
        <div className="content">
            <Grid fluid>
                <Row>
                    <Col md={8}>

                               <CreateGroupElement
                               privacy={this.state.privacy}
                               disabled={this.state.disabled}
                               invite={this.state.invite}

                               voltar={()=>{this.setState({privacy:"", disabled:false, information: "", search: "none", invite: "none", page1: "red", page2: "", page3: "", photo: "none"});}}
                               
                               confirmar={()=>{this.setState({privacy:"none", disabled:true, information: "none", search: "none", invite: "none", page1: "", page2: "", page3: "red", photo: ""});}}
                               
                               inserir ={(group)=>{ 

                                    this.groupService.inserir(group, 
                                    (grupo)=>{
                                        alert("Grupo criado com sucesso!");
                                        this.setState({privacy:"none", disabled:true, information: "none", search: "", group: grupo, invite: "", page1: "", page2: "red", page3: "", photo: "none"});                            
                                },
                                (erro)=>{
                                console.log("Erro!");
                                console.log(erro);
                            }
                        );
                }}
                
                editar = {(id, group)=>{ 
                    this.groupService.editar(id, group, 
                            (grupo)=>{
                                alert("Grupo alterado com sucesso!");
                                this.setState({privacy:"none", disabled:true, information: "none", search: "", group: grupo, invite: "", page1: "", page2: "red", page3: "", photo: "none"});   
                            },
                            (erro)=>{
                                console.log("Erro!");
                                console.log(erro);
                                }
                            );
                    }}
                      

            group={this.state.group} 
            /> 
                    </Col>
                    
                        <RightCard
                        information={this.state.information}
                        search={this.state.search}
                        />
  
                </Row>
                
                <Row style={{display: this.state.photo}}>
                        <Col md={8}>
                            <Card
                                title=""                   
                                content={ 
                                
                                <div>
                          
                                <FormInputs
                                    ncols={["col-md-6"]}
                                    proprieties={[
                                {
                                    label: "Adicione uma foto ao grupo: ",
                                    type: "file",
                                    bsClass: "form-control",
                                    placeholder: "File",
                                    }
                                    ]}
                                    />
                                        <a href="" style={{float: 'right', color: 'red'}}> Ir para o grupo</a>
                                     
                                        <div className="clearfix"></div>
                                        </div>
                                }
                            />                     
                        </Col>
                    </Row>
                    
                <div style={{display: 'table'}}>
                        <div style={{display: 'table', float: 'left'}}>
                        <div className="circle" style={{backgroundColor: this.state.page1, color: 'white'}}>1</div>
                        <h4 style={{float: 'right', padding: '0px 10px 0px 10px'}}>Crie o Grupo</h4>
                        </div>

                        <div style={{display: 'table', float: 'left'}}>
                        <div className="circle" style={{backgroundColor: this.state.page2, color: 'white'}}>2</div>
                        <h4 style={{float: 'right', padding: '0px 10px 0px 10px'}}>Convide Participantes</h4>
                        </div>

                        <div style={{display: 'table', float: 'left'}}>
                        <div className="circle" style={{backgroundColor: this.state.page3, color: 'white'}}>3</div>
                        <h4 style={{float: 'right', padding: '0px 10px 0px 10px'}}>Pronto</h4>
                        </div>
                        </div>
            </Grid>
        </div>
    );
}
}

export default GroupPage;
