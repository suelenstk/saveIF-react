import React from 'react';
import ReactDOM from 'react-dom';

import {HashRouter, Route, Switch} from 'react-router-dom';

import App from './containers/App/App.jsx';

import './assets/css/bootstrap.min.css';
import './assets/css/animate.min.css';
import './assets/sass/saveif-react.css';
import './assets/css/demo.css';
import './assets/css/pe-icon-7-stroke.css';
import './assets/css/animations.css';
import LoadingPage from "./components/LoadingPage/LoadingPage";

ReactDOM.render((
    <HashRouter>
        <Switch>
            {sessionStorage.getItem("token") ?
                <LoadingPage/> :
                <Route path="/" name="Home" component={App}/>
            }
        </Switch>
    </HashRouter>
), document.getElementById('root'));
