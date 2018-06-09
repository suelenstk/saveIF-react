import React, {Component} from 'react';
import servicoLogin from "../../login/ServicoLogin";
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

    loading() {
        servicoLogin.validarLogin(() => {
            this.setState({
                concluded: <Route path="/" name="Home" component={App}/>
            });
        });
    }

    render() {
        if (this.state.concluded) {
            return this.state.concluded;
        } else return (
            <div/>
        );
    }
}

export default LoadingPage;
