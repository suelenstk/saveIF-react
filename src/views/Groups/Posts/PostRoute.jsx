import React, { Component } from 'react';
import PostsList from './PostList';

import {
Route,
Switch
} from 'react-router-dom';

class RotaLista extends Component {

   render() {
     return <PostsList posts={this.props.pagina}/>;
   }
 
}


export default class PostRoute extends Component {

   render() {
   
    return <div>
 
     <Switch>

       <Route exact path="/MyGroups/:id/posts" render = {(props) => <RotaLista  {...props} pagina={this.props.pagina} />}         
           pagina={this.props.pagina}/> />  
         
 
     </Switch>
 
    </div>
  
  
   }
  }