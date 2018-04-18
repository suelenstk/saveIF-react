import React, { Component } from 'react';
import { Grid, Row, Col } from 'react-bootstrap';

import Card from '../../components/Card/Card';
import Button from '../../elements/CustomButton/CustomButton.jsx';

class GroupEnter extends Component {
    /*Criar card necessário para tela de ver solicitar inscrição, o card deve ter título e conteúdo*/
    render() {
        return (
            <div className="content">
                <Grid fluid>
                    <Row>
                        <Col md={12}>
                            <Card
                                ctAllGroups
                            
                                content={
                                    <Row>

                                        <Col lg={12} md={12} sm={12} xs={12} >

                                            <h5>Nome do Grupo</h5>

                                            <h3>Algoritmos</h3>
                                            <br/>
                                            <h5>Descricao</h5>

                                            <p>Algoritmo ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                                            <br/>
                                            <h5>Categorias</h5>
                                            <p>Programação JAVA</p>
                                            <br/>
                                            <h5>Participantes</h5>
                                                       
                                        

                                             <Button
                                                bsStyle="danger"
                                                pullRight
                                                fill
                                                type="submit"                                           
                                            >   
                                                Solicitar Inscrição
                                            </Button>                                                        
                                            <br/><br/>
                                            <hr/>
                                        </Col>
                                        
                                    </Row>
                                }
                            />
                        </Col>
                    </Row>
                </Grid>
            </div>
        );
    }
}

export default GroupEnter;