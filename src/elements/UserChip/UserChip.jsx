import React, { Component } from 'react';


export class UserChip extends Component{
    render(){
        return (
            <div className="chip"
            // chip={this.state.chip}
            // docked={false}
            // onRequestChange={(chip) => this.setState({chip})}
            >
                <img src={this.props.avatar} alt={this.props.alt} width="96" height="96"/>

                {this.props.nome}

                <span className="closebtn" style={{float: 'right'}}
                    onClick={this.fechaChip}>&times;</span>
            </div>
            
        );
    }
}

export default UserChip;
