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
import Alert from "react-bootstrap/es/Alert";


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
                senha: "",
                email:this.props.match.params.email
            }
        };
        
        //console.log(this.props.match.params.email);
        
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
                this.setState({sucesso: true,
                    avisoUsuario:""});
            },
            (erro) => {
                //console.log("Erro!");
                //console.log(erro);
                this.setState({
                    avisoUsuario: erro.message
                });
            }
        )
    } 
    
    confirmar(){
        
      if(this.state.usuario.email){
        if(this.state.usuario.novaSenha && this.state.confirmarSenha){
            if (this.state.usuario.novaSenha === this.state.confirmarSenha) {               
                this.alterarSenha();                            
            }else{
                this.setState({confirmaSenha: "",
                               avisoUsuario:"As senhas digitadas não coincidem!"});
            }          
        }else{
            this.setState({confirmaSenha:"", 
                avisoUsuario:"campos senha e nova senha devem ser preenchidos!"});
        }
        }else{
            this.setState({confirmaSenha:"",
                avisoUsuario:"Campo E-mail não pode ficar em branco!"});
        }
    }
    
    sleep(tempo) {
        return new Promise((e) => setTimeout(e, tempo));
    }
    
    render() {
               
        let erroCadastro = "";      
        let alterar = (this.props.match.params.email === "Email")? false:true;
        let $msg = null;
               
        if (this.state.avisoUsuario !== "") {
            erroCadastro =
                <div>
                    <HelpBlock>{this.state.avisoUsuario}</HelpBlock>
                </div>
        }     
        
        if (this.state.sucesso){
            
            $msg = (<Alert bsStyle="success">
                    Senha alterada com sucesso!;
                    <i className="pe-7s-check Id Idt-jump-in"/>
                    </Alert>);
        }
            
         
        
        return (
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
                                            {erroCadastro}
                                            {$msg}
                                            <Row>
                                                <FormGroup controlId="formHorizontalEmail" className="col-md-12">
                                                    <ControlLabel>E-mail: </ControlLabel>
                                                    <FormControl
                                                        type="text"
                                                        value={(this.state.usuario.email === "Email")?"":this.state.usuario.email}
                                                        onChange={(e) => this.setUsuario("email",e.target.value)} 
                                                        placeholder="Digite seu E-mail"   
                                                        required
                                                        disabled={alterar}
                                                    />
                                                </FormGroup>
                                            </Row>                                                
                                            <Row>
                                                <FormGroup controlId="formHorizontalNome" className="col-md-12">
                                                    <ControlLabel>Cole o código enviado para E-mail informado</ControlLabel>
                                                    <FormControl
                                                        type="text"
                                                        value={this.state.codigo}
                                                        onChange={(e) => this.setCodigo(e.target.value)}
                                                        placeholder="Código de Verificação"
                                                        maxlenght="20"
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
                {(this.state.sucesso)?setTimeout(function(){ window.location.href = "/", 2000}):""}
            </div>
        );
        
    }
    
}

export default Recover;