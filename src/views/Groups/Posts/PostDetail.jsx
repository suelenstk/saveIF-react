import React, { Component } from 'react';
import { Row, Col } from 'react-bootstrap';
import Card from '../../../components/Card/Card';


export default class PostList extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            post: this.props.post
        }       
    }

    render(){

        return(

            <div className="content">
            
                <Card
                    title={this.state.post.titulo}
                    ctAllGroups
                    content={
                        <Row>
                        
                            <Col lg={12} md={12} sm={12} xs={12}>

                                <h5><span className="glyphicon glyphicon-time"></span> Post by {this.state.post.autorPost.nome}, {this.state.post.dataPostagem}.</h5>
                                <p>{this.state.post.texto}</p>


                            </Col>
                        
                        </Row>

                    }
                />
            
            
            
            </div>

        );




    }



}