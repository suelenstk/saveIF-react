import React, { Component } from 'react';
import { Row, Col } from 'react-bootstrap';
import Card from '../../components/Card/Card';

export default class PostList extends React.Component{




    render() {
        
        if (!this.props.posts.content) {

            return <div>Não há posts disponíveis!</div>;

        }else{

            return <Row>
                <Col md={12}>
                {this.props.posts.content.map((post) => {

                    return <Card
                        title={post.titulo}
                        ctAllGroups
                        content={
                            <Row>
                        
                                <Col lg={12} md={12} sm={12} xs={12}>
                                    <h5><span className="glyphicon glyphicon-time"></span> Post by {post.autorPost.nome}, {post.dataPostagem}.</h5>
                                    <p>{post.texto}</p>
                                </Col>
                        
                            </Row>

                        }
                    />
                })}
                </Col>
            </Row>
        }

    }


}