import React, {Component} from 'react';
import {Col, ControlLabel, FormControl, FormGroup, Grid, Row} from 'react-bootstrap';

import {Card} from '../../components/Card/Card.jsx';
import {FormInputs} from '../../components/FormInputs/FormInputs.jsx';
import {UserCard} from '../../components/UserCard/UserCard.jsx';
import Button from '../../elements/CustomButton/CustomButton.jsx';

import avatar from "../../assets/img/faces/face-3.jpg";

class UserProfile extends Component {
    render() {
        return (
            <div className="content">
                <Grid fluid>
                    <Row>
                        <Col md={8}>
                            <Card
                                title="Editar Perfil"
                                content={
                                    <form>
                                        <FormInputs
                                            ncols={["col-md-12"]}
                                            proprieties={[
                                                {
                                                    label: "E-mail",
                                                    type: "prefixoEmail",
                                                    bsClass: "form-control",
                                                    placeholder: "E-mail",
                                                    defaultValue: "mandrew@restinga.ifrs.edu.br",
                                                    disabled: true
                                                }

                                            ]}
                                        />
                                        <FormInputs
                                            ncols={["col-md-6", "col-md-6"]}
                                            proprieties={[
                                                {
                                                    label: "Nome",
                                                    type: "text",
                                                    bsClass: "form-control",
                                                    placeholder: "First name",
                                                    defaultValue: "Mike"
                                                },
                                                {
                                                    label: "Sobrenome",
                                                    type: "text",
                                                    bsClass: "form-control",
                                                    placeholder: "Last name",
                                                    defaultValue: "Andrew"
                                                }
                                            ]}
                                        />

                                        <Row>
                                        <FormGroup controlId="formControlsSelect" className="col-md-12">
                                            <ControlLabel>Vínculo</ControlLabel>
                                            <FormControl componentClass="select" placeholder="vinculo">
                                                <option value="aluno">Aluno</option>
                                                <option value="professor">Professor</option>
                                                <option value="servidor">Servidor Técnico</option>

                                            </FormControl>
                                        </FormGroup>
                                        </Row>

                                        <Row>
                                        <FormGroup controlId="formControlsSelect" className="col-md-12">
                                            <ControlLabel>Curso</ControlLabel>
                                            <FormControl componentClass="select" placeholder="curso">
                                                <option value="">Superior de Tecnologia em Análise e Desenvolvimento de
                                                    Sistemas
                                                </option>
                                                <option value="">Licenciatura em Letras Português e Espanhol</option>
                                                <option value="">Superior de Tecnologia em Gestão Desportiva e de
                                                    Lazer
                                                </option>
                                                <option value="">Superior de Tecnologia em Eletrônica Industrial
                                                </option>
                                                <option value="">Técnico em Redes de Computadores - Modalidade
                                                    Concomitante
                                                </option>
                                                <option value="">Técnico em Eletrônica Integrado ao Ensino Médio
                                                </option>
                                                <option value="">Técnico em Informática Integrado ao Ensino Médio
                                                </option>
                                                <option value="">Técnico em Lazer Integrado ao Ensino Médio</option>
                                                <option value="">Técnico em Informática para Internet Integrado ao
                                                    Ensino Médio
                                                </option>
                                                <option value="">Técnico em Comércio Integrado ao Ensino Médio
                                                    modalidade Proeja
                                                </option>
                                                <option value="">Técnico em Agroecologia Integrado ao Ensino Médio
                                                    modalidade Proeja
                                                </option>
                                                <option value="">Técnico em Recursos Humanos Integrado ao Ensino Médio
                                                    modalidade Proeja
                                                </option>
                                                <option value="">Técnico em Guia de Turismo Subsequente ao Ensino
                                                    Médio
                                                </option>
                                            </FormControl>
                                        </FormGroup>
                                        </Row>

                                        <Row>
                                            <Col md={12}>
                                                <FormGroup controlId="formControlsTextarea">
                                                    <ControlLabel>Sobre mim</ControlLabel>
                                                    <FormControl rows="5" componentClass="textarea"
                                                                 bsClass="form-control"
                                                                 placeholder="Fale um pouco sobre você..."
                                                                 defaultValue="Sou bem bacana e gente boa."/>
                                                </FormGroup>
                                            </Col>
                                        </Row>
                                        <Button
                                            bsStyle="danger"
                                            pullRight
                                            fill
                                            type="submit"

                                        >
                                            Atualizar Perfil
                                        </Button>
                                        <div className="clearfix"></div>
                                    </form>
                                }
                            />
                        </Col>
                        <Col md={4}>
                            <UserCard
                                avatar={avatar}
                                name="Mike Andrew"
                                curso="Superior de Tecnologia em Análise e Desenvolvimento de Sistemas"
                                description="Sou bem bacana e gente boa."

                            />
                        </Col>

                    </Row>
                </Grid>
            </div>
        );
    }
}

export default UserProfile;


