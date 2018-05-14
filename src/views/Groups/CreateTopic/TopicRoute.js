import React, { Component } from 'react';
import GroupView from '../Posts/GroupView';

import {
    Route,
    Switch
    } from 'react-router-dom';

class RotaPostEspecifico extends Component {

    render() {
       console.log(this.props.match.params.idt);
       return <GroupView id={this.props.match.params.id}
                          idt={this.props.match.params.idt}/>;
    }
   
}

export default class TopicRoute extends Component {

    render() {

        return <div>
   <Switch>
    
        <Route exactpath="/MyGroups/:id/posts/:idt" component={RotaPostEspecifico} />

   </Switch>
  </div>


    }

}