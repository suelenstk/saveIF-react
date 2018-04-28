import React from 'react';

import {Col, FormControl, FormGroup, Grid, Row} from 'react-bootstrap';
import InputGroup from "react-bootstrap/es/InputGroup";
import {Card} from '../../components/Card/Card.jsx';
import UserService from '../../services/UserService';
import listUserService from "../../services/ListUserService";
import {UserChip} from '../../elements/UserChip/UserChip';

import avatar from "../../assets/img/default-avatar.png";
import Button from "react-bootstrap/es/Button";


class UserSearch extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            listaUsuario: "",

        };

        this.UserService = new UserService();

        this.setState({
            listaUsuario: (
                listUserService.listarNaoPaginado(
                    (sucesso) => {
                        this.setState({listaUsuario: sucesso});
                        console.log("Sucesso");
                        console.log(this.state.listaUsuario);
                    },
                    (erro) => {
                        console.log(erro);
                    }
                )
            )
        });
    }

    setValor(atributo, valor) {
        this.setState(
            (estado) => estado.usuario[atributo] = valor
        );
    }


    render() {
        let campoUsuario = null;

        if (this.state.listaUsuario) {
            campoUsuario =
                <div>
                    {this.state.listaUsuario.map((usuario) => {
                        return <UserChip
                            value={usuario.id}
                            key={usuario.id}
                            nome={usuario.nome}
                            avatar={avatar}
                            alt={usuario.nome}
                            nomeBtn="addUserbtn"
                            icone="pe-7s-add-user"
                            largura="100%"
                        ></UserChip>
                    })}

                </div>
        }


        return (
            <div className="content">
                <Grid fluid>
                    <Row>
                        <Col md={4} className="searchUsers">
                            <Card
                                title="Pesquisar usuários"
                                content={
                                    <div>
                                        <form>
                                            <FormGroup>
                                                <InputGroup>
                                                    <InputGroup.Button>
                                                        <Button className="btnSearch">
                                                            <i className="fa fa-search"/>
                                                        </Button>
                                                    </InputGroup.Button>
                                                    <FormControl
                                                        type="text"
                                                        placeholder="Pesquisar"
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
                            />
                        </Col>
                    </Row>
                </Grid>
            </div>
        );
    }
}

export default UserSearch;