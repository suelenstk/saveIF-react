import React from 'react';
import {Col, ControlLabel, FormControl, FormGroup, Grid, Row} from 'react-bootstrap';

import {Card} from '../../components/Card/Card.jsx';
import Button from '../../elements/CustomButton/CustomButton.jsx';
import UserService from '../../services/UserService';
import Navbar from "react-bootstrap/es/Navbar";
import logo from '../../assets/img/reactlogo.png';
import HelpBlock from "react-bootstrap/es/HelpBlock";
import courseService from "../../services/CourseService";
import {Redirect} from "react-router-dom";
import Link from "react-router-dom/es/Link";


class UserRegistration extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            avisoUsuario: "",
            sucesso: "",
            confirmaSenha: "",
            listaCurso: "",
            cadastro: true,
            usuario: {
                email: "",
                nome: "",
                novaSenha: "",
                tipoVinculo: "",
                curso: null,
                sobreUsuario: ""
            }
        };

        this.UserService = new UserService();

        this.setState({
            listaCurso: (
                courseService.listarNaoPaginado(
                    (sucesso) => {
                        this.setState({listaCurso: sucesso});
                        console.log(this.state.listaCurso);
                    },
                    (erro) => {
                        console.log(erro);
                    }
                )
            )
        });
    }

    consultarEmail() {
        let existe = false;

        this.setState({
            avisoUsuario: ""
        });

        this.UserService.consultarExistencia(
            this.state.usuario.email,
            (sucesso) => {
                existe = sucesso;
                if (existe) {
                    this.setState({
                        avisoUsuario: "E-mail já cadastrado no sistema. Por favor, cadastre outro e-mail ou faça login."
                    });
                }
            },
            (erro) => {
                console.log(erro);
                this.setState({
                    avisoUsuario: "Erro inesperado:\n" + erro.message + "\nInforme ao administrador do sistema."
                });
            }
        );
    }

    setValor(atributo, valor) {
        this.setState(
            (estado) => estado.usuario[atributo] = valor
        );
    }

    inserirUsuario() {
        let usuario = this.state.usuario;
        this.UserService.inserirSemAutorizacao(usuario,
            (sucesso) => {
                this.setState({cadastro: false});
                alert("Usuário cadastrado com sucesso!");
                this.setState({sucesso: <Redirect to="/"/>})
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

    confirmar() {
        let regexEmail = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
        let regexNome = /^[a-zA-Z\u00C0-\u00FF ]+$/;

        if (this.state.usuario.email && this.state.usuario.nome && this.state.usuario.novaSenha && this.state.confirmaSenha && this.state.usuario.tipoVinculo) {
            if (this.state.usuario.tipoVinculo !== "aluno" || (this.state.usuario.tipoVinculo === "aluno" && this.state.usuario.curso !== "")) {
                if (regexEmail.test(this.state.usuario.email + "@restinga.ifrs.edu.br")) {
                    if (regexNome.test(this.state.usuario.nome)) {
                        if (this.state.usuario.novaSenha === this.state.confirmaSenha) {
                            this.inserirUsuario();
                        } else {
                            alert("As senhas digitadas não coincidem!");
                            this.setState({confirmaSenha: ""});
                        }
                    } else {
                        alert("Nome inválido! Não são aceitos números ou caracteres especiais.");
                    }
                } else {
                    alert("Prefixo de Email inválido!");
                }
            } else {
                alert("Preencha o campo 'CURSO'!");
            }
        } else {
            alert("Preencha todos os campos obrigatórios!");
        }
    }

    render() {
        let campoCurso = null;
        let erroCadastro = "";

        if (this.state.usuario.tipoVinculo === "aluno") {
            campoCurso =
                <Row>
                    <FormGroup controlId="formControlSelectCurso" className="col-md-12">
                        <ControlLabel>Curso</ControlLabel>
                        <FormControl
                            componentClass="select"
                            placeholder="curso"
                            value={this.state.usuario.curso}
                            onChange={(e) => this.setValor("curso", e.target.value)}
                            required
                        >
                            <option value="">-- Selecione --</option>
                            {this.state.listaCurso.map((curso) => {
                                return <option
                                    value={curso.id}
                                    key={curso.id}
                                >{curso.nome}</option>
                            })}
                        </FormControl>
                    </FormGroup>
                </Row>
        } else {
            campoCurso = "";
        }

        if (this.state.avisoUsuario !== "") {
            erroCadastro =
                <div>
                    <HelpBlock>{this.state.avisoUsuario}</HelpBlock>
                </div>
        }

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
                                    title="Cadastro de usuário"
                                    content={
                                        <form onSubmit={(event) => {
                                            event.preventDefault();
                                            this.confirmar()
                                        }}>
                                            {erroCadastro}
                                            <Row>
                                                <FormGroup controlId="formHorizontalPrefixoEmail"
                                                           className="col-md-6">
                                                    <ControlLabel>Prefixo do e-mail</ControlLabel>
                                                    <FormControl
                                                        type="text"
                                                        value={this.state.usuario.email}
                                                        placeholder="Ex: pmachado"
                                                        onChange={(e) => this.setValor("email", e.target.value)}
                                                        onBlur={(e) => this.consultarEmail(e.target.value)}
                                                        required
                                                    />
                                                </FormGroup>
                                                <FormGroup controlId="formHorizontalSufixo" className="col-md-6"
                                                           id="sufixoRestinga">
                                                    <FormControl.Static>@restinga.ifrs.edu.br</FormControl.Static>
                                                </FormGroup>
                                            </Row>
                                            <Row>
                                                <FormGroup controlId="formHorizontalNome" className="col-md-12">
                                                    <ControlLabel>Nome</ControlLabel>
                                                    <FormControl
                                                        type="text"
                                                        value={this.state.usuario.nome}
                                                        placeholder="Nome"
                                                        onChange={(e) => this.setValor("nome", e.target.value)}
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
                                                        placeholder="Senha"
                                                        onChange={(e) => this.setValor("novaSenha", e.target.value)}
                                                        required
                                                    />
                                                </FormGroup>
                                                <FormGroup controlId="formHorizontalConfirmacaoSenha"
                                                           className="col-md-6">
                                                    <ControlLabel> Confirmação de senha</ControlLabel>
                                                    <FormControl
                                                        type="password"
                                                        value={this.state.confirmaSenha}
                                                        placeholder="Confirmação de senha"
                                                        onChange={(e) => this.setState({confirmaSenha: e.target.value})}
                                                        required
                                                    />
                                                </FormGroup>
                                            </Row>
                                            <Row>
                                                <FormGroup controlId="formControlSelectVinculo"
                                                           className="col-md-12">
                                                    <ControlLabel>Vínculo</ControlLabel>
                                                    <FormControl
                                                        componentClass="select"
                                                        placeholder="vinculo"
                                                        value={this.state.usuario.tipoVinculo}
                                                        onChange={(evento) => this.setValor("tipoVinculo", evento.target.value)}
                                                        required>
                                                        <option value="">-- Selecione --</option>
                                                        <option value="aluno">Aluno</option>
                                                        <option value="professor">Professor</option>
                                                        <option value="servidor">Servidor Técnico</option>
                                                    </FormControl>
                                                </FormGroup>
                                            </Row>
                                            {campoCurso}
                                            <Row>
                                                <Col md={12}>
                                                    <FormGroup controlId="formControlsTextarea">
                                                        <ControlLabel>Sobre mim (opcional)</ControlLabel>
                                                        <FormControl
                                                            rows="5" componentClass="textarea"
                                                            bsClass="form-control"
                                                            placeholder="Fale um pouco sobre você..."
                                                            value={this.state.usuario.sobreUsuario}
                                                            onChange={(e) => this.setValor("sobreUsuario", e.target.value)}
                                                        />
                                                    </FormGroup>
                                                </Col>
                                            </Row>
                                            <Button
                                                disabled={this.state.avisoUsuario !== ""}
                                                className="btnSaveif"
                                                fill
                                                type="submit"
                                            >
                                                Cadastrar
                                            </Button>
                                            <div className="clearfix"/>
                                        </form>
                                    }
                                />
                                <div>
                                    <p>
                                        Já tem conta? <Link to="/login">Faça login.</Link>
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

export default UserRegistration;