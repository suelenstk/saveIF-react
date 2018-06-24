import React, {Component} from 'react';
import {Col, ControlLabel, FormControl, FormGroup, Grid, Row} from 'react-bootstrap';
import Button from '../../elements/CustomButton/CustomButton.jsx';
import {Card} from '../../components/Card/Card.jsx';
import {UserCard} from '../../components/UserCard/UserCard.jsx';
import UserService from '../../services/UserService';
import courseService from "../../services/CourseService";
import ServicoLogin from '../../login/ServicoLogin';
import servicoLogin from '../../login/ServicoLogin';
import {FormInputs} from '../../components/FormInputs/FormInputs.jsx';
import Alert from "react-bootstrap/es/Alert";
import boia from '../../assets/img/boia.png';

class UserProfile extends Component {


    constructor(props) {

        super(props);

        this.state = {
            avisoUsuario: "",
            sucesso: "",
            listaCurso: "",
            desable: true,
            curso: "",
            cadastro: true,
            usuario: this.props.user,
            nome: this.props.user.nome,
            imagePreviewUrl: "",//para imagemo
            loading: false,
            success: false,
            error: "",
            concluded: "",
            desc: this.props.user.sobreUsuario,
            avatar: `/api/usuarios/` + this.props.user.id + `/imagem?` +
            ServicoLogin.getAuthorizationGet(),

        };

        this.UserService = new UserService();

        this.setState({
            listaCurso: (
                courseService.listarNaoPaginado(
                    (sucesso) => {
                        this.setState({listaCurso: sucesso});
                    },
                    (erro) => {
                        console.log(erro);
                    }
                )
            )
        });

        if (this.props.user.tipoVinculo === 'aluno') {

            this.setState({


                curso: (
                    courseService.recuperar((this.state.usuario.curso.id) ? this.state.usuario.curso.id : this.state.usuario.curso,
                        (sucesso) => {
                            this.setState({curso: sucesso});
                            //console.log(this.state.curso);
                        },
                        (erro) => {
                            console.log(erro);
                        }
                    )
                )


            });
        }

        this._handleImageChange = this._handleImageChange.bind(this);
        this._handleSubmit = this._handleSubmit.bind(this);

    }

    _handleSubmit(form) {
        this.setState({loading: true});
        let formData = new FormData(form);
        if (this.state.imagePreviewUrl === null)
            this.setState({imagePreviewUrl: ""});
        fetch("/api/usuarios/" + this.state.usuario.id + "/imagem", {
            method: "PUT",

            headers: new Headers({
                'Authorization': servicoLogin.getAuthorization()

            }),
            body: formData
        }).then((resultado) => {
            this.setState({loading: true});

            // simulacao de atraso no upload - pode ser removido ao entrar em producao

            this.sleep(3000).then(() => {
                if (resultado.ok) {
                    this.setState(
                        (anterior) => {
                            return anterior;
                        }
                    );
                } else {
                    resultado.json().then(
                        (resultadoErro) => console.log(resultadoErro)
                    )
                }
                this.setState({loading: false});
                this.setState({success: true});
            });

        });
    }

    validateImage(file) {
        if (file) {
            let num = file.name.split(".").length;
            let name = file.name.split(".")[num - 1].toLowerCase();

            //console.log(file.size);
            if (file.size <= 1048576) {
                if (name === "png" || name === "tiff" || name === "jpg" || name === "jpeg" || name === "bmp") {
                    this.setState({error: ""});
                    return true;
                } else {
                    this.setState({error: "Formato inválido! São aceitos apenas arquivos no formato de imagem."});
                    return false;
                }
            } else {
                this.setState({error: "A imagem não pode ser maior que 1mb."});
                return false;
            }

        } else {
            this.setState({error: ""});
            return false;
        }
    }

    _handleImageChange(e) {
        e.preventDefault();

        this.setState({imagePreviewUrl: ""});
        this.setState({success: false});
        this.setState({desable: false});

        let reader = new FileReader();
        let file = e.target.files[0];

        if (this.validateImage(file)) {
            reader.onloadend = () => {
                this.setState({
                    file: file,
                    imagePreviewUrl: reader.result,
                    avatar: reader.result
                });
            };
            reader.readAsDataURL(file)
        }
    }

    sleep(tempo) {
        return new Promise((e) => setTimeout(e, tempo));
    }

    setValor(atributo, valor) {

        this.setState(
            (estado) => estado.usuario[atributo] = valor
        );

        this.setState({desable: false});

    }

    editarUsuario() {
        let usuario = this.state.usuario;
        this.UserService.editar(this.state.usuario.id, usuario,
            () => {
                this.setState({cadastro: false});
                //alert("Perfil alterado com sucesso!");
                // this.setState({sucesso: <Redirect to="/"/>})
                
            },
            (erro) => {
                console.log("Erro!");
                console.log(erro);
                this.setState({
                    avisoUsuario: "Erro inesperado ao alterar perfil:\n" + erro.message + "\nInforme ao administrador do sistema."
                });
            }
        )
    }

