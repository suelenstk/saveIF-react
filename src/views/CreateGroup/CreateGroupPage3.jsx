import React, { Component } from 'react';
import {
    Grid, Row, Col,
    FormGroup, ControlLabel, FormControl
} from 'react-bootstrap';

import { Card } from '../../components/Card/Card.jsx';
import { FormInputs } from '../../components/FormInputs/FormInputs.jsx';
import { UserCard } from '../../components/UserCard/UserCard.jsx';
import Button from '../../elements/CustomButton/CustomButton.jsx';

import cancelar from "../../assets/img/ic_highlight_off_black_48px.svg";
import avatar from "../../assets/img/faces/face-3.jpg";


class CreateGroupPage3 extends Component {
    render() {
        return (
            <div className="content">
                <Grid fluid>
                    <Row>
                        <Col md={12}>
                            <Card
                                title="Adicione participantes ao grupo"
                                content={
                                    <form>
                                        <FormInputs
                                            ncols={["col-md-12"]}
                                            proprieties={[
                                                {
                                                    label: "Nome do Grupo",
                                                    type: "text",
                                                    bsClass: "form-control",
                                                    value: "DEV II",
                                                    disabled: true
                                                }
                                            ]}
                                        />

                                        <Row>
                                            <Col md={12}>
                                                <FormGroup controlId="formControlsTextarea">
                                                    <ControlLabel>Descrição</ControlLabel>
                                                    <FormControl rows="3" componentClass="textarea" bsClass="form-control" value="Grupo para desenvolvimento de sistemas II" disabled="true" />
                                                </FormGroup>
                                            </Col>
                                        </Row>

                                        <FormGroup controlId="formControlsSelect" className="col-md-12">
                                            <ControlLabel>Categorias</ControlLabel>
                                            <FormControl componentClass="select" value="Desenvolvimento de Sistemas Web" disabled="true">
                                                <option value="">Desenvolvimento de Sistemas Web</option>
                                                <option value="">Aplicações Android</option>
                                                <option value="">Java</option>
                                            </FormControl>
                                        </FormGroup>

                                        <FormGroup controlId="formControlsConvidados" className="col-md-12">
                                            <ControlLabel>Convites enviados para:</ControlLabel><br />

                                            <div className="participante">
                                                <img id="avatar" src={avatar} />
                                                <p id="name">Mike Andrew<a href=""><img src={cancelar} width="30px" height="30px" /></a></p>
                                            </div>

                                        </FormGroup>
                                        <div className="clearfix"></div>
                                    </form>
                                }
                            />
                        </Col>
                    </Row>

                    <Row>
                        <Col md={12}>
                            <Card
                                title=""
                                content={

                                    <div class="form-group">
                                        <label for="exampleInputFile">Selecione um arquivo:</label>
                                        <input type="file" class="form-control-file" id="exampleInputFile" aria-describedby="fileHelp" />


                                        <a href="" style={{ float: 'right', color: 'red' }}> Ir para o grupo</a>

                                        <div className="clearfix"></div>
                                    </div>
                                }
                            />
                        </Col>
                    </Row>

                    <div style={{ display: 'table' }}>
                        <div style={{ display: 'table', float: 'left' }}>
                            <div className="circle" style={{ marginRight: '300px', marginLeft: '50px' }}>1</div>
                            <h4 style={{ padding: '0px 10px 0px 0px' }}>Crie o Grupo</h4>
                        </div>

                        <div style={{ display: 'table', float: 'left' }}>
                            <div className="circle" style={{ marginRight: '300px', marginLeft: '80px' }}>2</div>
                            <h4 style={{ padding: '0px 10px 0px 10px' }}>Convide Participantes</h4>
                        </div>

                        <div style={{ display: 'table', float: 'left' }}>
                            <div className="circle" style={{ backgroundColor: 'red', color: 'white', marginRight: '300px', marginLeft: '40px' }}>3</div>
                            <h4 style={{ padding: '0px 10px 0px 10px' }}>Pronto</h4>
                        </div>
                    </div>
                </Grid>
            </div>
        );
    }
}

export default CreateGroupPage3;
