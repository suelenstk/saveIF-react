import React, {Component} from 'react';
import {Col, FormControl, FormGroup, Grid, Row} from 'react-bootstrap';
import Button from '../../elements/CustomButton/CustomButton.jsx';
import logo from '../../assets/img/logoMaior.png';
import google from '../../assets/img/sign-in-with-google.svg';
import servicoLogin from "../../login/ServicoLogin";
import ControlLabel from "react-bootstrap/es/ControlLabel";
import HelpBlock from "react-bootstrap/es/HelpBlock";
import Navbar from "react-bootstrap/es/Navbar";
import RecoverForm from '../UserRegistration/RecoverForm';

import {Link} from 'react-router-dom';


class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            avisoLogin: "",
            showRecovery: false,
            login: {
                usuario: "",
                senha: ""
            },
            cadastro: false
        };
    }

    setValor(atributo, valor) {
        this.setState(
            (estado) => estado.login[atributo] = valor
        );
    }
    
    abrirRecovery() {
        this.setState({
            showRecovery: true
        });
    }

    login() {
        this.setState({texto: ""});

        servicoLogin.login(
            this.state.login.usuario,
            this.state.login.senha,
            (sucesso) => {
                this.props.onLogin();
            },
            (erro) => {
                this.setValor("senha", "");
                console.log(erro);
                this.setState({
                    avisoLogin: "E-mail ou senha incorretos! Tente novamente."
                });
            }
        );

    }

    render() {
        let erroLogin = "";
        if (this.state.avisoLogin !== "") {
            erroLogin =
                <div>
                    <HelpBlock>{this.state.avisoLogin}</HelpBlock>
                </div>
        }

        return (
            <div>
                <Navbar className="navbarLogin">
                </Navbar>
                <Grid fluid>
                    <Row>
                        <Col md={6} className="logoLogin">
                            <div>
                                <a href="">
                                    <img src={logo} className="img-responsive" alt="logo_image"/>
                                </a>
                            </div>
                        </Col>
                        <Col md={6} className="formLogin">
                            <div>
                                <h4>Login do usuário</h4>
                                <form onSubmit={(event) => {
                                    event.preventDefault();
                                    this.login()
                                }}>
                                    {erroLogin}
                                    <FormGroup controlId="formHorizontalEmail" className="">
                                        <ControlLabel>E-mail</ControlLabel>
                                        <FormControl
                                            type="text"
                                            value={this.state.login.usuario}
                                            placeholder="Ex: pmachado@restinga.ifrs.edu.br"
                                            onChange={(e) => this.setValor("usuario", e.target.value)}
                                            required
                                        />
                                    </FormGroup>
                                    <FormGroup controlId="formHorizontalPassword">
                                        <ControlLabel>Senha</ControlLabel>
                                        <FormControl
                                            type="password"
                                            value={this.state.login.senha}
                                            placeholder="Senha"
                                            onChange={(e) => this.setValor("senha", e.target.value)}
                                            required
                                        />
                                    </FormGroup>
                                    <div>
                                        <button onClick={(e) => { this.abrirRecovery(); }} 
                                            type="button"
                                            style={{ border: "0", backgroundColor: "transparent",color:"red", float: "right" }}>Esqueceu sua senha?</button>
                                        <br/>
                                    </div>
                                    <Button
                                        style={{width: "100%"}}
                                        className="btnSaveif"
                                        block
                                        fill
                                        type="submit"
                                    >
                                        Entrar
                                    </Button>
                                    <Button
                                        className="btnLoginGoogle"
                                        block
                                    >
                                        <img src={google} alt="Logo google" className="google"/>Login com Google
                                    </Button>
                                    <div>
                                        <br/>
                                        <p>
                                            Não tem conta? <Link to="/cadastro">Cadastre-se.</Link>
                                        </p>
                                        <br/><br/>
                                    </div>
                                </form>
                            </div>
                        </Col>
                    </Row>
                    
                    <RecoverForm
                        voltarRecovery={() => { this.setState({ showRecovery: false }); }}
                        showRecovery={this.state.showRecovery}                      
                    />
                    
                    
                </Grid>
            </div>
        );
    }
}

export default Login;
