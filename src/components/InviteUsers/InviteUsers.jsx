import React from 'react';
import {Col, Grid, Row} from 'react-bootstrap';
import {Card} from '../../components/Card/Card';
import {UserChip} from '../../elements/UserChip/UserChip';
import ServicoLogin from '../../login/ServicoLogin';
import Button from '../../elements/CustomButton/CustomButton.jsx';
import UserSearch from "../../components/UserSearch/UserSearch";
import GroupService from '../../views/Groups/GroupService';
import ListParticipants from '../../views/Groups/ListParticipants';

export default class InviteUsers extends React.Component {

    constructor(props) {
        super(props);

        this.groupService = new GroupService();

        this.state = {
            convidadosLista: [],
            pagina: "",
            idGrupo: this.props.idGrupo,
            coordenadoresGrupo: ""
        };

        this.groupService.listarGrupoEspecifico(this.props.idGrupo,
            (resultado) => {
                this.setState({grupo: resultado});
            },
            (erro) => {
                console.log("Erro:");
                console.log(erro);
            }
        );

        this.listarParticipantes();
        this.listaCoordenadores();

    }

    componentWillReceiveProps(proximoEstado) {
        this.setState({group: proximoEstado.group});
    }

    setarItem(paginaResultado) {
        this.setState({
            pagina: paginaResultado
        });
    }

    listarParticipantes() {
        this.groupService.listarParticipantes(this.state.idGrupo, 0,
            (resultado) => {
                this.setarItem(resultado);
                console.log("Participantes: ");
                console.log(this.state.pagina);
            },
            (erro) => {
                console.log("Erro:");
                console.log(erro);
            }
        );
    }


    adicionaConvidado(usuario) {
        let convidados = this.state.convidadosLista;

        if (this.state.convidadosLista.indexOf(usuario) === -1) {
            convidados.push(usuario);
            this.setState({
                convidadosLista: convidados
            });
        }
    }

    removeLista(usuario) {
        let i = 0;
        let convidados = this.state.convidadosLista;

        while (i < this.state.convidadosLista.length) {

            if (this.state.convidadosLista[i].id === usuario.id) {
                convidados.splice(i, 1);

                this.setState({
                    convidadosLista: convidados
                });
                i = convidados.length;
            }
            i++;
        }
    }

    convidar() {
        let i = 0;
        let idsUsuarios = [];
        while (i < this.state.convidadosLista.length) {
            idsUsuarios[i] = this.state.convidadosLista[i].id;
            i++;
        }
        this.groupService.convidarParticipante(this.state.grupo.id, idsUsuarios,
            () => {
                alert("Convites enviados com sucesso!");
                let convidados = [];
                this.setState({
                    convidadosLista: convidados
                });
            },
            (erro) => {
                console.log("Erro!");
                console.log(erro);
            }
        );
    }

    listaCoordenadores() {
        this.groupService.listarCoordenadores(this.state.idGrupo,
            (sucesso) => {
                this.setState({coordenadoresGrupo: sucesso});
            },
            (erro) => {
                console.log(erro);
            }
        );
    }

    render() {
        let campoParticipantes = null;
        if (this.state.pagina) {
            campoParticipantes = <div>
                <p>Integrantes</p>
                <ListParticipants idGrupo={this.state.idGrupo} pagina={this.state.pagina} icone='pe-7s-close-circle' coordenadoresGrupo= {this.state.coordenadoresGrupo}/>
            </div>
        }

        let campoConvidados = null;

        if (this.state.convidadosLista.length > 0) {

            campoConvidados =
                <Card
                    title="Convidados"
                    content={
                        <div>
                            {this.state.convidadosLista.map((usuario) => {
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
                                        this.removeLista(e);
                                    }}
                                />
                            })}
                            <br/><br/>
                            <Button
                                bsStyle="danger"
                                pullRight
                                fill

                                onClick={() => {
                                    this.convidar();
                                }}
                            >
                                Convidar
                            </Button>
                            <div className="clearfix"/>
                        </div>
                    }
                />
        } else {
            campoConvidados =
                <Card
                    title="Convidados"
                    content={
                        <div style={{margin: "20px"}}>
                            <p>Nenhum usuário adicionado!</p>
                        </div>
                    }
                />
        }
        return (
            <div className="content">
                <Grid fluid>

                    <Col md={8}>
                        <Row>
                            {campoParticipantes}
                            <br/>
                            {campoConvidados}
                        </Row>
                    </Col>

                    <Row>
                        <Col md={4}>
                            <UserSearch
                                adicionaListaConvite={(usuario) => {
                                    this.adicionaConvidado(usuario);
                                }}
                                convidados={this.state.convidadosLista}
                                idGrupo={this.state.idGrupo}
                            />
                        </Col>
                    </Row>
                </Grid>
            </div>
        );

    }
}