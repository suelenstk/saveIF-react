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
   
   testarIcone(privacidade){
       if(privacidade === "Aberto"){
           return "pe-7s-unlock";
           
       }else if(privacidade === "Público"){
           return "fa fa-globe";
           
       }else{
           return "pe-7s-lock";
       }
   }
   
   
   mudarCor(privacidade){
       if(privacidade === "Aberto"){
           return "green";
           
       }else if(privacidade === "Público"){
           return "lightBlue";
           
       }else{          
           return "red";
       }
   }
   
   descricao(privacidade){
       if(privacidade === "Aberto"){
           return "Grupo onde todos podem participar sem a necessidade de convite ou solicitação.";
       
       }else if(privacidade === "Público"){
           return "Grupo onde todos podem solicitar a participação e ingressar mediante a aprovação do administrador.";
       }else{
           return "Grupo onde todos podem participar mediante ao convite do administrador.";
       }
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
                               
                               <p>Grupo {grupo.tipoPrivacidade}<i className={this.testarIcone (grupo.tipoPrivacidade)} title={this.descricao(grupo.tipoPrivacidade)}
                                   style={{fontWeight:"bold", color:this.mudarCor(grupo.tipoPrivacidade)}}/> 
                                   </p>

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