import React, { Component } from 'react';
import { Grid, Row, Col } from 'react-bootstrap';

import Card from '../../components/Card/Card';
import Button from '../../elements/CustomButton/CustomButton.jsx';

class GroupEnter extends Component {

    constructor(props) {
        super(props);
        this.state = {
            grupo: (this.props.location.query)? this.props.location.query.grupo:"Não foi selecionado nenhum grupo"
        }       
        //console.log(this.state.grupo);
    }

    botaoSolicitar(){

        let botoes = [];

        let botao =     
             <Button
                bsStyle="danger"
                pullRight
                fill
                type="submit">   
                     Solicitar Inscrição
            </Button>      

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