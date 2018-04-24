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
                <Nav pullRight >
                    <NavItem eventKey={3} href="/" className="logout">
                        <p>Log out</p>
                    </NavItem>
                </Nav>
            </div>
        );
    }
}

export default HeaderLinks;
