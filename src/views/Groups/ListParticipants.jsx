import React, {Component} from 'react';
import avatar from "../../assets/img/faces/face-3.jpg";
import UserChip from "../../elements/UserChip/UserChip"

class ListParticipants extends Component {

    constructor(props) {
        super(props);
        this.state = {chip: true, flagParticipante: false};

        //console.log(this.state.chip);
    }

    render() {
        if (this.props.pagina.content) {

            return <div className="content">
                {this.props.pagina.content.map((usuario) => {
                    return <UserChip
                        value={usuario.id}
                        key={usuario.id}
                        nome={usuario.nome}
                        avatar={avatar}
                        alt={usuario.nome}
                        //nomeBtn="addUserbtn"
                        //icone="pe-7s-add-user"
                        largura="30%"
                    ></UserChip>

                })}
                
            </div>
            

        } else {
            return <div></div>
        }
    }

}

export default ListParticipants;