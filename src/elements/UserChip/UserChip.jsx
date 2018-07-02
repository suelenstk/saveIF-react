import React, {Component} from 'react';
import ProfileView from './ProfileView';
import { Dropdown} from 'react-bootstrap';
import { UserOptions } from '../UserOptions/UserOptions';

export class UserChip extends Component {

    constructor(props) {

        super(props);
        this.state = {
            show: false
        };

        //console.log(posts);
    }

    abrirPerfil() {
        this.setState({
            show: true
        });
    }


    render() {
        return (
            <div className="chip" id={this.props.resolvido ? "resolvido" : ""} onClick={(e) => {
                if (this.props.perfil) this.abrirPerfil();
            }}>
                {(this.props.avatar) ?
                    <img
                        src={this.props.avatar}
                        alt={this.props.alt}
                        width="96"
                        height="96"
                    /> :
                    <i className={this.props.topico} id="topicIcon"/>
                }
                {this.props.nome}

                {(this.props.icone) ?
                    <span
                        className={this.props.class}
                        onClick={() => {
                            if (this.props.evento) {
                                this.props.evento(this.props.usuario);
                            }
                        }}
                    >
                    <i className={this.props.icone}/>  
                    </span>
                :
                    (this.props.icone1) ? 
                        <span className={this.props.class} > 

                            <Dropdown pullRight style={{padding:"0", marginTop:"35%"}}>
                                <Dropdown.Toggle noCaret style={{border:"none", padding: "0", margin:"0"}}>
                                    <i className="pe-7s-more"/>                            
                                </Dropdown.Toggle>

                                <Dropdown.Menu style={{border:"none"}} >
                                    <UserOptions
                                        usuario={this.props.usuario}
                                        evento={this.props.evento1}
                                        icone={this.props.icone1}
                                        nomeEvento={this.props.nomeEvento1}
                                    />
                                    {(this.props.eventoDisplay2) ?
                                        <UserOptions
                                            usuario={this.props.usuario}
                                            evento={this.props.evento2}
                                            icone={this.props.icone2}
                                            nomeEvento={this.props.nomeEvento2}                                            
                                        />
                                    :
                                        ""
                                    }

                                </Dropdown.Menu>
                            </Dropdown>

                        </span>
                        
                    :
                        ""
                }

                {(this.props.usuario) ?
                    <ProfileView
                        voltar={() => {
                            this.setState({show: false});
                        }}
                        show={this.state.show}
                        usuario={this.props.usuario}
                    />

                    : ""}
            </div>

        );
    }
}

export default UserChip;