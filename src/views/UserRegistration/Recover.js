/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
import React from 'react';
import {Col, ControlLabel, FormControl, FormGroup, Grid, Row} from 'react-bootstrap';
import {Card} from '../../components/Card/Card.jsx';
import Button from '../../elements/CustomButton/CustomButton.jsx';
import Navbar from "react-bootstrap/es/Navbar";
import logo from '../../assets/img/reactlogo.png';
import HelpBlock from "react-bootstrap/es/HelpBlock";
import {Redirect} from "react-router-dom";
import Link from "react-router-dom/es/Link";
import UserService from '../../services/UserService';


class Recover extends React.Component {
    
    constructor(props) {
        super(props);
        
        this.state = {           
            avisoUsuario: "",
            sucesso: "",
            confirmarSenha: "",
            codigo:"",
            usuario: {
                novaSenha: "",
                senha: ""
            }
        };
        
        this.UserService = new UserService();         
        
    }
    
    setUsuario(atributo, valor) {     
        this.setState(
            (estado) => estado.usuario[atributo] = valor
        );
    }
    
    setCodigo(valor){
        this.setState(
            (estado) => estado.codigo = valor
        );
    }
    
    setConfirmarSenha(valor){
        this.setState(
            (estado) => estado.confirmarSenha = valor
        );
    }
    
    alterarSenha() {
        let usuario = this.state.usuario;
        let codigo = this.state.codigo;
        this.UserService.alterarSenha(codigo,usuario,
            (sucesso) => {
                this.setState({cadastro: false});
                //alert("Usuário cadastrado com sucesso!");
                this.setState({sucesso: <Redirect to="/"/>});
            },
            (erro) => {
                console.log("Erro!");
                console.log(erro);
                this.setState({
                    avisoUsuario: "Erro inesperado no cadastro:\n" + erro.message + "\nInforme ao administrador do sistema."
                });
            }
        )
    } 
    
    confirmar(){
        if(this.state.usuario.novaSenha && this.state.confirmarSenha){
            if (this.state.usuario.novaSenha === this.state.confirmarSenha) {               
                this.alterarSenha();                            
            } 
        }
    }
    
    render() {
               
        if (this.state.sucesso)
            return this.state.sucesso;
        else return (
            <div className="wrapper">
                <Navbar className="navbarLogin">
                    <Navbar.Brand className="logoInicial">
                        <img src={logo} className="imgNavbar" alt="logo_image"/>
                    </Navbar.Brand>
                </Navbar>
                <div className="cardCadastro">
                    <Grid fluid>
                        <Row>
                            <Col md={12}>

                                <Card
                                    title="Recuperar Senha"
                                    content={
                                        <form onSubmit={(event) => {
                                            event.preventDefault();
                                            this.confirmar()
                                        }}>
                                            
                                            <Row>
                                                <FormGroup controlId="formHorizontalNome" className="col-md-12">
                                                    <ControlLabel>Cole o código enviado para E-mail informado</ControlLabel>
                                                    <FormControl
                                                        type="text"
                                                        value={this.state.codigo}
                                                        onChange={(e) => this.setCodigo(e.target.value)}
                                                        placeholder="Código de Verificação"
                                                        required
                                                    />
                                                </FormGroup>
                                            </Row>
                                            <Row>
                                                <FormGroup controlId="formHorizontalSenha" className="col-md-6">
                                                    <ControlLabel>Senha</ControlLabel>
                                                    <FormControl
                                                        type="password"
                                                        value={this.state.usuario.novaSenha}
                                                        onChange={(e) => this.setUsuario("novaSenha",e.target.value)}  
                                                        placeholder="Senha"
                                                        required
                                                    />
                                                </FormGroup>
                                                <FormGroup controlId="formHorizontalConfirmacaoSenha"
                                                           className="col-md-6">
                                                    <ControlLabel> Confirmação de senha</ControlLabel>
                                                    <FormControl
                                                        type="password"
                                                         value={this.state.confirmarSenha}
                                                        onChange={(e) => this.setConfirmarSenha(e.target.value)}
                                                        placeholder="Confirmação de senha"
                                                        required
                                                    />
                                                </FormGroup>
                                            </Row>                                           
                                            <Button
                                                className="btnSaveif"
                                                style={{float: "right"}}
                                                fill
                                                type="submit"
                                            >
                                                Redefinir Senha
                                            </Button>
                                            <div className="clearfix"/>
                                        </form>
                                    }
                                />
                                <div>
                                    <p>
                                       <Link to="/login">Voltar.</Link>
                                    </p>
                                    <br/>
                                </div>
                            </Col>
                        </Row>
                    </Grid>
                </div>
            </div>
        );
        
    }
    
}

export default Recover;