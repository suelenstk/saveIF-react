import React from "react";
import {Row, Col } from 'react-bootstrap';
import Card from '../../components/Card/Card';
import Button from '../../elements/CustomButton/CustomButton.jsx';
import {Link} from 'react-router-dom'

export default class GroupList extends React.Component {
    
    botaoVerMais(grupo){

        let botoes = [];
        //let botao = <Link to={`/GroupEnter`}>
        //manda o objeto do grupo e o método de confirmar solicitação
        let botao = <Link to={{
            pathname: '/GroupEnter',
            query: { 
                grupo: grupo,
                solicitar:this.props.solicitar
            }
          }}>      
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