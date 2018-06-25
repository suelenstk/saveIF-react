import React, {Component} from 'react';

import TopicService from './TopicService';
import TopicRoute from "./TopicRoute";

export default class TopicCard extends Component {

    constructor(props) {
        super(props);
        this.state = {
            topic: {},
            lista: {},
            grupo: this.props.grupo,
        };

        this.topicService = new TopicService();
    }

    propsErro(msg, tipo) {
        this.props.mostraErro(msg, tipo);
    }

    render() {
        return (
            <TopicRoute
                grupo={this.state.grupo}
                erroTopico={this.state.erro}
                inserir={(topic, sucesso) => {
                    this.topicService.inserirEmGrupo(topic, this.state.grupo.id,
                        () => {
                            this.propsErro("Tópico criado com sucesso.", "success");
                            sucesso();
                        },
                        (erro) => {
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
