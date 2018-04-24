import React, { Component } from 'react';
import {Row, Col } from 'react-bootstrap';
import Card from '../../components/Card/Card';
import Button from '../../elements/CustomButton/CustomButton.jsx';
import {Link} from 'react-router-dom';

export default class GroupList extends Component {
    
    botaoVerMais(grupo){

        let botoes = [];
        //let botao = <Link to={`/GroupEnter`}>
        //Verificar rota certa
        let rota = (this.props.rota === "MyGroups")? "MyGroups":"groups";

        let botao = 
        <Link to={{ pathname: `/${rota}/${grupo.id}/view`, query: { grupo: grupo } }}>      
                <Button
                        bsStyle="danger"
                        pullRight
                        fill
                        type="submit"                                          
                    >   
                            Ver Mais
                </Button></Link>

        botoes.push(botao);

        return botoes;

    }
    
    
    render() {
        //alert(this.props.pagina);
        if (!this.props.pagina.content) {

            return <div>Não há grupos cadastrados!</div>;

        } else {
            return  <Row>
            <Col md={12}>
            {this.props.pagina.content.map((grupo) => {             
               return <Card                                
                    ctAllGroups
                
                    content={
                        <Row>
                                                                       
                                
                            <Col lg={12} md={12} sm={12} xs={12}>
                                        
                                <h2>{grupo.nome}</h2>

                                <p>{grupo.descricao}</p>
                                            
                                {this.botaoVerMais(grupo)}

                                <br/><br/>
                                <hr/>
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