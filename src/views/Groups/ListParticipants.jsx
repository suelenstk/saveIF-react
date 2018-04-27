import React, { Component } from 'react';
import {Card} from '../../components/Card/Card.jsx';
import {UserCard} from '../../components/UserCard/UserCard.jsx';
import avatar from "../../assets/img/faces/face-3.jpg";

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
               return <div className="chip" style={{width: '260px'}}
               chip={this.state.chip}
               docked={false}
               onRequestChange={(chip) => this.setState({chip})}
               >
               <img src={avatar} alt="Person" width="96" height="96"/>
                   
                   {usuario.nome}

               </div>
            })}
            </div>

        }else{
            return <div></div>
        }
    }
    

}

export default ListParticipants;