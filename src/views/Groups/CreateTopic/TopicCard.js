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
            lista: {},
            idGrupoAtual: this.props.idGrupo,
        }
        
        this.topicService = new TopicService();
        
    }
    
    propsErro (msg, tipo) {
        this.props.mostraErro(msg, tipo);
    }
    
    render() {
        //console.log(this.state.topico);
        return (

                    <NewTopic
                        idGrupo = {this.state.idGrupoAtual}
                        erroTopico={this.state.erro}
                        inserir ={(topic)=>{ 
                                    this.topicService.inserirEmGrupo(topic,this.state.idGrupoAtual, 
                                    (topico)=>{
                                        this.propsErro("Tópico criado com sucesso.", "success");                         
                                },
                                (erro)=>{
                                console.log("Erro!");
                                console.log(erro);
                                this.propsErro(erro.message, "danger");
                            }
                        );
                        
                }}
                topic={this.state.topic} 
                    />
        );
    }
    
}
