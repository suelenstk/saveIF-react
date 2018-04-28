import React, { Component } from 'react';
import {Card} from '../../components/Card/Card.jsx';
import {UserCard} from '../../components/UserCard/UserCard.jsx';
import avatar from "../../assets/img/default-avatar.png";

import UserChip from "../../elements/UserChip/UserChip"

class ListParticipants extends Component {

    constructor(props) {
        super(props);
        this.state = {chip: true};
        console.log(this.state.chip);
    }

    render() {
        //alert(this.props.pagina);
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
                largura="50%"
            ></UserChip>
                })}
            </div>

        }else{
            return <div></div>
        }
    }
    

}

export default ListParticipants;