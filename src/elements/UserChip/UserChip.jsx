import React, {Component} from 'react';


export class UserChip extends Component {
    render() {
        return (
            <div className="chip"
                // chip={this.state.chip}
                // docked={false}
                // onRequestChange={(chip) => this.setState({chip})}
            >
                {(this.props.avatar)?<img src={this.props.avatar} alt={this.props.alt} width="96" height="96"/>:

                    <i className={this.props.icone}
                       style={{fontSize:20,width:25,fontWeight:"bold"}}/>
                }

                {this.props.nome}

                {(this.props.avatar)?
                    <span
                        className={this.props.nomeBtn}
                        // onClick={this.fechaChip}
                    ><i className={this.props.icone}/></span> : ""}
            </div>

        );
    }
}

export default UserChip;