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
                                    <h3>Grupo Aberto</h3>
                                    <p>É um grupo onde todos podem participar sem a necessidade de convite ou
                                        solicitação.</p>
                                    <h3>Grupo Público</h3>
                                    <p>É um grupo onde todos podem solicitar a participação e ingressar mediante a
                                        aprovação do administrador.</p>
                                    <h3>Grupo Privado</h3>
                                    <p>É um grupo onde todos podem participar mediante o convite do administrador.</p>
                                </div>
                            }
                        />
                    </Row>
                    <Row style={{display: this.props.search}}>

                        <div>
                            <UserSearch/>
                        </div>
                        <button onClick={this.props.confirmar} style={{color: 'red'}}> Pular esta
                            etapa &gt;&gt;</button>
                    </Row>
                </Grid>
            </Col>
        );
    }
}

export default RightCard;
