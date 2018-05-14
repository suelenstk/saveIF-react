import React, { Component } from 'react';
import avatar from "../../assets/img/faces/face-3.jpg";
import UserChip from "../../elements/UserChip/UserChip"

class ListParticipants extends Component {

    constructor(props) {
        super(props);
        this.state = {chip: true,flagParticipante:false};

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
                largura="30%"
            >{this.state.flagParticipante = true})}</UserChip>
            
                })}
            {(!this.state.flagParticipante)?"Este grupo não possui integrantes!":""}
            </div>

        }else{
            return <div></div>
        }
    }
    

}

export default ListParticipants;