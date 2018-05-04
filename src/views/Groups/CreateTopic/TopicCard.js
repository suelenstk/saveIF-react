import React, { Component } from 'react';
import { Grid, Col, Row } from 'react-bootstrap';
import {Card} from '../../../components/Card/Card.jsx';

import TopicService from './TopicService';

import NewTopic from './NewTopic';
import Button from '../../../elements/CustomButton/CustomButton.jsx';

export default class TopicCard extends Component {

    constructor(props){

        super(props);

        this.state = {           
            topic:{},
            lista: {}
        }

        this.topicService = new TopicService();
    }
    
    render() {

        return (

                    <NewTopic 
                        inserir ={(topic)=>{ 
                                    this.topicService.inserir(topic, 
                                    (topico)=>{
                                        alert("Topico criado com sucesso!");                         
                                },
                                (erro)=>{
                                console.log("Erro!");
                                console.log(erro);
                            }
                        );
                }}
                topic={this.state.topic} 
                    />
        );
    }
    
}
