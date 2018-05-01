import React, { Component } from 'react';
import {Grid} from 'react-bootstrap';
import GroupService from '../Groups/GroupService';
import MyGroupsRoute from './MyGroupsRoute';

class MyGroups extends Component {


   constructor(props){

       super(props);
       //console.log(this.props.user);
       this.state = {
           pagina: {},
           grupo:{nome:"teste"}
       }
       this.GroupService = new GroupService();
       this.listar();

   }

   setarItem(paginaResultado) {
       //console.log(paginaResultado);
       this.setState({
           pagina: paginaResultado
       });
   }


   listar() {
       this.paginaAtual=0;
       console.log(this.props.user);
       this.GroupService.listarGrupoIntegrantes(this.props.user,0,
               (resultado) => {
           console.log(resultado);
           this.setarItem(resultado);
       },
               (erro) => {
           console.log("Erro:");
           console.log(erro);
       }
       );
   }   

   render() {

       //console.log(this.state.pagina.content);
     //console.log(this.props.user);
      //console.log(this.state.pagina);

       return (           
           <div className="content">    
      
               <Grid fluid>
                                      
                   <MyGroupsRoute pagina={this.state.pagina} rota="MyGroups"
                    user={this.props.user}/>


               </Grid>
               
           </div>
       );
   }

}

export default MyGroups