import React from 'react';
import {Col, Grid, Row} from 'react-bootstrap';

import {Card} from '../../../components/Card/Card.jsx';
import UserSearch from "../../../components/UserSearch/UserSearch";


class RightCard extends React.Component {

    constructor(props) {
        super(props);
        this.state = {chip: true};
    }

    render() {
        return (
            <Col md={4}>
                <Grid fluid>

                    <Row style={{display: this.props.information}}>
                        <Card
                            content={
                                <div>
                                    <h3>Grupo Aberto <i className="pe-7s-unlock"
                                                        style={{fontWeight: "bold", color: "green", marginLeft: 5}}/>
                                    </h3>
                                    <p style={{textAlign: "justify"}}>É um grupo onde todos podem participar sem a necessidade de convite ou
                                        solicitação.</p>
                                    <h3>Grupo Público <i className="fa fa-globe" style={{
                                        fontWeight: "bold",
                                        color: "#2E64FE",
                                        marginLeft: 5
                                    }}/></h3>
                                    <p style={{textAlign: "justify"}}>É um grupo onde todos podem solicitar a participação e ingressar mediante a
                                        aprovação do administrador.</p>
                                    <h3>Grupo Privado <i className="pe-7s-lock"
                                                         style={{fontWeight: "bold", color: "red", marginLeft: 5}}/>
                                    </h3>
                                    <p style={{textAlign: "justify"}}>É um grupo onde todos podem participar mediante o convite do administrador.</p>
                                </div>
                            }
                        />
                    </Row>
                    <Row style={{display: this.props.search}}>

                        <div>
                            <UserSearch
                                adicionaListaConvite={(usuario) => {
                                    this.props.adicionaConvidado(usuario);
                                }}
                                convidados={this.props.convidados}
                                grupoId={this.props.grupo}
                            />
                        </div>
                        <button onClick={(e) => {
                            this.props.confirmar();
                        }} style={{border: "0", backgroundColor: "transparent", color: "red", float: "right"}}>Pular
                            esta etapa &gt;&gt;</button>

                    </Row>

                </Grid>
            </Col>
        );
    }
}

export default RightCard;
