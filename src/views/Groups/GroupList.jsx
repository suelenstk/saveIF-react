import React, { Component } from 'react';
import {Row, Col, Image } from 'react-bootstrap';
import Card from '../../components/Card/Card';
import Button from '../../elements/CustomButton/CustomButton.jsx';
import {Link} from 'react-router-dom';
import grupoImage from '../../img/grupo.png';
import ServicoLogin from '../../login/ServicoLogin';

export default class GroupList extends Component {

    constructor(props) {
        super(props);
    
        this.state = {   
          flagGrupo:false
        };
    }
   
   botaoVerMais(grupo){

       let botoes = [];
       this.state.flagGrupo = true;

       let verificar = this.verificarIntegrante(this.props.user,grupo.integrantesGrupo);
       //let botao = <Link to={`/GroupEnter`}>
       //Verificar rota certa
       let rota = (this.props.rota === "MyGroups" || verificar)? 
           `MyGroups/${grupo.id}/geral`:`groups/${grupo.id}/view`;


       let botao = 
       <Link to={{ pathname: `/${rota}`}}>      
               
               <Button
                       bsStyle="danger"
                       pullRight
                       fill
                       type="submit"                                          
                   >   
               {(this.props.rota === "MyGroups" || verificar)? "Ver postagens":"Ver mais"}
                           
                           
               </Button></Link>

       botoes.push(botao);

       return botoes;

   }

   verificarIntegrante(id,integrantesGrupo){
       
       for(let i = 0; i < integrantesGrupo.length; i++){
           //console.log(id);
           if(id === integrantesGrupo[i].id){               
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
                                                                      
                           <Image src={"/api/grupos/" + grupo.id +"/imagem?" +
                                        ServicoLogin.getAuthorizationGet()} responsive width="450" />
                           
                           <Col lg={12} md={12} sm={12} xs={12}>
                                                                                               
                               <h2>{grupo.nome}</h2>

                               <p>{grupo.descricao}</p>
                               
                               <p>Tipo de privacidade: {grupo.tipoPrivacidade}</p>

                               <p>{(this.verificarIntegrante(this.props.user,grupo.integrantesGrupo))? 
                                        "Você é integrante desse grupo":""}</p>
                                           
                               {this.botaoVerMais(grupo)}

                               <br/><br/>
                               <hr/>
                           </Col>
                                  
                           
                           </Row>
                  }
                   />
           })}
           {(!this.state.flagGrupo)?"Você não esta inscrito em nenhum grupo":""}
           </Col>

       </Row>

       }
   }
}