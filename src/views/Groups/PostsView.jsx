import React, { Component } from 'react';
import { Grid, Row, Col } from 'react-bootstrap';
import Card from '../../components/Card/Card';

class PostsView extends Component {
    render() {

        return (
            <div className="content">
                <Grid fluid>
                    <Row>
                        <Col md={12}>

                            <Card
                                title="React - Algorítimo finalizado"
                                ctAllGroups
                                content={
                                    <Row>
                                        
                                        <Col lg={12} md={12} sm={12} xs={12}>
                                            <h5><span className="glyphicon glyphicon-time"></span> Post by Jane Dane, Sep 27, 2015.</h5>
                                            <p>Algoritmo ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
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

export default PostsView;