import React, {Component} from 'react';
import {Nav, NavItem} from 'react-bootstrap';


class HeaderLinks extends Component {

    render() {
        return (
            <div>
                <Nav>
                    <NavItem eventKey={3} href="#">
                        <i className="fa fa-search"/>
                        <p className="hidden-lg hidden-md">Search</p>
                    </NavItem>
                </Nav>
                <Nav pullRight className="logout">
                    <a href="/">Log out</a>
                </Nav>
            </div>
        );
    }
}

export default HeaderLinks;
