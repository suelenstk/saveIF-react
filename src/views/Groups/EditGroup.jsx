import React, { Component } from 'react';
import {
    Grid, Row, Col,
    FormGroup, ControlLabel, FormControl, Modal, HelpBlock, Radio
} from 'react-bootstrap';

import Button from '../../elements/CustomButton/CustomButton.jsx';
import CategoryService from '../../services/CategoryService';
import GroupService from './GroupService';
import GroupImage from '../../components/GroupImage/GroupImage';

export default class EditGroup extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            group: "",
            categoria: "",
            errorGrupo: "",
            msgErroGrupo: "",
            listarCategorias: ""
        };
        this.categoryService = new CategoryService();
        this.groupService = new GroupService();

        this.setState({
            group: (
                this.groupService.listarGrupoEspecifico(this.props.idGrupo,
                    (sucesso) => {
                        this.setState({ group: sucesso, categoria: sucesso.categoria.id });
                        console.log("Sucesso");
                        console.log(this.state.group);
                        this.setCategoria(this.state.group.categoria.id);
                    },
                    (erro) => {
                        console.log(erro);
                    }
                )
            )
        });

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
    setCategoria(valor) {
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

    setErrorGrupo(estilo, msg) {
        this.setState({
            errorGrupo: estilo,
            msgErroGrupo: msg
        });
    }

    alterarGrupo() {
        let regexNome = /^[a-zA-Z\u00C0-\u00FF ]+$/;

        if (this.state.group.nome &&
            this.state.group.descricao && this.state.group.tipoPrivacidade && this.state.categoria) {

            this.setErrorGrupo("", "");
            if (this.state.group.id) {
                this.setCadastro("none", "");

                if (regexNome.test(this.state.group.nome)) {
                    console.log("Categoria: " + this.state.categoria);
                    this.props.editar(this.state.group, this.state.group.id, this.state.categoria);
                    this.setErrorGrupo("", "");
                    this.props.voltarEditGroup();

                } else this.setErrorGrupo("error", "Não é permitido caracteres especiais!");
            }
        } else {
            this.setErrorGrupo("error", "Todos os campos são obrigatórios!");
        }

    }

    render() {
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
                            onChange={(e) => this.setCategoria(e.target.value)}
                            required
                        >

                            <option value={this.state.group.categoria.id} key={this.state.group.categoria.id}>{this.state.group.categoria.nome}</option> 
                            {this.state.listarCategorias.map((categoria) => {
                                if (this.state.group.categoria.id!=categoria.id){
                                return <option
                                        value={categoria.id}
                                        key={categoria.id}
                                    >{categoria.nome}</option>      
                                }           
                            })}
                        </FormControl>
                    </FormGroup>
                </Row>
        }

        return (
            <Modal
                show={this.props.showEditGroup}
                onHide={(event) => { this.props.voltarEditGroup(); }}
                container={this}
                aria-labelledby="contained-modal-title"
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title">
                        Editar Grupo
            </Modal.Title>
                </Modal.Header>
                <Modal.Body>
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
                                <Radio name="radioGroup" inline value="Aberto" checked={this.state.group.tipoPrivacidade == "Aberto" || this.state.group.tipoPrivacidade == "aberto" ? true : false}>
                                    Aberto
                                </Radio>
                                <Radio name="radioGroup" inline value="Público" checked={this.state.group.tipoPrivacidade == "Público" || this.state.group.tipoPrivacidade == "público" ? true : false}>
                                    Público
                                </Radio>
                                <Radio name="radioGroup" inline value="Privado" checked={this.state.group.tipoPrivacidade == "Privado" || this.state.group.tipoPrivacidade == "privado" ? true : false}>
                                    Privado
                                </Radio>
                            </FormControl>
                        </FormGroup>
                        {erroGrupo}

                        <div style={{width: "80%", position: "relative", left: "10%"}}>
                        <GroupImage
                            id={this.state.group.id}
                        />
                        </div>

                        <Button
                            bsStyle="danger"
                            pullRight
                            fill

                            onClick={(e) => {
                                this.alterarGrupo();
                            }}
                        >
                            Editar Grupo
                        </Button>

                        <div className="clearfix"></div>
                    </form>
                </Modal.Body>
            </Modal>
        );
    }
}
