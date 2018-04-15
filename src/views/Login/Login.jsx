import React, {Component} from 'react';
import {
    Grid, Row, Col
} from 'react-bootstrap';

import {Card} from '../../components/Card/Card.jsx';
import {FormInputs} from '../../components/FormInputs/FormInputs.jsx';
import Button from '../../elements/CustomButton/CustomButton.jsx';
import logo from '../../assets/img/logoMaior.png';
import google from '../../assets/img/sign-in-with-google.svg';


class Login extends Component {
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
                            <Card
                                title="Login do usuário"
                                content={
                                    <form>
                                        <FormInputs
                                            ncols={["col-md-12"]}
                                            proprieties={[
                                                {
                                                    label: "Email",
                                                    type: "email",
                                                    bsClass: "form-control",
                                                    placeholder: "Email",
                                                }

                                            ]}
                                        />
                                        <FormInputs
                                            ncols={["col-md-12"]}
                                            proprieties={[
                                                {
                                                    label: "Senha",
                                                    type: "password",
                                                    bsClass: "form-control",
                                                    placeholder: "Senha",
                                                }

                                            ]}
                                        />
                                        <div>
                                            <a href="">
                                                Esqueceu sua senha?
                                            </a>
                                            <br/><br/>
                                        </div>
                                        <Button
                                            bsStyle="danger"
                                            block
                                            pullLeft
                                            fill
                                            type="submit"
                                        >
                                            Entrar
                                        </Button>
                                        <br/>
                                        <Button
                                            bsStyle="default"
                                            block
                                            pullLeft
                                            fill
                                            type="submit"
                                        >
                                            <img src={google} className="google"/>Login com Google
                                        </Button>
                                        <div>
                                            <br/>
                                            Não tem conta? <a href="">Cadastre-se.</a>
                                            <br/><br/>
                                        </div>
                                    </form>
                                }
                            />
                        </Col>
                    </Row>
                </Grid>
            </div>
        );
    }
}

export default Login;


