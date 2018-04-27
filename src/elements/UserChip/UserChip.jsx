import React, {Component} from 'react';


export class UserChip extends Component {
    render() {
        return (
            <div className="chip"
                // chip={this.state.chip}
                // docked={false}
                // onRequestChange={(chip) => this.setState({chip})}
            >
                <img src={this.props.avatar} alt={this.props.alt} width="96" height="96"/>

                {this.props.nome}

                <span
                    className="addUserbtn"
                    // onClick={this.fechaChip}
                ><i className="pe-7s-add-user"/></span>
            </div>

        );
    }
}

export default UserChip;
