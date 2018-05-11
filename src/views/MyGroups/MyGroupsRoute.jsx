import React, { Component } from 'react';
import GroupEnter from '../Groups/GroupEnter';
import GroupList from '../Groups/GroupList';
import GroupView from '../Groups/Posts/GroupView';

import {
Route,
Switch
} from 'react-router-dom';

class RotaLista extends Component {
 render() {
   //console.log(this.props.pagina);
    return <GroupList pagina={this.props.pagina}
                    rota={this.props.rota}/>;
 }
}

class RotaVisualizacao extends Component {
 render() {
    return <GroupEnter user={this.props.user}
                       id={this.props.match.params.id}/>;
 }
}

class RotaPosts extends Component {

 render() {
    //console.log(this.props.match.params.id);
    return <GroupView id={this.props.match.params.id}/>;
 }

}

class RotaPostEspecifico extends Component {

 render() {
    console.log(this.props.match.params.idt);
    return <GroupView id={this.props.match.params.id}
                       idt={this.props.match.params.idt}/>;
 }

}


export default class MyGroupsRoute extends Component {

 render() {

  //console.log(this.props.pagina);

  return <div>
   <Switch>

    <Route exact path="/MyGroups" render = {(props) => <RotaLista  {...props} pagina={this.props.pagina} rota={this.props.rota} user={this.props.user}/>}
                                                pagina={this.props.pagina} rota={this.props.rota} user={this.props.user}/>
    
    <Route path="/MyGroups/:id/geral" component={RotaPosts} />
    
    <Route path="/MyGroups/:id/posts/:idt" component={RotaPostEspecifico} />
    
    <Route path="/MyGroups/:id/View" render = {(props) => <RotaVisualizacao  {...props} 
                 user={this.props.user}/>}
                 user={this.props.user}/>/>

   </Switch>
  </div>

 }
}