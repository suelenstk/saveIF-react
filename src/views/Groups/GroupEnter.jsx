import React, { Component } from 'react';
import { Grid, Row, Col } from 'react-bootstrap';

import Card from '../../components/Card/Card';
import Button from '../../elements/CustomButton/CustomButton.jsx';
import {Link} from 'react-router-dom';

class GroupEnter extends Component {

    constructor(props) {
        super(props);
        this.state = {
            grupo: (this.props.location.query)? this.props.location.query.grupo:"Não foi selecionado nenhum grupo",
            solicitar:(this.props.location.query)? this.props.location.query.solicitar:"",
            idUsuario:this.props.user
        }       
        //console.log(this.props.user);
    }
    //simulação da solicitação
    confirmar() {
        //insere a id do usuário solicitante
        this.state.grupo.solicitantesGrupo[0] = {id:this.state.idUsuario}

        //alert(this.state.grupo.solicitantesGrupo[0].id);
        //alert(this.state.solicitar);
        //manda para atualzar no banco de dados
        this.state.solicitar(this.state.grupo.id, this.state.grupo);

    }

    botaoSolicitar(){

        let botoes = [];

        let botao = <Link to={{
            pathname: '/Group'}}>
             <Button
                bsStyle="danger"
                pullRight
                fill
                type="submit"
                onClick={(evento) => {
                    this.confirmar()
                        }}>   
                     Solicitar Inscrição
            </Button></Link>

        botoes.push(botao);

        return botoes;

    }

    render() {

        if(this.props.location.query)
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

                                            <h5>{}</h5>

                                            <h3>{this.state.grupo.nome}</h3>
                                            <br/>
                                            <h5>Descricao</h5>

                                            <p>{this.state.grupo.descricao}</p>
                                            <br/>
                                            <h5>Categorias</h5>
                                            <p>{this.state.grupo.categoria.nome}</p>
                                            <br/>
                                            <h5>Participantes</h5>
                                                       
                                        
                                            {this.botaoSolicitar()}
                                                                                                   
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
        else
        return <div className="content">{this.state.grupo}</div>
    }
}

export default GroupEnter;