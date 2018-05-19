import React from 'react';

import {FormControl, FormGroup} from 'react-bootstrap';
import InputGroup from "react-bootstrap/es/InputGroup";
import {Card} from '../../components/Card/Card.jsx';
import {UserChip} from '../../elements/UserChip/UserChip';

import avatar from "../../assets/img/default-avatar.png";
import Button from "react-bootstrap/es/Button";
import listUserService from "../../services/ListUserService"
import Pager from "react-bootstrap/es/Pager";

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
                console.log(this.state.listaUsuario);
            },
            (erro) => {
                console.log(erro);
            }
        );
        this.setValor("pagina", pagina);
    }

    setValor(atributo, valor) {
        this.setState(
            (estado) => estado[atributo] = valor
        );
    }


    render() {
        let campoUsuario = null;

        let statusPrev = true;
        let statusNext = true;

        if (this.state.pagina > 0) {
            statusPrev = false;
        }

        if (this.state.pagina < this.state.listaUsuario.totalPages - 1) {
            statusNext = false;
        }

        if (this.state.listaUsuario) {
            campoUsuario =
                <div>
                    {this.state.listaUsuario.content.map((usuario) => {
                        return <UserChip
                            value={usuario.id}
                            key={usuario.id}
                            nome={usuario.nome}
                            avatar={avatar}
                            alt={usuario.nome}
                            nomeBtn="addUserbtn"
                            icone="pe-7s-add-user"
                        />
                    })}
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
                                        onChange={(e) => this.setValor("nome", e.target.value)}
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
                    <Pager>
                        <Pager.Item
                            previous
                            disabled={statusPrev}
                            onClick={(e) => {
                                this.pesquisar(this.state.pagina - 1);
                            }}
                        >
                            &lt; Anterior
                        </Pager.Item>
                        <Pager.Item
                            next
                            disabled={statusNext}
                            onClick={(e) => {
                                this.pesquisar(this.state.pagina + 1);
                            }}
                        >
                            Próxima &gt;
                        </Pager.Item>
                    </Pager>
                }
            />
        );
    }
}

export default UserSearch;