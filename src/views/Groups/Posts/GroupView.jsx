import React, {Component} from 'react';
import {Col, Grid, Row} from 'react-bootstrap';
import Alert from "react-bootstrap/es/Alert";
import {Card} from '../../../components/Card/Card.jsx';
import PostService from './PostsService';
import TopicService from '../CreateTopic/TopicService';
import GroupService from '../GroupService';
import PostList from './PostList';
import NewPost from './NewPost';
import TopicCard from '../CreateTopic/TopicCard';
import Button from '../../../elements/CustomButton/CustomButton.jsx';
import servicoLogin from "../../../login/ServicoLogin";
import EditGroup from '../EditGroup';
import Redirect from "react-router-dom/es/Redirect";


class GroupView extends Component {

    constructor(props) {

        super(props);

        this.groupService = new GroupService();
        this.postService = new PostService();
        this.topicService = new TopicService();

        this.state = {
            show: false,
            showEditGroup: false,
            pagina: {},
            post: {},
            loading: "none",
            topico: {id: this.props.idt},
            paginaAtual: 0,
            tipoAlert: "",
            msgAlert: "",
            participantes: false,
            grupo: this.buscaGrupo()
        };
    }

    componentWillReceiveProps(proximoEstado) {
        this.setState(
            (estado) => estado.topico.id = proximoEstado.idt
        );
        this.buscaGrupo();
    }

    buscaGrupo() {
        this.groupService.listarGrupoEspecifico(this.props.id,
            (resultado) => {
                this.setState({grupo: resultado});
                this.verificarCoordenador();
                (this.state.topico.id) ? this.listarPostEspecifico(this.state.paginaAtual) : this.listar(this.state.paginaAtual);
            },
            (erro) => {
                console.log("Erro:");
                console.log(erro);
            }
        )
    }

    verificarCoordenador() {
        this.state.coordenador = false;
        this.state.grupo.coordenadoresGrupo.map((usuario) => {
            if (usuario.id === servicoLogin.getUsuario()) {
                this.state.coordenador = true;
            }
        });
    }

    setarItem(paginaResultado) {
        this.setState({
            pagina: paginaResultado
        });

    }

    setarTopico(topico) {
        this.setState({
            topico: topico
        });
    }

    abrirNovoPost() {
        this.setState({
            show: true
        });
    }

    abrirEditGroup() {
        this.setState({
            showEditGroup: true
        });
    }

    marcarTopicoResolvido() {
        this.topicService.marcarTopicoResolvido(
            this.state.grupo.id, this.state.topico.id,
            () => {
                this.listarPostEspecifico(this.state.paginaAtual);
            },
            (erro) => {
                console.log("Erro:");
                console.log(erro);
            }
        )
    }

    loading(value) {
        this.setState({
            loading: value
        });
    }

    listar(pagina) {
        this.setState({topicoGeral: true});
        this.postService.listarPostGeral(this.props.id, pagina,
            (resultado) => {
                //console.log(resultado);
                this.setarItem(resultado);
            },
            (erro) => {
                console.log("Erro:");
                console.log(erro);
            }
        );
    }

    listarPostEspecifico(pagina) {
        this.postService.listarPostEspecifico(this.state.grupo.id, this.state.topico.id, pagina,
            (resultado) => {
                this.setarItem(resultado);
            },
            (erro) => {
                console.log("Erro:");
                console.log(erro);
            }
        );
        this.listarTopicoEspecifico();
    }

    listarTopicoEspecifico() {
        this.topicService.listarTopicosEspecifico(this.state.topico.id,
            (resultado) => {
                this.setarTopico(resultado);
            },
            (erro) => {
                console.log("Erro:");
                console.log(erro);
            }
        );
    }

    setarGrupo(resultado) {
        this.setState({
            grupo: resultado
        });
    }

    listarGrupo() {
        this.groupService.listarGrupoEspecifico(this.state.grupo.id,
            (resultado) => {
                console.log(resultado);
                this.setarGrupo(resultado);
            },
            (erro) => {
                console.log("Erro:");
                console.log(erro);
            }
        );
    }

    setAlert(msg, tipo) {
        this.setState({
            msgAlert: msg,
            tipoAlert: tipo
        });
    }

    upload(form, idPost) {

        let formData = new FormData(form);
        fetch("/api/posts/" + idPost + "/anexo", {
            method: "POST",

            headers: new Headers({
                'Authorization': servicoLogin.getAuthorization()

            }),
            body: formData
        }).then((resultado) => {

            if (resultado.ok) {
                this.setState(
                    (anterior) => {
                        anterior.update = anterior.update + 1;
                        console.log("Mudou");


                        return anterior;
                    }
                );
            } else {
                resultado.json().then(
                    (resultadoErro) => {
                        this.setAlert(resultadoErro + "!", "danger");
                    }
                )
            }
        });

        this.loading("none");
        this.setState({show: false});

    }

    static data(date) {
        if (date !== undefined) {
            let dateParts = date.split("-");
            return dateParts[2] + "/" + dateParts[1] + "/" + dateParts[0];
        } else {
            return "";
        }
    }

    editarComCategorias(id, item, idCategoria, sucesso, erro) {
        console.log(item);
        fetch(`api/grupos/${id}/${idCategoria}`, {
            method: "PUT",
            headers: new Headers({
                'Authorization': servicoLogin.getAuthorization(),
                'Content-Type': 'application/json'
            }),
            body: JSON.stringify(item)
        }).then((resultado) => {
            if (resultado.ok) {
                sucesso();
            } else {
                resultado.json().then(
                    (resultadoErro) => erro(resultadoErro)
                )
            }

        });
    }

