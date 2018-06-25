import React from 'react';
import {Col, ControlLabel, FormControl, FormGroup, HelpBlock, Modal, Radio, Row} from 'react-bootstrap';
import ListParticipants from './ListParticipants';
import GroupService from './GroupService';
import InviteUsers from '../../components/InviteUsers/InviteUsers';

export default class Participants extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            pagina: "",
            id: this.props.id
        };

        this.groupService = new GroupService();
        this.listarParticipantes();
    }

    componentWillReceiveProps(proximoEstado) {
        this.setState({group: proximoEstado.group});
    }

    setarItem(paginaResultado) {
        this.setState({
            pagina: paginaResultado
        });
    }

    listarParticipantes() {
        this.groupService.listarParticipantes(this.state.id, 0,
            (resultado) => {
                console.log(resultado);
                this.setarItem(resultado);
            },
            (erro) => {
                console.log("Erro:");
                console.log(erro);
            }
        );
    }

    render() {
       
            return (
                <div>
                <InviteUsers idGrupo={this.state.id}/>
                </div>
            );
    }
}
