import React, {Component} from 'react';


export class UserChip extends Component {
    render() {
        return (
            <div className="chip">
                {(this.props.avatar) ?
                    <img
                        src={this.props.avatar}
                        alt={this.props.alt}
                        width="96"
                        height="96"
                    /> :
                    <i className={this.props.icone} style={{fontSize: 20, width: 25, fontWeight: "bold"}}/>
                }
                {this.props.nome}
                {(this.props.icone) ?
                    <span
                        className={this.props.class}
                        onClick={(e) => {
                            if (this.props.evento) {
                                this.props.evento(this.props.usuario);
                            }
                        }}
                    >
                        <i className={this.props.icone}/>
                    </span> : ""}
            </div>

        );
    }
}

export default UserChip;