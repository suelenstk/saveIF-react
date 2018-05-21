import React, { Component } from 'react';
import { Grid, Col, Row } from 'react-bootstrap';
import Alert from "react-bootstrap/es/Alert";
import {Card} from '../../../components/Card/Card.jsx';
import PostService from './PostsService';
import TopicService from '../CreateTopic/TopicService';
import GroupService from '../GroupService';
import PostList from './PostList';
import NewPost from './NewPost';
import TopicCard from '../CreateTopic/TopicCard';
import Button from '../../../elements/CustomButton/CustomButton.jsx';
import Pager from "react-bootstrap/es/Pager";
import servicoLogin from "../../../login/ServicoLogin";

class GroupView extends Component {

    constructor(props){

        super(props);

        this.state = {
            show: false,
            pagina: {},
            post:{},
            loading: "none",
            grupo:{id:this.props.id},
            topico:{id:this.props.idt},
            paginaAtual:0,
            tipoAlert: "",
            msgAlert: ""
        }
        
        //alert(this.state.topico.id);
        //alert(this.state.grupo.id);
        
        this.postService = new PostService();
        this.groupService = new GroupService();
        this.topicService = new TopicService();

        (this.state.topico.id)? this.listarPostEspecifico(0):this.listar(0);
        this.listarGrupo();

    }

    setarItem(paginaResultado) {
        console.log(paginaResultado);
        this.setState({
            pagina: paginaResultado
        });
    }

    setarTopico(topico) {
        //console.log(paginaResultado);
        this.setState({
            topico: topico
        });
    }
    
    abrirNovoPost() { 
        this.setState({
            show: true
        });
    }
    
    loading(value) { 
        this.setState({
            loading: value
        });
    }

