import React from 'react';
import {Col, ControlLabel, FormControl, FormGroup, HelpBlock, Radio, Row} from 'react-bootstrap';

import {Card} from '../../../components/Card/Card.jsx';
import Button from '../../../elements/CustomButton/CustomButton.jsx';
import CategoryService from '../../../services/CategoryService';
import {UserChip} from '../../../elements/UserChip/UserChip';
import ServicoLogin from '../../../login/ServicoLogin';

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
            visualizar: "none",
            convidados: this.props.convidados
        };
        this.categoryService = new CategoryService();

        this.setState({
            listarCategorias: (
                this.categoryService.listarNaoPaginado(
                    (sucesso) => {
                        this.setState({listarCategorias: sucesso});
                    },
                    (erro) => {
                        console.log(erro);
                    }
                )
            )
        });
    }

    componentWillReceiveProps(proximoEstado) {
        this.setState({group: proximoEstado.group});

    }

    convidarUsuarios() {
        let i = 0;
        let idsUsuarios = [];
        while (i < this.props.convidados.length) {
            idsUsuarios[i] = this.props.convidados[i].id;
            i++;
        }
        this.props.convidar(idsUsuarios);
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

    setErrorGrupo(estilo, msg) {
        this.setState({
            errorGrupo: estilo,
            msgErroGrupo: msg
        });
    }

    createGroup() {
        let regexNome = /[a-z]/i;

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

                } else this.setErrorGrupo("error", "Não é permitido apenas caracteres especiais!");
            }
        } else {
            this.setErrorGrupo("error", "Todos os campos são obrigatórios!");
        }

    }

    render() {

        let campoConvidados = null;

        if (this.props.convidados.length > 0) {

            campoConvidados =
                <div>
                    {this.props.convidados.map((usuario) => {
                        return <UserChip
                            usuario={usuario}
                            key={usuario.id}
                            nome={usuario.nome}
                            avatar={`/api/usuarios/` + usuario.id + `/imagem?` +
                            ServicoLogin.getAuthorizationGet()}
                            alt={usuario.nome}
                            class="addUserbtn"
                            icone="pe-7s-close-circle"
                            evento={(e) => {
                                this.props.removeLista(e);
                            }}
                        />
                    })}
                    <br/><br/>
                    <Button
                        bsStyle="danger"
                        pullRight
                        fill

                        onClick={() => {
                            this.convidarUsuarios();
                        }}
                    >
                        Convidar
                    </Button>
                </div>
        } else {
            campoConvidados =
                <div style={{margin: "20px"}}>
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


                        <FormGroup style={{display: this.props.privacy}} disabled={this.props.disabled}>
                            <ControlLabel>Privacidade</ControlLabel><br/>

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
                            className="btnSaveif"
                            pullRight
                            fill
                            onClick={() => {
                                this.createGroup()
                            }}
                            style={{display: this.state.botao}}
                        >
                            Criar Grupo
                        </Button>

                        <div className="clearfix"/>
                    </form>
                }
            />

        } else if (this.props.page === "2") {

            visualizar = <div>
                <Card
                    title="Informações"
                    content={
                        <form>
                            <ControlLabel><strong>Nome do Grupo: </strong>{this.state.group.nome}</ControlLabel>
                            <tr/>
                            <ControlLabel><strong>Descriçao: </strong>{this.state.group.descricao}</ControlLabel>
                            <tr/>
                            <ControlLabel><strong>Categoria: </strong>{}</ControlLabel>
                            <tr/>
                            <ControlLabel><strong>Privacidade: </strong>{this.state.group.tipoPrivacidade}
                            </ControlLabel>
                        </form>
                    }
                />

                <Card
                    title="Convidar Participantes"
                    content={
                        <div>

                            {campoConvidados}

                            {/*
                                <div className="chip" style={{ width: '200px' }}
                                    chip={this.state.chip}
                                    docked={false}
                                    onRequestChange={(chip) => this.setState({ chip })}
                                >
                                    <img src={avatar} alt="Person" width="96" height="96" />

                                    John Doe

                                <span class="closebtn" style={{ float: 'right' }} onClick={(e) => {
                                this.fechaChip(true)
                            }}>&times;</span>
                                </div>*/}


                            <div className="clearfix"/>
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

