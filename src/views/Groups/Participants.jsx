import React from 'react';
import {Col, ControlLabel, FormControl, FormGroup, HelpBlock, Modal, Radio, Row} from 'react-bootstrap';
import ListParticipants from './ListParticipants';
import GroupService from './GroupService';
import Button from '../../elements/CustomButton/CustomButton.jsx';
import UserChip from "../../elements/UserChip/UserChip"
import ServicoLogin from '../../login/ServicoLogin';


export default class Participants extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            pagina: ""
        }
        
        this.groupService = new GroupService();

        this.groupService.listarGrupoIntegrantes(this.props.idGrupo, 0,
            (resultado) => {
                this.setState({
                    pagina: resultado
                });
            },
            (erro) => {
                console.log("Erro:");
                console.log(erro);
            }
        );
    }

    componentWillReceiveProps(proximoEstado) {
        this.setState({group: proximoEstado.group});
    }

    render() {
       
            return <Modal
            show={this.props.showParticipants}
            onHide={(event) => {
                this.props.voltarParticipants();
            }}
            container={this}
            aria-labelledby="contained-modal-title"
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title">
                    Participantes
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <form>
                <ListParticipants
                pagina={this.state.pagina}
                />
                    <div className="clearfix"></div>
                </form>
            </Modal.Body>
        </Modal>
       
    }
}
