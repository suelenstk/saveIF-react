import React, {Component} from 'react';
import {Col, ControlLabel, FormControl, FormGroup, Grid, Row} from 'react-bootstrap';

import {Card} from '../../components/Card/Card.jsx';
import {FormInputs} from '../../components/FormInputs/FormInputs.jsx';
import Button from '../../elements/CustomButton/CustomButton.jsx';


class UserRegistration extends Component {
    render() {
        return (
            <div className="cardCadastro">
                <Grid fluid>
                    <Row>
                        <Col md={12}>
                            <Card
                                title="Cadastro de usuário"
                                content={
                                    <form>
                                        <FormInputs
                                            ncols={["col-md-12"]}
                                            proprieties={[
                                                {
                                                    label: "E-mail",
                                                    type: "email",
                                                    bsClass: "form-control",
                                                    placeholder: "E-mail",
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
                                                    placeholder: "Nome",
                                                },
                                                {
                                                    label: "Sobrenome",
                                                    type: "text",
                                                    bsClass: "form-control",
                                                    placeholder: "Sobrenome",
                                                }
                                            ]}
                                        />
                                        {/*TODO criar botao para esconder senha*/}
                                        <FormInputs
                                            ncols={["col-md-6", "col-md-6"]}
                                            proprieties={[
                                                {
                                                    label: "Senha",
                                                    type: "text",
                                                    bsClass: "form-control",
                                                    placeholder: "Senha",
                                                },
                                                {
                                                    label: "Confirmação de senha",
                                                    type: "text",
                                                    bsClass: "form-control",
                                                    placeholder: "Confirmação de senha",
                                                }
                                            ]}
                                        />
                                        <FormInputs
                                            ncols={["col-md-6"]}
                                            proprieties={[
                                                {
                                                    label: "Data de Nascimento",
                                                    type: "date",
                                                    bsClass: "form-control",
                                                    placeholder: "Data de nascimento",
                                                }
                                            ]}
                                        />
                                        {/*TODO exibir os campos data de nascimento e vínculo na mesma linha*/}
                                        <Row>
                                            <FormGroup controlId="formControlsSelect" className="col-md-6">
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
                                                    <option value="">Superior de Tecnologia em Análise e Desenvolvimento
                                                        de
                                                        Sistemas
                                                    </option>
                                                    <option value="">Licenciatura em Letras Português e Espanhol
                                                    </option>
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
                                                    <option value="">Técnico em Recursos Humanos Integrado ao Ensino
                                                        Médio
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
                                                                 placeholder="Fale um pouco sobre você..."/>
                                                </FormGroup>
                                            </Col>
                                        </Row>
                                        <Button
                                            bsStyle="danger"
                                            className="btSaveif"
                                            pullRight
                                            fill
                                            type="submit"
                                        >
                                            Cadastrar
                                        </Button>
                                        <div className="clearfix"></div>
                                    </form>
                                }
                            />
                        </Col>
                    </Row>
                </Grid>
            </div>
        );
    }
}

export default UserRegistration;