    irParticipants() {
        this.setState({
            participantes: <Redirect to={"/MyGroups/" + this.state.grupo.id + "/participantes"}/>
        });
    }

    render() {
        if (this.state.participantes) {
            return this.state.participantes;
        }
        let aviso = null;
        let resolvido = <div>
            <br/><br/>
        </div>;

        if (this.state.topico.dataFinalizacao) {
            resolvido = <Alert bsStyle="success" id="res">
                Tópico Resolvido
                {/*<i className="pe-7s-check"/>*/}
            </Alert>
        } else if (this.state.coordenador) {
            if (this.state.topico.id) {
                resolvido = <div>
                    <Button
                        onClick={(e) => {
                            this.marcarTopicoResolvido();
                        }}
                        className="btnResolvido"
                    >
                        Marcar tópico como resolvido
                    </Button>
                    <br/><br/>
                </div>
            } else {
                resolvido = <div>
                    <br/><br/>
                </div>
            }
        }

        if (this.state.msgAlert !== "") {

            let status;
            if (this.state.tipoAlert === "success") {
                status = "Concluído!";
            } else status = "Erro!";
            aviso = <Alert bsStyle={this.state.tipoAlert}>
                <strong>{status}</strong> {this.state.msgAlert}
            </Alert>
        }

        if (!this.state.grupo || this.state.coordenador == null) {
            return <div/>;
        } else return (
            <div className="content">

                <div style={{padding: 15}}>

                    <h1 style={{fontSize: '30px'}}>{this.state.grupo.nome} - {(this.state.topico.id) ?
                        this.state.topico.nome : "Geral"}</h1>


                    <small>{(this.state.topico.id && this.state.topico.criadorTopico) ?
                        "Criador do Tópico: " + this.state.topico.criadorTopico.nome + ", Data: "
                        + GroupView.data(this.state.topico.dataCriacao) :
                        +(this.state.grupo.donoGrupo !== undefined) ? "Data: " + GroupView.data(this.state.grupo.dataCriacao)
                            + " - Dono do Grupo: " + this.state.grupo.donoGrupo.nome : ""}</small>
                    <br/>
                    {resolvido}
                    <Button
                        bsStyle="default"
                        bsSize="small"
                        fill
                        onClick={(e) => {
                            this.irParticipants();
                        }}
                    >
                        Participantes
                    </Button>

                    <Button
                        onClick={(e) => {
                            this.abrirEditGroup();
                        }}
                        style={{border: "0", backgroundColor: "transparent", color: "red", float: "right"}}
                    >
                        Editar Grupo
                    </Button>

                </div>

                <Grid fluid>
                    {aviso}
                    <Row>
                        <Col md={8}>
                            <Card
                                title="Postagens"
                                content={
                                    <from>
                                        {!this.state.topico.dataFinalizacao ?
                                            <Button
                                                className="btnSaveif"
                                                pullRight
                                                fill
                                                onClick={(e) => {
                                                    this.abrirNovoPost();
                                                }}
                                            >
                                                Novo Post
                                            </Button>
                                            : ""}

                                        <PostList posts={this.state.pagina}/>

                                        <div className="clearfix"/>
                                    </from>
                                }
                            />
                        </Col>
                        <TopicCard
                            grupo={this.state.grupo}
                            coordenador={this.state.coordenador}
                            mostraErro={(erro, tipo) => {
                                this.setAlert(erro, tipo);
                            }}
                        />
                    </Row>
                    {/*}
                    <Participants 
                    voltarParticipants={() => { this.setState({ participantes: false }); }}
                    showParticipants={this.state.participantes}
                    idGrupo={this.state.grupo.id}
                            />*/}

                    {this.state.showEditGroup ?
                        <EditGroup
                            voltarEditGroup={() => {
                                this.setState({showEditGroup: false});
                            }}
                            showEditGroup={this.state.showEditGroup}
                            idGrupo={this.state.grupo.id}

                            editar={(group, id, idCategoria) => {
                                this.groupService.atualizar(group, id, idCategoria,
                                    (grupo) => {
                                        alert("Grupo alterado com sucesso!");
                                        this.setState({
                                            group: grupo,
                                        });
                                    },
                                    (erro) => {
                                        console.log("Erro!");
                                        console.log(erro);
                                    }
                                );
                            }}
                            group={this.state.grupo}
                        /> : ""}

                    <NewPost
                        voltar={() => {
                            this.setState({show: false});
                        }}
                        show={this.state.show}
                        loading={this.state.loading}

                        upload={(anexo) => {
                            this.upload(anexo);
                        }}
                        inserir={(post, anexo) => {
                            this.loading("");
                            let topicoId;
                            if (this.state.topico.id) {
                                topicoId = this.state.topico.id;
                            } else topicoId = 0;

                            this.postService.inserirEmTopico(post, this.state.grupo.id, topicoId,
                                (post) => {

                                    if (anexo) {
                                        this.upload(anexo, post.id);
                                    }
                                    this.loading("none");
                                    this.setAlert("Post realizado com sucesso!", "success");
                                    this.setState({show: false});
                                    (this.state.topico.id) ? this.listarPostEspecifico(this.state.paginaAtual) : this.listar(this.state.paginaAtual);
                                },
                                (erro) => {
                                    console.log("Erro!");
                                    console.log(erro);

                                    this.setAlert(erro + "!", "danger");
                                }
                            );

                        }}
                        post={this.state.post}
                    />

                </Grid>
            </div>
        );
    }

}

export default GroupView;
