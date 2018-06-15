import React, { Component } from 'react';
import { Grid, Col, Row } from 'react-bootstrap';
import Alert from "react-bootstrap/es/Alert";
import { Card } from '../../../../components/Card/Card.jsx';
import ListParticipants from './ListParticipants'

export default class Participants extends Component {

    render () {


        return {

            <Card
                title="Participantes"
                content={
                    <ListParticipants/>;
                }

                />
        }
    }

}