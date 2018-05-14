import React, {Component} from 'react';
import {Redirect, Route, Switch} from 'react-router-dom';

import Header from '../../components/Header/Header';
import Sidebar from '../../components/Sidebar/Sidebar';

import appRoutes from '../../routes/app.jsx';
import UserRegistration from "../../views/UserRegistration/UserRegistration";
import Login from "../../views/Login/Login";
import ServicoLogin from "../../login/ServicoLogin";
import servicoLogin from "../../login/ServicoLogin";
import noAutenticationRoutes from '../../routes/noAutentication';

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
            return (
                <div className="wrapper">
               
                <div className="content">
                    <Switch> {
                        noAutenticationRoutes.map((prop, key) => {
                    
                            if (prop.name === "Cadastro"){
                                return (
                                    <Route
                                    path="/cadastro"
                                    key={key}
                                    render={() => <UserRegistration cadastro={true} />}
                                />
                                
                                );
                            }
      
                            return (
                                <Route path={prop.path} component={prop.component} key={key}
                                render={() => <Login cadastro={false} onLogin={() => this.setState({logado: true})}/>}
                                />
                            );

                        })
                    }
                    </Switch>
                </div>
            </div>
)
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
                                    //passar id do usuário
                                    if (prop.name === "Grupos" || prop.name === "Meus grupos")
                                        
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