    listar(pagina) {
        
        console.log(this.state.grupo.id);
        this.postService.listarPostGeral(this.state.grupo.id,pagina,
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
    
    listarPostEspecifico(pagina) {  

        this.postService.listarPostEspecifico(this.state.grupo.id,this.state.topico.id,pagina,
                (resultado) => {
            console.log(resultado);
            this.setarItem(resultado);
        },
                (erro) => {
            console.log("Erro:");
            console.log(erro);
        }
        );

        this.listarTopicoEspecifico();

    } 

    listarTopicoEspecifico(){

        this.topicService.listarTopicosEspecifico(this.state.topico.id,
                (resultado) => {
            console.log(resultado);
            this.setarTopico(resultado);
        },
                (erro) => {
            console.log("Erro:");
            console.log(erro);
        }
        );

    }
    
    setarGrupo(resultado) {
        this.setState({
            grupo: resultado
        });
    }
    

    
    listarGrupo() {
        this.groupService.listarGrupoEspecifico(this.state.grupo.id,
                (resultado) => {
            console.log(resultado);
            this.setarGrupo(resultado);
        },
                (erro) => {
            console.log("Erro:");
            console.log(erro);
        }
        );
    }
    
    setAlert(msg, tipo){
        this.setState({
            msgAlert: msg,
            tipoAlert: tipo
        }); 
        }
    
    upload(form, idPost) {
         
        let formData = new FormData(form);
        fetch("/api/posts/"+idPost+"/anexo", {
            method: "POST",

            headers: new Headers({
                'Authorization': servicoLogin.getAuthorization()

            }),
            body: formData
        }).then((resultado) => {
            
            if (resultado.ok) {
                this.setState(
                (anterior) =>
        {
            anterior.update = anterior.update+1; 
            console.log("Mudou");
            
            
    
            return anterior;
        }
        );            
            } else {
                resultado.json().then(
                        (resultadoErro) => {
                            this.setAlert (resultadoErro+"!", "danger"); 
                        }
                        
                )
            }
        });
        
        this.loading("none");                         
        this.setState({show: false});
        
    }
    
    data(date){
        console.log(date);

        if(date !== undefined){
        let dateString = date;
        let dateParts = dateString.split("-");

        return dateParts[2] +"/"+ dateParts[1] +"/"+ dateParts[0];
        }else{
            return "";
        }
    }
    
    render() {
        
        //console.log(this.state.topico.criadorTopico);
        //<PostList posts={this.state.pagina}/>   
        
        let statusNext = true;
        let statusPrev = true;
        //alert(this.state.pagina.totalPages);
        
        if (this.state.paginaAtual > 0) {
            statusPrev = false;
        }

        if (this.state.paginaAtual < this.state.pagina.totalPages - 1) {
            statusNext = false;
        }
        
        let aviso=null;
    
    if (this.state.msgAlert!==""){
        
        let status;
        if(this.state.tipoAlert==="success"){
            status="Concluído!";
        }else status="Erro!";
        aviso=<Alert bsStyle={this.state.tipoAlert}>
        <strong>{status}</strong> {this.state.msgAlert}
        </Alert>
    }


        return (

            

            <div className="content">
    
                <div style={{padding:15}}>
                
                    <h1 style={{fontSize: '30px'}}>{this.state.grupo.nome} - {(this.state.topico.id)? 
                    this.state.topico.nome:"Geral"}</h1>

                    <small>{(this.state.topico.id && this.state.topico.criadorTopico)? 
                    "Criador do Tópico: " + this.state.topico.criadorTopico.nome +", Data: " 
                                          + this.data(this.state.topico.dataCriacao):
                                          +(this.state.grupo.donoGrupo !== undefined)? "Data: " + this.data(this.state.grupo.dataCriacao) 
                                          + " - Dono do Grupo: " + this.state.grupo.donoGrupo.nome:""}</small> 

                    
                </div>
                
                
                
                <Grid fluid>
                {aviso}
                    <Row>
                
                        <Col md={8}>
                            <Card 
                                title="Postagens"                                                            
                                content={
                                
                                <from>
                                    
                                    <PostList posts={this.state.pagina}/>
                                    
                                    
                        
                                        <Button
                                            bsStyle="danger"
                                            pullRight
                                            fill
                                        
                                            onClick={(e) => {
                                                this.abrirNovoPost();                               
                                            }}
                                        >   
                                            Novo Post
                                        </Button>
                                        <div className="clearfix"></div>
                                        
                                </from>

                         }
                         
                         legend={
                    <Pager style={{marginTop:25}}>
                        
                    {(!statusPrev)? <Pager.Item                           
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
                        </Pager.Item>
                        :""}
                    </Pager>
                }
                    />
                    </Col>
                    
                    <TopicCard
                    idGrupo={this.state.grupo.id}
                    mostraErro={(erro, tipo)=>{this.setAlert(erro, tipo);}}
                    listar={this.listarTopicoEspecifico()}
                    />
                    
            </Row>
                    <NewPost 
                    voltar={()=>{this.setState({show:false});}}
                    show={this.state.show}
                    loading={this.state.loading}
                    
                    upload={(anexo)=>{this.upload(anexo);}}
                    inserir ={(post, anexo)=>{
                                    this.loading("");
                                    let topicoId;
                                    if(this.state.topico.id){
                                    topicoId=this.state.topico.id;
                                    }else topicoId=0;
                                    
                                    this.postService.inserirEmTopico(post, this.state.grupo.id, topicoId,
                                    (post)=>{
                                    
                                    if (anexo){
                                        this.upload(anexo, post.id);
                                        }
                                        this.loading("none");
                                        this.setAlert ("Post realizado com sucesso!", "success");
                                        this.setState({show: false});   
                                        this.listarPostEspecifico(0);
                                        this.listar(0);
                                },
                                (erro)=>{
                                console.log("Erro!");
                                console.log(erro);
                                
                                this.setAlert (erro+"!", "danger");
                            }
                        );
                        
                }}
                post={this.state.post} 
                    />

                </Grid>
                
            </div>
        );
    }
    
}

export default GroupView;