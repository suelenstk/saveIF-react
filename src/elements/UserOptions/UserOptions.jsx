import React, {Component} from 'react';
import {MenuItem } from 'react-bootstrap';


export class UserOptions extends Component {
    render() {
        return (
            <MenuItem    
                style={{ textAlign: "center"}}           
                eventKey="1"                        
                onClick={() => {
                    if (this.props.evento) {
                        this.props.evento(this.props.usuario);
                    }
                }}                
                >                
                <div  style={{display:"inline-block", marginRight:"2%", marginLeft:"-8%", marginTop:"-1%", fontSize: "25px"}}>
                
                    <i className={this.props.icone} />
                
                </div>
                <div style={{display:"inline-block", marginTop:"-16%", fontSize: "12px"}}>
                <small>
                    {this.props.nomeEvento}
                </small>
                </div>
                
            </MenuItem>

        );
    }
}

export default UserOptions;