import React, { Component } from 'react';
import GroupEnter from './GroupEnter';
import GroupList from './GroupList';
import GroupView from './Posts/GroupView';

import {
Route,
Switch
} from 'react-router-dom';

class RotaLista extends Component {
 render() {
   //console.log(this.props.pagina);
  return <GroupList pagina={this.props.pagina} user={this.props.user}/>;
 }
}

class RotaSolicitacao extends Component {
 render() {
  return <GroupEnter solicitar={this.props.solicitar}
                     user={this.props.user}
                     grupo={(this.props.location.query)?this.props.location.query.grupo:""}/>;
 }
}


class RotaPosts extends Component {

 render() {
   return <GroupView/>;
}
}


export default class GroupRoute extends Component {

 render() {

  console.log(this.props.pagina);

  return <div>

   <Switch>

    <Route exact path="/groups" render = {(props) => <RotaLista  {...props} pagina={this.props.pagina} rota={this.props.rota} user={this.props.user}/>}   
          pagina={this.props.pagina} rota={this.props.rota} user={this.props.user}/>
    
    <Route path="/groups/:id/geral" component={RotaPosts} />
    
    <Route path="/groups/:id/view" render = {(props) => <RotaSolicitacao  {...props} 
             solicitar={this.props.solicitar}  user={this.props.user}/>}
             solicitar={this.props.solicitar}  user={this.props.user}/>/>
 

   </Switch>

  </div>


 }
}