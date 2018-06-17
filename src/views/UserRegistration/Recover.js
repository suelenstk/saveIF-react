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


class Recover extends React.Component {
    
    constructor(props) {
        super(props);
        
        this.state = {
            
            confirmaSenha: "",
            
            usuario: {
                email: "",
                nome: "",
                novaSenha: "",
                tipoVinculo: "",
                curso: "",
                sobreUsuario: ""
            }
        };
        
    }
    
    render() {
        
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
                                        <form>
                                            
                                            <Row>
                                                <FormGroup controlId="formHorizontalNome" className="col-md-12">
                                                    <ControlLabel>Cole o código enviado para E-mail informado</ControlLabel>
                                                    <FormControl
                                                        type="text"
                                                        value=""
                                                        placeholder=""
                                                        required
                                                    />
                                                </FormGroup>
                                            </Row>
                                            <Row>
                                                <FormGroup controlId="formHorizontalSenha" className="col-md-6">
                                                    <ControlLabel>Senha</ControlLabel>
                                                    <FormControl
                                                        type="password"
                                                        value=""
                                                        placeholder="Senha"
                                                        required
                                                    />
                                                </FormGroup>
                                                <FormGroup controlId="formHorizontalConfirmacaoSenha"
                                                           className="col-md-6">
                                                    <ControlLabel> Confirmação de senha</ControlLabel>
                                                    <FormControl
                                                        type="password"
                                                        value=""
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
                                                Alterar
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