import React, {Component} from 'react';
import GroupEnter from './GroupEnter';
import GroupList from './GroupList';
import GroupView from './Posts/GroupView';

import {Route, Switch} from 'react-router-dom';

class RotaLista extends Component {
    render() {
        return <GroupList pagina={this.props.pagina} user={this.props.user}/>;
    }
}

class RotaSolicitacao extends Component {
    render() {
        return <GroupEnter solicitar={this.props.solicitar}
                           user={this.props.user}
                           id={this.props.match.params.id}/>;
    }
}

class RotaPosts extends Component {

    render() {
        return <GroupView/>;
    }
}

export default class GroupRoute extends Component {

    render() {
        return <div>
            <Switch>
                <Route exact path="/groups"
                       render={(props) => <RotaLista  {...props} rota={this.props.rota} user={this.props.user}/>}
                       rota={this.props.rota} user={this.props.user}/>

                <Route path="/groups/:id/geral" component={RotaPosts}/>

                <Route path="/groups/:id/view" render={(props) => <RotaSolicitacao  {...props}
                                                                                    solicitar={this.props.solicitar}
                                                                                    user={this.props.user}/>}
                                                                                    solicitar={this.props.solicitar} user={this.props.user}/>/>

            </Switch>

        </div>


    }
}