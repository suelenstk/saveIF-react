import React, {Component} from 'react';
import ProfileView from './ProfileView';

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
                    </span> : ""}

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