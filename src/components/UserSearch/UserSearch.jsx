import React from 'react';

import {FormControl, FormGroup} from 'react-bootstrap';
import InputGroup from "react-bootstrap/es/InputGroup";
import {Card} from '../../components/Card/Card.jsx';
import {UserChip} from '../../elements/UserChip/UserChip';
import ServicoLogin from '../../login/ServicoLogin';
import Button from "react-bootstrap/es/Button";
import listUserService from "../../services/ListUserService";
import PaginationSaveIf from "../../elements/PaginationSaveIf/PaginationSaveIf";

class UserSearch extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            listaUsuario: "",
            nome: "",
            pagina: 0,
            idGrupo: this.props.idGrupo
        };

        this.pesquisar(0);
    }

    componentWillReceiveProps(proximoEstado) {
        this.setState({grupo: proximoEstado.grupo});
    }

    /*
    pesquisar(pagina) {
        listUserService.pesquisarPaginado (
            this.state.nome, pagina,
            (sucesso) => {
                this.setState({ listaUsuario: sucesso });
                this.removeUsuarioLista();
            },
            (erro) => {
                console.log(erro);
            }
        );
        this.setState({ pagina: pagina });
    }
*/

    pesquisar(pagina) {
        listUserService.pesquisarPaginadoNaoEstaGrupo(
            this.state.nome, pagina, this.state.idGrupo,
            (sucesso) => {
                this.setState({listaUsuario: sucesso});
                this.removeUsuarioLista();
            },
            (erro) => {
                console.log(erro);
            }
        );
        this.setState({pagina: pagina});
    }

    sleep(tempo) {
        return new Promise((e) => setTimeout(e, tempo));
    }

    // Esse sleep faz a busca automatica, sem precisar dar enter,
    // entretanto, isso obriga ele a fazer muitas requisicoes.
    // Podemos remove-lo, caso o desempenho seja mais vantajoso.
    setNome(nome) {
        this.setState({nome: nome});
        this.setState({pagina: 0});
        this.sleep(200).then(() => {
            this.pesquisar(this.state.pagina);
        });
    }

    setColorIcon() {
        this.setState({
            colorIcon: "red"
        });
    }

    removeUsuarioLista() {
        let i = 0;
        if (this.state.listaUsuario.totalPages && this.props.convidados) {
            while (i < this.props.convidados.length) {
                this.state.listaUsuario.content.map((usuario, index, array) => this.props.convidados[i].id === usuario.id ? array.splice(index, 1) : "");
                i++;
            }
        }
    }

    // Esse metodo adiciona a acao ao botao do chip
    adicionarUsuario(convidado) {
        console.log("userId = " + convidado.id);
        console.log("userName = " + convidado.nome);
        this.setColorIcon();
        this.props.adicionaListaConvite(convidado);
        this.removeUsuarioLista();
    }

    render() {
        let campoUsuario = null;

        if (this.state.listaUsuario.totalPages) {
            campoUsuario =
                <div>
                    {this.state.listaUsuario.content.map((usuario) => {
                        return <UserChip
                            usuario={usuario}
                            key={usuario.id}
                            nome={usuario.nome}
                            avatar={`/api/usuarios/` + usuario.id + `/imagem?` +
                            ServicoLogin.getAuthorizationGet()}
                            alt={usuario.nome}
                            class="addUserbtn"
                            icone="pe-7s-add-user"
                            colorIcon={this.state.colorIcon}
                            evento={(e) => {
                                this.adicionarUsuario(e);
                            }}
                        />
                    })}
                </div>
        } else {
            campoUsuario =
                <div style={{margin: "20px"}}>
                    <p>Nenhum usuário encontrado!</p>
                </div>
        }

        return (
            <Card
                title="Pesquisar usuários"
                content={
                    <div style={{overflow: "auto", height: "415px"}}>
                        <form onSubmit={(event) => {
                            event.preventDefault();
                            this.pesquisar(0)
                        }}>
                            <FormGroup>
                                <InputGroup>
                                    <InputGroup.Button>
                                        <Button className="btnSearch" type="submit">
                                            <i className="fa fa-search"/>
                                        </Button>
                                    </InputGroup.Button>
                                    <FormControl
                                        type="text"
                                        placeholder="Pesquisar"
                                        onChange={(e) => this.setNome(e.target.value)}
                                    />
                                </InputGroup>
                            </FormGroup>
                        </form>
                        <FormGroup>
                            <FormControl.Static>
                                {campoUsuario}
                            </FormControl.Static>
                        </FormGroup>
                    </div>
                }

                legend={
                    <PaginationSaveIf
                        lista={this.state.listaUsuario}
                        pagina={this.state.pagina}
                        setPagina={(e) => {
                            this.pesquisar(e);
                        }}
                    />
                }
            />
        );
    }
}

export default UserSearch;