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
            pagina: 0
        };

        this.setState({
            listaUsuario: this.pesquisar(0)
        });
    }

    pesquisar(pagina) {
        listUserService.pesquisarPaginado(
            this.state.nome, pagina,
            (sucesso) => {
                this.setState({listaUsuario: sucesso});
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

    // Esse metodo adiciona a acao ao botao do chip
    adicionarUsuario(usuario) {
        console.log("userId = " + usuario.id);
        console.log("userName = " + usuario.nome);
        this.props.adicionaListaConvite (usuario);
     
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