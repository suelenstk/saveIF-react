import React, { Component } from 'react';
import {Grid} from 'react-bootstrap';
import GroupService from './GroupService';
import GroupRoute from './GroupRoute';
import Pager from "react-bootstrap/es/Pager";


class Groups extends Component {

   constructor(props){

       super(props);
       //console.log(this.props.user);
       this.state = {
           pagina: {},
           paginaAtual:0,
           grupo:{nome:"teste"}
       }
       this.groupService = new GroupService();
       this.listar();

   }

   setarItem(paginaResultado) {
       //console.log(paginaResultado);
       this.setState({
           pagina: paginaResultado
       });
   }


   listar() {
       let paginaAtual=0;
       this.groupService.listarPaginado(paginaAtual,
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
       //console.log(this.state.grupo);
        let statusNext = true;
        let statusPrev = true;
        //alert(this.state.pagina.totalPages);
        
        if (this.state.paginaAtual > 0) {
            statusPrev = false;
        }

        if (this.state.paginaAtual < this.state.pagina.totalPages - 1) {
            statusNext = false;
        }

       return (            
           <div className="content">    
      
               <Grid fluid legend={
                    <Pager>
                     {(!statusPrev)?   
                    <Pager.Item
                            previous
                            disabled={statusPrev}
                            onClick={(e) => {
                                this.listarTopicos(this.state.pagina - 1);
                                this.state.pagina--;
                            }}
                        >
                            &lt; Anterior
                        </Pager.Item>:""}
                     {(!statusNext)?     
                        <Pager.Item
                            next
                            disabled={statusNext}
                            onClick={(e) => {
                                this. listarTopicos(this.state.pagina + 1);
                                this.state.pagina++;
                            }}
                        >
                            Próxima &gt;
                        </Pager.Item>:""}
                        
                    </Pager>
                }> 

                   <GroupRoute pagina={this.state.pagina}
                               solicitar = {(id, idUsuario)=>{ 
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