import React, { Component } from 'react';
import PostDetail from './PostDetail';
import PostsList from './PostList';

import {
 Route,
 Switch
} from 'react-router-dom';


class RotaVerPost extends Component {

    render() {
      return <PostDetail post={(this.props.location.query)?this.props.location.query.post:""}/>;
    }
  
}

class RotaLista extends Component {

    render() {
      return <PostsList posts={this.props.pagina}/>;
    }
  
}


export default class PostRoute extends Component {
 
    render() {
    
     return <div>
  
      <Switch>

        <Route exact path="/groups/posts" render = {(props) => <RotaLista  {...props} pagina={this.props.pagina} />}         
            pagina={this.props.pagina}/> />  
  
        <Route path="/groups/posts/:id" component={RotaVerPost} />  
         
  
      </Switch>
  
     </div>
   
   
    }
   }