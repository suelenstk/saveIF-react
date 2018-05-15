import React, { Component } from 'react';
import {
Grid, Row, Col,
FormGroup, ControlLabel, FormControl, Radio, Checkbox
} from 'react-bootstrap';
import Alert from "react-bootstrap/es/Alert";
import {Link} from 'react-router-dom'

import {Card} from '../../../components/Card/Card.jsx';
import {FormInputs} from '../../../components/FormInputs/FormInputs.jsx'
import {UserCard} from '../../../components/UserCard/UserCard.jsx';
import Button from '../../../elements/CustomButton/CustomButton.jsx';
import CreateGroupElement from './CreateGroupElement';
import RightCard from './RightCard';
import GroupService from '../GroupService.jsx';
import {Redirect} from "react-router-dom";
import CategoryService from "../../../services/CategoryService";
import servicoLogin from '../../../login/ServicoLogin'
import GroupImage from '../../../components/GroupImage/GroupImage';

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
        group:{},
        category: {},
        alert: false
    }
    
    this.groupService = new GroupService();
    this.categoryService = new CategoryService();
    
    //this.listaCategorias();
}

setLista(categorias) {
        
        this.setState({
           category: categorias
        });    
       
}

setAlert(valor){
        this.setState({
            alert: valor
        }); 
        }

listaCategorias (){
        this.categoryService.listarNaoPaginado(
               (resultado) => {
           console.log(resultado);
           this.setLista(resultado);
       },
               (erro) => {
           console.log("Erro:");
           console.log(erro);
       }
       );
}


inserirComCategorias(item, idCategoria, sucesso, erro) {
        console.log(item);
        console.log ("Aqui");
        fetch(`api/grupos/${idCategoria}`, {
            method: "POST",
            headers: new Headers({
                'Authorization': servicoLogin.getAuthorization(),
                'Content-Type': 'application/json'
            }),
            body: JSON.stringify(item)
        }).then((resultado) => {
            if (resultado.ok) {
                resultado.json().then(sucesso)
            } else {
                resultado.json().then(
                    (resultadoErro) => erro(resultadoErro)
                )
            }

        });
    }
    
    editarComCategorias(id, item, idCategoria, sucesso, erro) {
        console.log(item);
        fetch(`api/grupos/${id}/${idCategoria}`, {
            method: "PUT",
            headers: new Headers({
                'Authorization': servicoLogin.getAuthorization(),
                'Content-Type': 'application/json'
            }),
            body: JSON.stringify(item)
        }).then((resultado) => {
            if (resultado.ok) {
                sucesso();
            } else {
                resultado.json().then(
                    (resultadoErro) => erro(resultadoErro)
                )
            }

        });
    }


render() {
let aviso=null;
    
    if (this.state.alert){
        aviso=<Alert bsStyle="success">
        <strong>Concluído!</strong> Grupo criado com sucesso.
        </Alert>
    }
    return (
        <div className="content">
        
            <Grid fluid>
            {aviso}
                <Row>
                    <Col md={8}>

                               <CreateGroupElement
                               privacy={this.state.privacy}
                               disabled={this.state.disabled}
                               invite={this.state.invite}
                               
                               lista={this.state.category}

                               voltar={()=>{this.setState({privacy:"", disabled:false, information: "", search: "none", invite: "none", page1: "red", page2: "", page3: "", photo: "none"});}}
                               
                               confirmar={()=>{this.setState({privacy:"none", disabled:true, information: "none", search: "none", invite: "none", page1: "", page2: "", page3: "red", photo: ""});}}
                              
                               alert={()=>{this.setState({alert:true});}}
                                       
                               inserir ={(group, idCategoria)=>{ 
                                    this.inserirComCategorias(group, idCategoria,
                                    (grupo)=>{
                                        
                                        this.setState({privacy:"none", disabled:true, information: "none", search: "", group: grupo, invite: "", page1: "", page2: "red", page3: "", photo: "none"});            
                                        
                                },
                                (erro)=>{
                                console.log("Erro!");
                                console.log(erro);
                            }
                        );
                }}
                
                editar = {(id, group, idCategoria)=>{ 
                    this.groupService.editar(id, group, idCategoria, 
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
                          
                                    <GroupImage
                                        id= {this.state.group.id}
                                    />         
                
                                    <button style={{borderStyle: 'none', float: 'right', color: 'red'}} > Ir para o grupo</button>
                                    
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