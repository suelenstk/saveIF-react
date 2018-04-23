import React, {Component} from 'react';
import {Redirect, Route, Switch} from 'react-router-dom';


import Header from '../../components/Header/Header';
import Sidebar from '../../components/Sidebar/Sidebar';


import appRoutes from '../../routes/app.jsx';
import Navbar from "react-bootstrap/es/Navbar";
import UserRegistration from "../../views/UserRegistration/UserRegistration";
import logo from '../../assets/img/reactlogo.png';
import Login from "../../views/Login/Login";
import ServicoLogin from "../../login/ServicoLogin";
import servicoLogin from "../../login/ServicoLogin";


class App extends Component {

    constructor(props){
        super(props);
        this.state={
            logado: ServicoLogin.logado()
        };
    } 


    render() {
        // variavel para simular se o usuario esta ou nao logado para alterar a construcao da tela
        let logado = this.state.logado;

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
                        <Login onLogin={()=>this.setState({logado:true})} />
                    </div>
                );
            }
        } else {
            console.log(servicoLogin.getUsuario());
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
                                        //passar id do usuário
                                        if (prop.name === "Grupos")
                                        return (
                                            <Route
                                                path={prop.path}
                                                key={key}
                                                render = {(props) => <prop.component  {...props} user={servicoLogin.getUsuario()}/>}
                                                user={servicoLogin.getUsuario()}
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
                        {/*<Footer/>*/}
                    </div>
                </div>
            );
        }
    }
}

export default App;