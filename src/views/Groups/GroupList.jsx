import React from "react";
import {Row, Col } from 'react-bootstrap';
import Card from '../../components/Card/Card';
import Button from '../../elements/CustomButton/CustomButton.jsx';

export default class GroupList extends React.Component {

    render() {

        if (!this.props.pagina.content) {

            return <div>Vazio!</div>;

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
                                            
                                <Button
                                    bsStyle="danger"
                                    pullRight
                                    fill
                                    type="submit"                                           
                                    >   
                                        Ver Mais
                                </Button>                                                        
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