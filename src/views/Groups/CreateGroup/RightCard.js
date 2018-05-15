import React, { Component } from 'react';
import {
    Grid, Row, Col,
    FormGroup, ControlLabel, FormControl
} from 'react-bootstrap';

import {Card} from '../../../components/Card/Card.jsx';
import {FormInputs} from '../../../components/FormInputs/FormInputs.jsx';
import {UserCard} from '../../../components/UserCard/UserCard.jsx';
import Button from '../../../elements/CustomButton/CustomButton.jsx';
import InputGroup from "react-bootstrap/es/InputGroup";
import UserSearch from "../../../components/UserSearch/UserSearch";

import cancelar from "../../../assets/img/ic_highlight_off_black_48px.svg";
import avatar from "../../../assets/img/faces/face-3.jpg";


class RightCard extends React.Component {

    constructor(props) {
        super(props);
        this.state = {chip: true};
        console.log(this.state.chip);
    }
    
    //fechaChip = () => this.setState({chip: false});

    render() {
        return (
        <Col md={4}>
                <Grid fluid>
                    <Row style={{display: this.props.information}}>
                    <Card
                                content={
                                <div>
                                <h3>Grupo Aberto</h3>
                                <p>É um grupo onde todos podem participar sem a necessidade de convite ou solicitação.</p>
                                <h3>Grupo Público</h3>
                                <p>É um grupo onde todos podem solicitar a participação e ingressar mediante a aprovação do administrador.</p>
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
                            <a href="" style={{color: 'red'}}> Pular esta etapa &gt;&gt;</a>
                                        
                    </Row>
                    
                    
                    
                </Grid>
       </Col>
        );
    }
}

export default RightCard;
