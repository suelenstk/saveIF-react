import React from 'react';
import { Col, Grid, Row } from 'react-bootstrap';
import Alert from "react-bootstrap/es/Alert";

import { Card } from '../../../components/Card/Card.jsx';
import CreateGroupElement from './CreateGroupElement';
import RightCard from './RightCard';
import GroupService from '../GroupService.jsx';
import CategoryService from "../../../services/CategoryService";
import servicoLogin from '../../../login/ServicoLogin'
import GroupImage from '../../../components/GroupImage/GroupImage';
import Redirect from "react-router-dom/es/Redirect";

class GroupPage extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            concluded: "",
            privacy: "",
            invite: "none",
            photo: "none",
            page: "1",
            group: {},
            category: {},
            convidados: []
        };

        this.groupService = new GroupService();
        this.categoryService = new CategoryService();
    }

    setLista(categorias) {

        this.setState({
            category: categorias
        });

    }

    setAlert(valor) {
        this.setState({
            alert: valor
        });
    }

    listaCategorias() {
        this.categoryService.listarNaoPaginado(
            (resultado) => {
                console.log(resultado);
                this.setLista(resultado);
            },
            (erro) => {
                console.log("Erro:");
                console.log(erro);
            }
        );
    }


    inserirComCategorias(item, idCategoria, sucesso, erro) {
        console.log(item);
        fetch(`api/grupos/${idCategoria}`, {
            method: "POST",
            headers: new Headers({
                'Authorization': servicoLogin.getAuthorization(),
                'Content-Type': 'application/json'
            }),
            body: JSON.stringify(item)
        }).then((resultado) => {
            if (resultado.ok) {
                resultado.json().then(sucesso)
            } else {
                resultado.json().then(
                    (resultadoErro) => erro(resultadoErro)
                )
            }

        });
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

    btnIrParaGrupo() {
        this.setState({
            concluded: <Redirect to={"/MyGroups/" + this.state.group.id + "/geral"} />
        })
    }

    render() {
        let aviso = null;

        if (this.state.alert) {
            aviso = <Alert bsStyle="success">
                <strong>Concluído!</strong> Grupo criado com sucesso. <i className="pe-7s-check ld ldt-jump-in" />
            </Alert>
        }

        if (this.state.concluded) {
            return this.state.concluded;
        } else return (
            <div className="content">
                <Grid fluid>
                    {aviso}
                    <Row>
                        <Col md={8}>

                            <CreateGroupElement
                                privacy={this.state.privacy}

                                lista={this.state.category}

                                voltar={() => {
                                    this.setState({
                                        privacy: "",
                                        photo: "none"
                                    });
                                }}

                                confirmar={() => {
                                    this.setState({
                                        privacy: "none",
                                        photo: ""
                                    });
                                }}

                                alert={() => {
                                    this.setState({ alert: false });
                                }}

                                inserir={(group, idCategoria) => {
                                    this.inserirComCategorias(group, idCategoria,
                                        (grupo) => {

                                            this.setState({
                                                privacy: "none",
                                                group: grupo,
                                                invite: "",
                                                page: "2",
                                                photo: "none"
                                            });
                                            this.setAlert(true);
                                        },
                                        (erro) => {
                                            console.log("Erro!");
                                            console.log(erro);
                                        }
                                    );
                                }}

                                page={this.state.page}
                                group={this.state.group}

                                convidados={this.state.convidados}
                            />
                        </Col>

                        <RightCard
                            information={this.state.page == "1" ? "" : "none"}
                            search={this.state.page == "2" ? "" : "none"}
                            confirmar={() => {
                                this.setState({
                                    privacy: "none",
                                    page: "3",
                                    photo: ""
                                });
                            }}
                            adicionaConvidado={(usuario) => {
                                
                                this.state.convidados.push(usuario);
                               
                            }}
                            convidados={this.state.convidados}
                        />

                    </Row>
                    <Row style={{ display: this.state.photo }}>
                        <Col md={8}>
                            <Card
                                title=""
                                content={
                                    <div>
                                        <GroupImage
                                            id={this.state.group.id}
                                        />
                                        <button
                                            style={{ borderStyle: 'none', float: 'right', color: 'red' }}
                                            onClick={() => {
                                                this.btnIrParaGrupo()
                                            }}
                                        >
                                            Ir para o grupo
                                        </button>
                                        <div className="clearfix" />
                                    </div>
                                }
                            />
                        </Col>
                    </Row>

                    <div style={{ display: 'table' }}>
                        <div style={{ display: 'table', float: 'left' }}>
                            <div className="circle" style={{ backgroundColor: this.state.page == "1" ? "red" : "", color: 'white' }}>1</div>
                            <h4 style={{ float: 'right', padding: '0px 10px 0px 10px' }}>Crie o Grupo</h4>
                        </div>

                        <div style={{ display: 'table', float: 'left' }}>
                            <div className="circle" style={{ backgroundColor: this.state.page == "2" ? "red" : "", color: 'white', color: 'white' }}>2</div>
                            <h4 style={{ float: 'right', padding: '0px 10px 0px 10px' }}>Convide Participantes</h4>
                        </div>

                        <div style={{ display: 'table', float: 'left' }}>
                            <div className="circle" style={{ backgroundColor: this.state.page == "3" ? "red" : "", color: 'white', color: 'white' }}>3</div>
                            <h4 style={{ float: 'right', padding: '0px 10px 0px 10px' }}>Adicione uma foto</h4>
                        </div>
                    </div>
                </Grid>
            </div>
        );
    }
}

export default GroupPage;