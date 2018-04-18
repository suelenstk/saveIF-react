import React, {Component} from 'react';
import {
    Grid, Row, Col
} from 'react-bootstrap';

import {FormInputs} from '../../components/FormInputs/FormInputs.jsx';
import Button from '../../elements/CustomButton/CustomButton.jsx';
import logo from '../../assets/img/logoMaior.png';
import google from '../../assets/img/sign-in-with-google.svg';
import servicoLogin from "../../login/ServicoLogin";
import {FormGroup, FormControl, HelpBlock} from 'react-bootstrap';


class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            avisoLogin: "",
            login: {
                usuario: "",
                senha: ""
            }
        };
    }

    setValor(atributo, valor) {

        this.setState(
            (estado) => estado.login[atributo] = valor
        );
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
                console.log(erro);
                this.setState({
                    avisoLogin: erro.message
                });
            }
        );

    }

    


    render() {
        return (
            <div className="content">
                <Grid fluid>
                    <Row>
                        <Col md={6} className="logoLogin">
                            <div>
                                <a class="navbar-brand" href="">
                                    <img src={logo} className="img-responsive" alt="logo_image"/>
                                </a>
                            </div>
                        </Col>
                        <Col md={6} className="formLogin">
                            <div>
                                <h4>Login do usuário</h4>
                                <form onSubmit={(event)=>{event.preventDefault(); this.login()}}>
                                    
                                    <FormGroup controlId="formHorizontalPassword" >
                                        <FormControl
                                            type="email"
                                            value={this.state.login.usuario}
                                            placeholder="Email"
                                            onChange={(e) => this.setValor("usuario", e.target.value)}
                                        />
                                    </FormGroup>

                                    <FormGroup controlId="formHorizontalPassword">
                                        <FormControl
                                            type="password"
                                            value={this.state.login.senha}
                                            placeholder="Senha"
                                            onChange={(e) => this.setValor("senha", e.target.value)}
                                        />
                                    
                                    </FormGroup>
        
                                  
                                    <div>
                                        <a href="">
                                            Esqueceu sua senha?
                                        </a>
                                        <br/><br/>
                                    </div>

                                    <div>
                                    <HelpBlock>{this.state.avisoLogin}</HelpBlock>
                                    </div>

                                    <Button
                                        // bsStyle="danger"
                                        className="btSaveif"
                                        block
                                        pullLeft
                                        fill
                                        type="submit"
                                    >
                                        Entrar
                                    </Button>
                                    <br/>
                                    <Button
                                        // bsStyle="default"
                                        className="btLoginGoogle"
                                        block
                                        pullLeft
                                        // fill
                                        type="submit"
                                    >
                                        <img src={google} className="google"/>Login com Google
                                    </Button>
                                    <div>
                                        <br/>
                                        <p>
                                            Não tem conta? <a href="">Cadastre-se.</a>
                                        </p>
                                        <br/><br/>
                                    </div>
                                </form>
                            </div>
                        </Col>
                    </Row>
                </Grid>
            </div>
        );
    }
}

export default Login;

