import React, { Component } from 'react';
import {
    Grid, Row, Col,
    FormGroup, ControlLabel, FormControl
} from 'react-bootstrap';

import { Card } from '../../components/Card/Card.jsx';
import { FormInputs } from '../../components/FormInputs/FormInputs.jsx';
import { UserCard } from '../../components/UserCard/UserCard.jsx';
import Button from '../../elements/CustomButton/CustomButton.jsx';


class CreateGroupPage1 extends Component {
    render() {
        return (
            <div className="content">
                <Grid fluid>
                    <Row>
                        <Col md={8}>
                            <Card
                                title="Criar Grupo"
                                content={
                                    <form>
                                        <FormInputs
                                            ncols={["col-md-12"]}
                                            proprieties={[
                                                {
                                                    label: "Nome do Grupo",
                                                    type: "text",
                                                    bsClass: "form-control",
                                                    placeholder: "Nome",
                                                }
                                            ]}
                                        />

                                        <Row>
                                            <Col md={12}>
                                                <FormGroup controlId="formControlsTextarea">
                                                    <ControlLabel>Descrição</ControlLabel>
                                                    <FormControl rows="3" componentClass="textarea" bsClass="form-control" placeholder="Descreva seu grupo" />
                                                </FormGroup>
                                            </Col>
                                        </Row>

                                        <FormGroup controlId="formControlsSelect" className="col-md-12">
                                            <ControlLabel>Categorias</ControlLabel>
                                            <FormControl componentClass="select" placeholder="categoria">
                                                <option value="">Desenvolvimento de Sistemas Web</option>
                                                <option value="">Aplicações Android</option>
                                                <option value="">Java</option>
                                            </FormControl>
                                        </FormGroup>

                                        <div class="checkbox" type="radio">
                                            <ControlLabel>Privacidade</ControlLabel><br />

                                            <label class="radio-inline" style={{ width: '100px' }}><input type="radio" name="aberto" style={{ marginRight: '10px' }} />Aberto</label>
                                            <label class="radio-inline" style={{ width: '100px' }}><input type="radio" name="publico" style={{ marginRight: '10px' }} />Público </label>
                                            <label class="radio-inline" style={{ width: '100px' }}><input type="radio" name="privado" style={{ marginRight: '10px' }} />Privado</label>
                                        </div>

                                        <Button
                                            bsStyle="danger"
                                            pullRight
                                            fill
                                            type="submit"
                                            href="/CreateGroupPage2"
                                        >
                                            Criar Grupo
                                        </Button>
                                        <div className="clearfix"></div>
                                    </form>
                                }
                            />

                        </Col>
                        <Col md={3}>
                            <Card
                                content={
                                    <div>
                                        <h3>Grupo Aberto</h3>
                                        <p>É um grupo onde todos podem participar sem a necessidade de convite ou solicitação.</p>
                                        <h3>Grupo Público</h3>
                                        <p>É um grupo onde todos podem solicitar a participação e ingressar mediante a aprovação do administrador.</p>
                                        <h3>Grupo Privado</h3>
                                        <p>É um grupo onde todos podem participar mediante o convite do administrador.</p>
                                    </div>
                                }
                            />
                        </Col>
                    </Row>
                    <div style={{ display: 'table' }}>
                        <div style={{ display: 'table', float: 'left' }}>
                            <div className="circle" style={{ backgroundColor: 'red', color: 'white', marginRight: '300px', marginLeft: '50px' }}>1</div>
                            <h4 style={{ padding: '0px 10px 0px 10px' }}>Crie o Grupo</h4>
                        </div>

                        <div style={{ display: 'table', float: 'left' }}>
                            <div className="circle" style={{ marginRight: '300px', marginLeft: '80px' }}>2</div>
                            <h4 style={{ padding: '0px 10px 0px 10px' }}>Convide Participantes</h4>
                        </div>

                        <div style={{ display: 'table', float: 'left' }}>
                            <div className="circle" style={{ marginRight: '300px', marginLeft: '30px' }}>3</div>
                            <h4 style={{ padding: '0px 10px 0px 10px' }}>Pronto</h4>
                        </div>
                    </div>
                </Grid>
            </div>
        );
    }
}

export default CreateGroupPage1;
