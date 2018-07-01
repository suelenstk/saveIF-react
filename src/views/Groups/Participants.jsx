import React from 'react';
import GroupService from './GroupService';
import InviteUsers from '../../components/InviteUsers/InviteUsers';

class Participants extends React.Component {

    constructor(props) {
        super(props);

        this.groupService = new GroupService();
        this.state = {
            pagina: "",
            idGrupo: this.props.id
        };

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
        this.groupService.listarParticipantes(this.state.idGrupo, 0,
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
                <InviteUsers idGrupo={this.state.idGrupo}/>
            </div>
        );
    }
}

export default Participants;
