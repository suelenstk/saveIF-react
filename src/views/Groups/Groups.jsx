import React, { Component } from 'react';
import {Grid} from 'react-bootstrap';
import GroupRoute from './GroupRoute';
import GroupService from './GroupService';


class Groups extends Component {

   constructor(props){

       super(props);
       //console.log(this.props.user);
       this.groupService = new GroupService();

   }
   

   render() {

       //console.log(this.state.pagina.content);
       //console.log(this.state.grupo);

       return (            
           <div className="content">    
      
               <Grid fluid > 

                   <GroupRoute solicitar = {(id, idUsuario)=>{ 
                               this.groupService.solicitar(id, idUsuario, 
                                       (item)=>{
                                           alert("Solicitação efetuada com sucesso!");
                                       },
                                       (erro)=>{
                                           console.log("Erro!");
                                           console.log(erro);
                                           }
                                       );
                               }}
                               user={this.props.user}
                               rota="groups" />
                                                             

               </Grid>
               
                
           </div>
       );
   }
}

export default Groups;