    confirmar() {

        let regexNome = /^[a-zA-Z\u00C0-\u00FF ]+$/;

        if (this.state.usuario.tipoVinculo !== "aluno" || (this.state.usuario.tipoVinculo === "aluno" && this.state.usuario.curso !== "")) {
            if (regexNome.test(this.state.usuario.nome)) {

                this.editarUsuario();

            } else {

                alert("Nome inválido! Não são aceitos números ou caracteres especiais.");
            }
        } else {
            alert("Preencha o campo 'CURSO'!");
        }
    }

    carregarImagem() {

        let {imagePreviewUrl} = this.state;
        let $imagePreview = null;

        let seletorImagem = (
            <div>

                <FormInputs
                    ncols={["col-md-6"]}
                    proprieties={[
                        {
                            label: "Altere sua foto de perfil: ",
                            type: "file",
                            accept: "image/*",
                            bsClass: "form-control",
                            placeholder: "File",
                            name: "arquivo",
                            onChange:this._handleImageChange
                        }
                    ]}
                />

                <Button
                    disabled={this.state.desable}
                    style={{width: "100%"}}
                    className="btnSaveif"
                    block
                    fill
                    type="submit"
                >
                    Alterar Perfil
                </Button>

            </div>
        );

        if (this.state.error !== "") {
            $imagePreview = (
                <Alert bsStyle="error">
                    {this.state.error}
                </Alert>
            );
        }

        if (imagePreviewUrl) {
            $imagePreview = <img src={imagePreviewUrl} width="30%" alt="Pré-visualização da imagem"/>;
        }

        if (this.state.loading) {
            $imagePreview = (<img src={boia} alt="Boia loading" className="boia ld ld-cycle"/>);
        }

        if (this.state.concluded) {
            return this.state.concluded;
        } else return (
            <div>
                {$imagePreview}
                {seletorImagem}
            </div>
        );
       
    }

    render() {

        let campoCurso = null;
        let $msg = null;
        let $red = null;
        // Estou comentando essa variavel porque ela nao esta sendo usada. Caso necessario, podem remover o comentario. Giordano
        // let erroCadastro = "";
       
        if (this.state.usuario.tipoVinculo === "aluno" && this.state.listaCurso) {
            campoCurso =
                <Row>
                    <FormGroup controlId="formControlSelectCurso" className="col-md-12">
                        <ControlLabel>Curso</ControlLabel>
                        <FormControl
                            componentClass="select"
                            placeholder="curso"
                            value={(this.state.usuario.curso !== null)?this.state.usuario.curso.id:""}
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

        // Estou comentando essa verificacao porque ela nao esta sendo usada. Caso necessario, podem remover o comentario. Giordano
        // if (this.state.avisoUsuario !== "") {
        //     erroCadastro =
        //         <div>
        //             <HelpBlock>{this.state.avisoUsuario}</HelpBlock>
        //         </div>
        // }

        if (this.state.success) {
            $msg = (
                <Alert bsStyle="success">
                    Perfil alterado com sucesso! <i className="pe-7s-check Id Idt-jump-in"/>
                </Alert>
                
            );
            $red = window.location.reload();
               
        }

        return (
            <div className="content">

                <Grid fluid>
                    <Row>
                        <Col md={8}>
                            <Card
                                title="Editar Perfil"
                                content={
                                    <form onSubmit={(event) => {
                                        event.preventDefault();
                                        this._handleSubmit(event.target);
                                        this.confirmar()
                                    }}>

                                        <Row>
                                            <FormGroup controlId="formHorizontalNome" className="col-md-12">
                                                <ControlLabel>Nome</ControlLabel>
                                                <FormControl
                                                    type="text"
                                                    value={this.state.usuario.nome}
                                                    onChange={(e) => this.setValor("nome", e.target.value)}
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
                                                        value={this.state.usuario.sobreUsuario ? this.state.usuario.sobreUsuario : ""}
                                                        onChange={(e) => this.setValor("sobreUsuario", e.target.value)}
                                                    />
                                                </FormGroup>
                                            </Col>
                                        </Row>

                                        {this.carregarImagem()}
                                        
                                        {$msg}
                                        

                                        <div className="clearfix"/>

                                    </form>
                                }
                            />
                        </Col>

                        <Col md={4}>
                            <UserCard

                                avatar={this.state.avatar}
                                name={this.state.nome}
                                curso={(this.state.curso) ? this.state.curso.nome : ""}
                                email={this.state.usuario.email}
                                description={this.state.desc}

                            />

                        </Col>
                        
                        {$red}

                    </Row>
                </Grid>
            </div>
        );
    }
}

export default UserProfile;


