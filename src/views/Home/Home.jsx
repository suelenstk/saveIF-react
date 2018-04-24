import React, {Component} from 'react';
import {Col, FormControl, FormGroup, Grid, Row} from 'react-bootstrap';

import {Card} from '../../components/Card/Card.jsx';
import InputGroup from "react-bootstrap/es/InputGroup";

import avatar from "../../assets/img/faces/face-3.jpg";

class LoginProfile extends Component {
    render() {
        return (
            <div className="content">
                <Grid fluid>
                    <Row>
                        <Col md={6} className="formLogin">
                            <Card
                                title="Pesquisar usuários"
                                content={
                                    <div>
                                        <form>
                                            <FormGroup>
                                                <InputGroup>
                                                    <InputGroup.Addon><i className="fa fa-search"/></InputGroup.Addon>
                                                    <FormControl
                                                        type="text"
                                                        placeholder="Pesquisar"
                                                    />
                                                </InputGroup>
                                            </FormGroup>
                                        </form>
                                        <FormGroup>
                                            <FormControl.Static>
                                                <div className="chip"
                                                    // chip={this.state.chip}
                                                    // docked={false}
                                                    // onRequestChange={(chip) => this.setState({chip})}
                                                >
                                                    <img src={avatar} alt="Person" width="96" height="96"/>

                                                    John Doe

                                                    <span className="closebtn" style={{float: 'right'}}
                                                          onClick={this.fechaChip}>&times;</span>
                                                </div>
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

export default LoginProfile;

