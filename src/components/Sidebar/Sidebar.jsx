import React, {Component} from 'react';
import {NavLink} from 'react-router-dom';

import HeaderLinks from '../Header/HeaderLinks.jsx';

import imagine from '../../assets/img/sidebar-3.jpg';
import logo from '../../assets/img/reactlogo.png';

import sideBarRoutes from '../../routes/sideBar';
import BadgeNotification from "../../elements/BadgeNotification/BadgeNotification";

class Sidebar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            width: window.innerWidth
        }
    }

    activeRoute(routeName) {
        return this.props.location.pathname.indexOf(routeName) > -1 ? 'active' : '';
    }

    updateDimensions() {
        this.setState({width: window.innerWidth});
    }

    componentDidMount() {
        this.updateDimensions();
        window.addEventListener("resize", this.updateDimensions.bind(this));
    }

    render() {
        const sidebarBackground = {
            backgroundImage: 'url(' + imagine + ')'
        };
        return (
            <div id="sidebar" className="sidebar" data-color="black" data-image={imagine}>
                <div className="sidebar-background" style={sidebarBackground}/>
                <div className="logo">
                    {/*<a class="navbar-brand" href="">    */}
                    <img src={logo} className="img-responsive" alt="logo_image"/>
                    {/*</a>*/}
                </div>
                <div className="sidebar-wrapper">
                    <ul className="nav">
                        {this.state.width <= 991 ? (<HeaderLinks/>) : null}
                        {
                            sideBarRoutes.map((prop, key) => {
                                if (!prop.redirect)
                                    return (
                                        <li className={prop.upgrade ? "active active-pro" : this.activeRoute(prop.path)}
                                            key={key}>
                                            <NavLink to={prop.path} className="nav-link" activeClassName="active">
                                                <i className={prop.icon}/>
                                                <p>
                                                    {prop.name}
                                                </p>
                                                {prop.path === "/notifications" ? <BadgeNotification/> : ""}
                                            </NavLink>
                                        </li>
                                    );
                                return null;
                            })
                        }
                    </ul>
                </div>
            </div>
        );
    }
}

export default Sidebar;
