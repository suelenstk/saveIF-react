/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

import React from 'react';
import { Col, ControlLabel, FormControl, FormGroup, HelpBlock, Radio, Row } from 'react-bootstrap';

import { Card } from '../../../components/Card/Card.jsx';
import Button from '../../../elements/CustomButton/CustomButton.jsx';
import avatar from "../../../assets/img/faces/face-3.jpg";
import CategoryService from '../../../services/CategoryService';
import {UserChip} from '../../../elements/UserChip/UserChip';

export default class CreateGroupElement extends React.Component {

    constructor(props) {

        super(props);
        this.state = {
            group: this.props.group,
            page: this.props.page,
            categoria: "",
            errorGrupo: "",
            msgErroGrupo: "",
            listarCategorias: "",
            botao: "",
            cadastro: "",
            visualizar: "none"
        };
        this.categoryService = new CategoryService();

        this.setState({
            listarCategorias: (
                this.categoryService.listarNaoPaginado(
                    (sucesso) => {
                        this.setState({ listarCategorias: sucesso });
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

    componentWillReceiveProps(proximoEstado) {
        this.setState({ group: proximoEstado.group });

    }

    setNome(valor) {
        this.setState(
            (anterior) => {
                anterior.group.nome = valor;
                return anterior;
            }
        );

    }

    setDescricao(valor) {
        this.setState(
            (anterior) => {
                anterior.group.descricao = valor;
                return anterior;
            }
        );
    }

    setCadastro(cadastro, visualizar) {
        this.setState({
            cadastro: cadastro,
            visualizar: visualizar
        });
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

    setPrivacidade(valor) {
        this.setState(
            (anterior) => {
                anterior.group.tipoPrivacidade = valor;
                return anterior;
            }
        );

    }

    setBotao(valor) {

        this.setState(
            (anterior) => {
                anterior.botao = valor;
                return anterior;
            }
        );

    }

    setErrorGrupo(estilo, msg) {
        this.setState({
            errorGrupo: estilo,
            msgErroGrupo: msg
        });
    }

    setNomeBotao(nome) {
        this.setState({
            nomeBotao: nome
        });
    }

    createGroup() {
        let regexNome = /^[a-zA-Z\u00C0-\u00FF ]+$/;

        if (this.state.group.nome &&
            this.state.group.descricao && this.state.group.tipoPrivacidade && this.state.categoria) {

            this.setErrorGrupo("", "");
            if (this.state.group.id) {
                this.props.editar();
            } else {
                this.setCadastro("none", "");
                this.props.alert();
                if (regexNome.test(this.state.group.nome)) {
                    this.props.inserir(this.state.group, this.state.categoria);
                    this.setErrorGrupo("", "");

                } else this.setErrorGrupo("error", "Não é permitido caracteres especiais!");
            }
        } else {
            this.setErrorGrupo("error", "Todos os campos são obrigatórios!");
        }

    }

    render() {

        let campoUsuario = null;

        if (this.props.convidados.length>0) {
            campoUsuario =
                <div>
                    {this.props.convidados.content.map((usuario) => {
                        return <UserChip
                            usuario={usuario}
                            key={usuario.id}
                            nome={usuario.nome}
                            avatar={avatar}
                            alt={usuario.nome}
                            class="addUserbtn"
                            icone="pe-7s-add-user"
                            evento={(e) => {
                                //this.adicionarUsuario(e);
                            }}
                        />
                    })}
                </div>
        } else {
            campoUsuario =
                <div style={{ margin: "20px" }}>
                    <p>Nenhum usuário adicionado!</p>
                </div>
        }

        let erroGrupo = null;

        if (this.state.errorGrupo === "error") {

            erroGrupo = <HelpBlock>{this.state.msgErroGrupo}</HelpBlock>

        } else erroGrupo = "";

        let campoCategoria = null;

        if (this.state.listarCategorias) {
            campoCategoria =
                <Row>
                    <FormGroup controlId="formControlsText" className="col-md-12">
                        <ControlLabel>Categoria</ControlLabel>
                        <FormControl
                            componentClass="select"
                            placeholder="categoria"
                            value={this.state.categoria}
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

        let cadastro = null;
        let visualizar = null;

        if (this.props.page === "1") {
            cadastro = <Card
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

                            />
                        </FormGroup>

                        <Row>
                            <Col md={12}>
                                <FormGroup controlId="formControlsTextarea">

                                    <ControlLabel>Descrição</ControlLabel>
                                    <FormControl rows="5" componentClass="textarea" bsClass="form-control"
                                        placeholder="Descreva seu grupo"
                                        value={this.state.group.descricao}
                                        onChange={(e) => this.setDescricao(e.target.value)}
                                    />
                                </FormGroup>
                            </Col>
                        </Row>

                        <div>
                            {campoCategoria}
                        </div>


                        <FormGroup style={{ display: this.props.privacy }} disabled={this.props.disabled}>
                            <ControlLabel>Privacidade</ControlLabel><br />

                            <FormControl componentClass="radio"
                                value={this.state.group.tipoPrivacidade}
                                onChange={(e) => this.setPrivacidade(e.target.value)}

                            >
                                <Radio name="radioGroup" inline value="Aberto">
                                    Aberto
                                </Radio>
                                <Radio name="radioGroup" inline value="Público">
                                    Público
                                </Radio>
                                <Radio name="radioGroup" inline value="Privado">
                                    Privado
                                </Radio>
                            </FormControl>
                        </FormGroup>
                        {erroGrupo}
                        <Button
                            bsStyle="danger"
                            pullRight
                            fill

                            onClick={(e) => {
                                this.createGroup()
                            }}
                            style={{ display: this.state.botao }}
                        >
                            Criar Grupo
                        </Button>

                        <div className="clearfix"></div>
                    </form>
                }
            />

        } else if (this.props.page === "2") {

            visualizar = <div>
                <Card
                    title="Informações"
                    content={
                        <form>
                            <ControlLabel><strong>Nome do Grupo: </strong>{this.state.group.nome}</ControlLabel> <tr />
                            <ControlLabel><strong>Descriçao: </strong>{this.state.group.descricao}</ControlLabel> <tr />
                            <ControlLabel><strong>Categoria: </strong>{this.state.categoria.nome}</ControlLabel> <tr />
                            <ControlLabel><strong>Privacidade: </strong>{this.state.group.tipoPrivacidade}</ControlLabel>
                        </form>
                    }
                />

                <Card
                    title="Convidados"
                    content={
                        <div>
                            <FormGroup controlId="formControlsConvidados" className="col-md-12">
                                <ControlLabel>Convidados</ControlLabel><br />

                                {campoUsuario}

                                <div className="chip" style={{ width: '200px' }}
                                    chip={this.state.chip}
                                    docked={false}
                                    onRequestChange={(chip) => this.setState({ chip })}
                                >
                                    <img src={avatar} alt="Person" width="96" height="96" />

                                    John Doe

                                <span class="closebtn" style={{ float: 'right' }} onClick={this.fechaChip}>&times;</span>
                                </div>

                            </FormGroup>
                            <div className="clearfix"></div>
                        </div>
                    }
                />
            </div>
        }
        return (
            <div>
                {cadastro}
                {visualizar}
            </div>
        );

    }
}

