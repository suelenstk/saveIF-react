/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

import React, { Component } from 'react';
import {
    Grid, Row, Col,
    FormGroup, ControlLabel, FormControl, Radio, Checkbox
} from 'react-bootstrap';

import {Card} from '../../../components/Card/Card.jsx';
import {FormInputs} from '../../../components/FormInputs/FormInputs.jsx';
import {UserCard} from '../../../components/UserCard/UserCard.jsx';
import Button from '../../../elements/CustomButton/CustomButton.jsx';
import InputGroup from "react-bootstrap/es/InputGroup";
import cancelar from "../../../assets/img/ic_highlight_off_black_48px.svg";
import avatar from "../../../assets/img/faces/face-3.jpg";
import CategoryService from '../../../services/CategoryService';
export default class CreateGroupElement extends React.Component {

    constructor(props) {

    super(props);
    this.state={
                group:this.props.group,
                page2: false,             
                //categoy:this.props.lista,
                categoria: null,
                listarCategorias: ""
            };
            this.categoryService = new CategoryService();

            this.setState({
                listarCategorias: (
                    this.categoryService.listarNaoPaginado(
                        (sucesso) => {
                            this.setState({listarCategorias: sucesso});
                            console.log("Sucesso");
                            console.log(this.state.listarCategorias);
                        },
                        (erro) => {
                            console.log(erro);
                        }
                    )
                )
            });
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
        /*
        setCategoria(valor){
            this.setState(
                    (anterior)=>
                            {
                            anterior.group.categoria=valor;
                            return anterior;
                            }
                    );
            
        }
        */
        setCategory(valor) {
        
        this.setState({
           categoria: valor
        });  
        
       }
        
        setPrivacidade(valor){
            this.setState(
                    (anterior)=>
                            {
                            anterior.group.tipoPrivacidade=valor;
                            return anterior;
                            }
                    );
            
        }
   
        createGroup(){
          
            if (this.state.group.nome &&
                this.state.group.descricao) {
            if (this.state.group.id&&this.state.page2!=true) {  
                this.setState({page2: true});
                this.props.editar();   
            } else if (this.state.group.id&&this.state.page2==true){
                this.setState({page2: false});
                this.props.confirmar();
            } else {
                this.setState({page2: true});
                this.props.inserir(this.state.group, this.state.categoria);              
            }
        } else {
            alert("Preencha todos os campos!");
        }
        
    }
            
    render () {
        let campoCategoria = null;

        if (this.state.listarCategorias) {
            campoCategoria =
                <Row>
                    <FormGroup controlId="formControlsText" className="col-md-12">
                        <ControlLabel>Categoria</ControlLabel>
                        <FormControl
                            componentClass="select"
                            placeholder="categoria"
                            value={this.state.group.categoria}
                            onChange={(e) => this.setCategory(e.target.value)}
                            required
                        >
                            <option value="">-- Selecione --</option>
                            {this.state.listarCategorias.map((categoria) => {
                                return <option
                                    value={categoria.id}
                                    key={categoria.id}
                                >{categoria.nome}</option>
                            })}
                        </FormControl>
                    </FormGroup>
                </Row>

        }
            return (
                        <Card
                                title="Criar Grupo"                   
                                content={ 
                                <form>
                                    
                                <FormGroup controlId="formControlsText">
                                            <ControlLabel>Nome</ControlLabel>
                                            <FormControl
                                                type="text"                                               
                                                placeholder="Nome do Grupo"     
                                                value={this.state.group.nome}
                                                onChange={(e) => this.setNome(e.target.value)}
                                                disabled={this.props.disabled}
                                                
                                            />
                                        </FormGroup>
                                        
                                        <Row>
                                            <Col md={12}>
                                                <FormGroup controlId="formControlsTextarea">
                                                
                                                    <ControlLabel>Descrição</ControlLabel>
                                                    <FormControl rows="5" componentClass="textarea" bsClass="form-control" placeholder="Descreva seu grupo"
                                                    value={this.state.group.descricao}
                                                    onChange={(e) => this.setDescricao(e.target.value)}
                                                    disabled={this.props.disabled}
                                                    />
                                                </FormGroup>
                                            </Col>
                                        </Row>
                                        
                                        <div>
                                               {campoCategoria}
                                                                              
                                        </div>                              
                                            
                                    
                                    <FormGroup style={{display: this.props.privacy}} disabled={this.props.disabled}>
                                    <ControlLabel>Privacidade</ControlLabel><br/>
                                    
                                    <FormControl componentClass="radio"
                                        value={this.state.group.tipoPrivacidade}
                                        onChange={(e) => this.setPrivacidade(e.target.value)}
                                        
                                            >
                                        <Radio name="radioGroup" inline value="aberto">
                                            Aberto
                                        </Radio>
                                        <Radio name="radioGroup" inline value="publico">
                                            Público
                                        </Radio>
                                        <Radio name="radioGroup" inline value="privado">
                                            Privado
                                        </Radio>
                                    </FormControl>
                                    </FormGroup>
                                    
                                    <FormGroup controlId="formControlsConvidados" className="col-md-12" style={{display: this.props.invite}}>
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
                                        
                                            onClick={(e) => {
                                                this.createGroup()
                                            }}
                                        >   
                                            Criar grupo
                                        </Button>
                                        
                                        <Button
                                            bsStyle="danger"
                                            pullRight
                                       
                                            onClick={(e) => {
                                                
                                                this.setState({page2: false})
                                                this.props.voltar();
                                            }}
                                        >
                                            Voltar
                                        </Button>
                                        
                                        <div className="clearfix"></div>
                                </form>
                                }
                                        
                            />       
                            
                            
                            
        );
    }
}

                                            