import React, {Component} from 'react';
import {Redirect, Route, Switch} from 'react-router-dom';

import Header from '../../components/Header/Header';
import Sidebar from '../../components/Sidebar/Sidebar';

import appRoutes from '../../routes/app.jsx';
import UserRegistration from "../../views/UserRegistration/UserRegistration";
import Login from "../../views/Login/Login";
import ServicoLogin from "../../login/ServicoLogin";
import servicoLogin from "../../login/ServicoLogin";


class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            logado: ServicoLogin.logado()
        };
    }

    render() {

        let logado = this.state.logado;


        if (!logado) {
            // variavel para simular se a tela eh de login ou cadastro
            let cadastro = false;
            if (cadastro) {
                // tela de cadastro de usuario
                return (
                    <UserRegistration/>
                );
            } else {
                // tela de login
                return (
                    <Login onLogin={() => this.setState({logado: true})}/>
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
                                    if (prop.name === "Grupos" || prop.name === "MyGroups")
                                        return (
                                            <Route
                                                path={prop.path}
                                                key={key}
                                                render={(props) => <prop.component  {...props}
                                                                                    user={servicoLogin.getUsuario()}/>}
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