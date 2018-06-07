import React, {Component} from 'react';
import servicoLogin from "../../login/ServicoLogin";
import logo from '../../assets/img/logoMaior.png';
import App from "../../containers/App/App";
import Route from "react-router-dom/es/Route";


class LoadingPage extends Component {
    constructor(props) {
        super(props);
        this.loading();
        this.state = {
            concluded: ""
        };
    }

    sleep(tempo) {
        return new Promise((e) => setTimeout(e, tempo));
    }

    loading() {
        servicoLogin.validarLogin();
        this.sleep(1500).then(() => {
            this.setState({
                concluded: <Route path="/" name="Home" component={App}/>
            });
        });
    }

    render() {
        if (this.state.concluded) {
            return this.state.concluded;
        } else return (
            <div className="wrapper">
                <div className="logoRefresh">
                    <img src={logo} alt="Logo principal"/>
                </div>
            </div>
        );
    }
}

export default LoadingPage;
