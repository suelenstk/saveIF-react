import React, { Component } from 'react';
import {
    Grid, Row, Col,
    FormGroup, ControlLabel, FormControl
} from 'react-bootstrap';

import {Card} from '../../components/Card/Card.jsx';
import {FormInputs} from '../../components/FormInputs/FormInputs.jsx';
import {LoginCard} from '../../components/LoginCard/LoginCard.jsx';
import Button from '../../elements/CustomButton/CustomButton.jsx';

import avatar from "../../assets/img/faces/face-3.jpg";
import logo from '../../assets/img/logoMaior.png';


class LoginProfile extends Component {
    render() {
        return (
            <div className="content">
                <Grid fluid>
                    <Row>
                        <Col md={7}>
                            <div className="logo">
                                <a class="navbar-brand" href="">    
                                    <img src={logo} className="img-responsive" alt="logo_image"/>
                                </a>
                            </div>
                        </Col>


                        <Col md={5}>
                            <Card
                                title="Login do usuário"
                                content={
                                    <form>
                                        <FormInputs
                                            ncols = {["col-md-12"]}
                                            proprieties = {[
                                                {
                                                 label : "Email",
                                                 type : "email",
                                                 bsClass : "form-control",
                                                 placeholder : "Email",
                                                }
                                                
                                            ]}
                                        />
                                        <FormInputs
                                            ncols = {["col-md-12"]}
                                            proprieties = {[
                                                {
                                                 label : "Senha",
                                                 type : "password",
                                                 bsClass : "form-control",
                                                 placeholder : "Senha",
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
                                            Login com Google
                                        </Button>


                                        <div>
                                            <br/>
                                            <a href="">
                                                Não tem conta? Cadastre-se.
                                            </a>
                                            <br/><br/>
                                        </div>

                                        <div className="clearfix"></div>
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

export default LoginProfile;


