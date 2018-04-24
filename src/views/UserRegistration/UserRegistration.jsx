import React from 'react';
import {Col, ControlLabel, FormControl, FormGroup, Grid, Row} from 'react-bootstrap';

import {Card} from '../../components/Card/Card.jsx';
import Button from '../../elements/CustomButton/CustomButton.jsx';
import UserService from '../../services/UserService';
import Navbar from "react-bootstrap/es/Navbar";
import logo from '../../assets/img/reactlogo.png';

class UserRegistration extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listaDeCursos: {},
            avisoLogin: "",
            usuario: {
                prefixoEmail: "",
                nome: "",
                senha: "",
                confSenha: "",
                vinculo: "",
                curso: "",
                sobreMim: ""
            }
        };
    }

    setValor(atributo, valor) {
        this.setState(
            (estado) => estado.usuario[atributo] = valor
        );
    }

    render() {
        let curso = null;

        if (this.state.usuario.tipoVinculo === "aluno") {
            curso =
                <Row>
                    <FormGroup controlId="formControlSelectCurso" className="col-md-12">
                        <ControlLabel>Curso</ControlLabel>
                        <FormControl
                            componentClass="select"
                            placeholder="curso"
                            value=""
                            onChange=""
                        >
                            <option value="">-- Selecione --</option>
                            {/*{this.props.listaDeCursos.content.map((curso) => {*/}
                            {/*return <option value={curso.id}>{curso.nome}</option>*/}
                            {/*})}*/}
                        </FormControl>
                    </FormGroup>
                </Row>
        } else {
            curso = "";
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
                                    title="Cadastro de usuário"
                                    content={
                                        <form onSubmit={(event) => {
                                            event.preventDefault();
                                            this.confirmar()
                                        }}>
                                            <Row>
                                                <FormGroup controlId="formHorizontalPrefixoEmail" className="col-md-6">
                                                    <ControlLabel>Prefixo do e-mail</ControlLabel>
                                                    <FormControl
                                                        type="text"
                                                        value={this.state.usuario.email}
                                                        placeholder="Ex: pmachado"
                                                        onChange={(e) => this.setValor("email", e.target.value)}
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
                                                <FormGroup controlId="formControlSelectVinculo" className="col-md-12">
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
                                            {curso}
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
                                                className="btSaveif"
                                                fill
                                                type="submit"
                                            >
                                                Cadastrar
                                            </Button>
                                            <div className="clearfix"/>
                                        </form>
                                    }
                                />
                            </Col>
                        </Row>
                    </Grid>
                </div>
            </div>
        );
    }
}

export default UserRegistration;


