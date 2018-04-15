import React, {Component} from 'react';
import {
    Route,
    Switch,
    Redirect
} from 'react-router-dom';


import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import Sidebar from '../../components/Sidebar/Sidebar';


import appRoutes from '../../routes/app.jsx';
import Navbar from "react-bootstrap/es/Navbar";
import UserRegistration from "../../views/UserRegistration/UserRegistration";
import logo from '../../assets/img/reactlogo.png';
import Login from "../../views/Login/Login";

class App extends Component {

    render() {
        // variavel para simular se o usuario esta ou nao logado para alterar a construcao da tela
        let logado = true;

        if (!logado) {
            // variavel para simular se a tela eh de login ou cadastro
            let cadastro = false;
            if (cadastro) {
                // tela de cadastro de usuario
                return (
                    <div className="wrapper">
                        {/* TODO fixar navbar no topo*/}
                        <Navbar className="navbarLogin">
                            <Navbar.Brand className="logoInicial">
                                <img src={logo} className="imgNavbar" alt="logo_image"/>
                            </Navbar.Brand>
                        </Navbar>
                        <UserRegistration/>
                    </div>
                );
            } else {
                // tela de login
                return (
                    <div className="wrapper">
                        <Navbar className="navbarLogin">
                        </Navbar>
                        <Login/>
                    </div>
                );
            }
        } else {
            return (
                <div className="wrapper">
                    <Sidebar {...this.props} />
                    <div id="main-panel" className="main-panel">
                        <Header {...this.props}/>
                        <Switch>
                            {
                                appRoutes.map((prop, key) => {
                                    if (prop.name === "Notifications")
                                        return (
                                            <Route
                                                path={prop.path}
                                                key={key}
                                                render={routeProps =>
                                                    <prop.component
                                                        {...routeProps}
                                                        handleClick={this.handleNotificationClick}
                                                    />}
                                            />
                                        );
                                    if (prop.redirect)
                                        return (
                                            <Redirect from={prop.path} to={prop.to} key={key}/>
                                        );
                                    return (
                                        <Route path={prop.path} component={prop.component} key={key}/>
                                    );
                                })
                            }
                        </Switch>
                        <Footer/>
                    </div>
                </div>
            );
        }
    }
}

export default App;
