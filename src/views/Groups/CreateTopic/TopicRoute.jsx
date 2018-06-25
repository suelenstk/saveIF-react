import React, {Component} from 'react';
import GroupView from '../Posts/GroupView';
import NewTopic from './NewTopic';

import {Route, Switch} from 'react-router-dom';

class RotaPostEspecifico extends Component {

    render() {
        console.log(this.props.match.params.idt);
        console.log(this.props.match.params.idt);
        return <GroupView
            id={this.props.match.params.id}
            idt={this.props.match.params.idt}
        />;
    }

}

class RotaTopicos extends Component {

    render() {
        return <NewTopic
            grupo={this.props.grupo}
            erroTopico={this.props.erroTopico}
            inserir={this.props.inserir}
            topic={this.props.topic}
        />;
    }
}

export default class TopicRoute extends Component {

    render() {

        return <div>
            <Switch>
                <Route
                    exactpath="/MyGroups/:id/topicos"
                    render={(props) =>
                        <RotaTopicos
                            {...props}
                            inserir={this.props.inserir}
                            grupo={this.props.grupo}
                            erroTopico={this.props.erroTopico}
                            topic={this.props.topic}
                        />
                    }
                    inserir={this.props.inserir}
                    grupo={this.props.grupo}
                    erroTopico={this.props.erroTopico}
                    topic={this.props.topic}
                />

                <Route path="/Groups/:id/posts/:idt" component={RotaPostEspecifico}/>
            </Switch>
        </div>
    }
}