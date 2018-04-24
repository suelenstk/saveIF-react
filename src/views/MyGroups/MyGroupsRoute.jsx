import React, { Component } from 'react';
import GroupEnter from '../Groups/GroupEnter';
import GroupList from '../Groups/GroupList';

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
                      grupo={(this.props.location.query)?this.props.location.query.grupo:""}/>;
  }
 }
 
 
export default class MyGroupsRoute extends Component {
 
  render() {

   console.log(this.props.pagina);

   return <div>
    <Switch>
     <Route exact path="/MyGroups" render = {(props) => <RotaLista  {...props} pagina={this.props.pagina} rota={this.props.rota} />}
                                                 pagina={this.props.pagina} rota={this.props.rota}/>
     <Route path="/MyGroups/:id/view" render = {(props) => <RotaVisualizacao  {...props} 
                  user={this.props.user}/>}
                  user={this.props.user}/>/>
    </Switch>
   </div>
 
  }
 }