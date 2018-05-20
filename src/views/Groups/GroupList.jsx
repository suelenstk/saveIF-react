import React, { Component } from 'react';
import {Row, Col, Image } from 'react-bootstrap';
import Card from '../../components/Card/Card';
import Button from '../../elements/CustomButton/CustomButton.jsx';
import {Link} from 'react-router-dom';
import grupoImage from '../../img/grupo.png';
import ServicoLogin from '../../login/ServicoLogin';
import GroupService from './GroupService';
import Pager from "react-bootstrap/es/Pager";

export default class GroupList extends Component {

    constructor(props) {

        super(props);

        this.state = {
            paginaAtual:0,
            grupo:{},
            flagGrupo:false
        }

        this.groupService = new GroupService();
        //alert(this.props.user);
        (this.props.rota === "MyGroups")? 
            this.listarGrupoParticipa(0,this.props.user):this.listar(0);
    }

    setarItem(paginaResultado) {
        //console.log(paginaResultado);
        this.setState({
            grupo: paginaResultado
        });
    }
 
 
    listar(pagina) {
  
        this.groupService.listarPaginado(pagina,
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
    
    listarGrupoParticipa(pagina,id) {
  
        this.groupService.listarGrupoIntegrantes(id,pagina,
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
           return "#2E64FE";
           
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
       let statusNext = true;
       let statusPrev = true;
       //alert(this.state.pagina.totalPages);
       
       if (this.state.paginaAtual > 0) {
           statusPrev = false;
       }

       if (this.state.paginaAtual < this.state.grupo.totalPages - 1) {
           statusNext = false;
       }


       if (!this.state.grupo.content) {

           return <div>Não há grupos cadastrados!</div>;

       } else {
           return  <Row>
           <h1 style={{fontSize: '30px'}}>{(this.props.rota === "MyGroups")? "Meus Grupos":"Outros Grupos"}</h1>
           <Col md={12}>
           {this.state.grupo.content.map((grupo) => {             
              return <Card                                
                   ctAllGroups
               
                   content={                      
                    
                       <Row>
                           <Col lg={4} md={4} xs={4}>
                           
                           <Image src={"/api/grupos/" + grupo.id +"/imagem?" +
                                        ServicoLogin.getAuthorizationGet()} responsive width="350" />
                           </Col>
                           <Col lg={8} md={6} sm={6} xs={6}>
                                                                                               
                               <h2>{grupo.nome}</h2>
                               
                               <div style={{textIndent:"15"}}>        
                                   
                                <p><strong>Categoria:</strong> {grupo.categoria.nome}</p>

                                <p><strong>Descrição do Grupo:</strong> {grupo.descricao}</p>
                                </div> 
                              
                              </Col>
                                
                                <Col lg={12} xs={12} className="text-center">
                                
                                <p style={{fontWeight:"bold"}}>
                                Grupo {grupo.tipoPrivacidade}<i className={this.testarIcone(grupo.tipoPrivacidade)} 
                                title={this.descricao(grupo.tipopPrivacidade)}
                                style={{fontWeight:"bold", color:this.mudarCor(grupo.tipoPrivacidade), marginLeft:"5"}}/>
                                </p>                                                           
                               
                                <p style={{fontWeight:"bold"}}>{(this.verificarIntegrante(this.props.user,grupo.integrantesGrupo) && this.props.rota !== "MyGroups")? 
                                        "Você é integrante desse grupo":""}</p>
                                
                                
                               {this.botaoVerMais(grupo)}

                               <br/><br/>

                           </Col>
                                  
                           
                           </Row>
                  }
                   />
           })}
           {(!this.state.flagGrupo)?"Você não esta inscrito em nenhum grupo":""}
           </Col>
           
           <Pager>
                     {(!statusPrev)?   
                    <Pager.Item
                            previous
                            disabled={statusPrev}
                            onClick={(e) => {
                                this.listar(this.state.paginaAtual - 1);
                                this.state.paginaAtual--;
                            }}
                        >
                            &lt; Anterior
                        </Pager.Item>:""}
                     {(!statusNext)?     
                        <Pager.Item
                            next
                            disabled={statusNext}
                            onClick={(e) => {
                                this.listar(this.state.paginaAtual + 1);
                                this.state.paginaAtual++;
                            }}
                        >
                            Próxima &gt;
                        </Pager.Item>:""}
                        
                </Pager>


       </Row>

       }
   }
}