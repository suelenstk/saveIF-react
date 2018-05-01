import React, { Component } from 'react';
import {Row, Col, Image } from 'react-bootstrap';
import Card from '../../components/Card/Card';
import Button from '../../elements/CustomButton/CustomButton.jsx';
import {Link} from 'react-router-dom';
import grupoImage from '../../img/grupo.png';

export default class GroupList extends Component {
   
   botaoVerMais(grupo){

       let botoes = [];
       //let botao = <Link to={`/GroupEnter`}>
       //Verificar rota certa
       let rota = (this.props.rota === "MyGroups" || this.verificarIntegrante(this.props.user,grupo.solicitantesGrupo))? 
           `MyGroups/${grupo.id}/posts`:`groups/${grupo.id}/view`;

       let botao = 
       <Link to={{ pathname: `/${rota}`, query: { grupo: grupo } }}>      
               
               <Button
                       bsStyle="danger"
                       pullRight
                       fill
                       type="submit"                                          
                   >   
                           Ver Mais
               </Button></Link>

       botoes.push(botao);

       return botoes;

   }

   verificarIntegrante(id,solicitantesGrupo){
       
       for(let i = 0; i < solicitantesGrupo.length; i++){
           //console.log(id);
           if(id === solicitantesGrupo[i].id){               
               return true;
           }
       }

       return false;

   }
   
   
   render() {
       //alert(this.props.pagina);
       if (!this.props.pagina.content) {

           return <div>Não há grupos cadastrados!</div>;

       } else {
           return  <Row>
           <h1 style={{fontSize: '30px'}}>{(this.props.rota === "MyGroups")? "Meus Grupos":"Outros Grupos"}</h1>
           <Col md={12}>
           {this.props.pagina.content.map((grupo) => {             
              return <Card                                
                   ctAllGroups
               
                   content={
                       <Row>
                                                                      
                           <Image src={grupoImage} responsive width="1024" />
                           
                           <Col lg={12} md={12} sm={12} xs={12}>
                                                                                               
                               <h2>{grupo.nome}</h2>

                               <p>{grupo.descricao}</p>
                                           
                               {this.botaoVerMais(grupo)}

                               <br/><br/>
                               <hr/>
                           </Col>
                                  
                           
                           </Row>
                        }
                   />
           })}
           </Col>

       </Row>

       }
   }
}