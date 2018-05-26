import React, { Component } from 'react';


export class UserCard extends Component{
    render(){
        return (
            <div className="card card-user">
                <div className="image">
                   
                </div>
                <div className="content">
                    <div className="author">
                        <img className="avatar border-gray" src={this.props.avatar} alt="..."/>
                        <h4 className="title">
                                {this.props.name}
                            <br />
                            <small>{this.props.curso}</small>
                        </h4>
                    </div>
                    <p className="description text-center">
                        <br />
                        {this.props.description}
                        <br />
                    </p>
                </div>
                <hr />
                <div className="text-center">
                    {this.props.socials}
                </div>
            </div>
        );
    }
}

export default UserCard;
