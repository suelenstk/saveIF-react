import React, { Component } from 'react';
import { Grid, Col, Row } from 'react-bootstrap';
import Alert from "react-bootstrap/es/Alert";
import { Card } from '../../../components/Card/Card.jsx';
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

        this.state = {
            show: false,
            showEditGroup: false,
            pagina: {},
            post: {},
            loading: "none",
            grupo: { id: this.props.id },
            topico: { id: this.props.idt },
            paginaAtual: 0,
            tipoAlert: "",
            msgAlert: "",
            participantes: ""
        }



        //alert(this.state.topico.id);
        //alert(this.state.grupo.id);

        this.postService = new PostService();
        this.groupService = new GroupService();
        this.topicService = new TopicService();

        (this.state.topico.id) ? this.listarPostEspecifico(this.state.paginaAtual) : this.listar(this.state.paginaAtual);
        this.listarGrupo();
    }

    setarItem(paginaResultado) {

        //console.log(paginaResultado);
        this.setState({
            pagina: paginaResultado
        });

    }

    setarTopico(topico) {
        //console.log(paginaResultado);
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

    loading(value) {
        this.setState({
            loading: value
        });
    }

    listar(pagina) {

        //console.log(this.state.grupo.id);
        this.postService.listarPostGeral(this.state.grupo.id, pagina,
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
                console.log(resultado);
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
                console.log(resultado);
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
        this.setState({ show: false });

    }

    data(date) {
        //console.log(date);

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

    irParticipants () {
        this.setState({
            participantes: <Redirect to={"/MyGroups/" + 15 + "/geral"}/>
        });
    }


    render() {

        //console.log(this.state.topico.criadorTopico);
        //<PostList posts={this.state.pagina}/>   

        //alert(this.state.pagina.totalPages); 
        if (this.state.paticipantes){
            return this.state.participantes;
        }   

        let aviso = null;

        if (this.state.msgAlert !== "") {

            let status;
            if (this.state.tipoAlert === "success") {
                status = "Concluído!";
            } else status = "Erro!";
            aviso = <Alert bsStyle={this.state.tipoAlert}>
                <strong>{status}</strong> {this.state.msgAlert}
            </Alert>
        }


        return (
            <div className="content">

                <div style={{ padding: 15 }}>

                    <h1 style={{ fontSize: '30px' }}>{this.state.grupo.nome} - {(this.state.topico.id) ?
                        this.state.topico.nome : "Geral"}</h1>

                    {/*<Button bsStyle="danger"
                            pullRight
                            fill
                            onClick={(e) => { this.irParticipants(); }} style={{ float: "left" }}>Participantes</Button>*/}
                    <button onClick={(e) => { this.abrirEditGroup(); }} style={{ border: "0", backgroundColor: "transparent", color: "red", float: "right" }}>Editar Grupo</button>

                    <small>{(this.state.topico.id && this.state.topico.criadorTopico) ?
                        "Criador do Tópico: " + this.state.topico.criadorTopico.nome + ", Data: "
                        + this.data(this.state.topico.dataCriacao) :
                        +(this.state.grupo.donoGrupo !== undefined) ? "Data: " + this.data(this.state.grupo.dataCriacao)
                            + " - Dono do Grupo: " + this.state.grupo.donoGrupo.nome : ""}</small>


                </div>


                <Grid fluid>
                    {aviso}
                    <Row>

                        <Col md={8}>
                            <Card
                                title="Postagens"
                                content={

                                    <from>
                                        
                                        <Button
                                            bsStyle="danger"
                                            pullRight
                                            fill

                                            onClick={(e) => {
                                                this.abrirNovoPost();
                                            }}
                                        >
                                            Novo Post
                                        </Button>
                                        
                                        <PostList posts={this.state.pagina} />
                                        
                                        <div className="clearfix"></div>

                                    </from>
                                }
                            />
                        </Col>

                        <TopicCard
                            idGrupo={this.state.grupo.id}
                            mostraErro={(erro, tipo) => { this.setAlert(erro, tipo); }}

                        />

                    </Row>

                    <EditGroup
                        voltarEditGroup={() => { this.setState({ showEditGroup: false }); }}
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
                    />

                    <NewPost
                        voltar={() => { this.setState({ show: false }); }}
                        show={this.state.show}
                        loading={this.state.loading}

                        upload={(anexo) => { this.upload(anexo); }}
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
                                    this.setState({ show: false });
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
