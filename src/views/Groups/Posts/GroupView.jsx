import React, { Component } from 'react';
import { Grid, Col, Row } from 'react-bootstrap';
import {Card} from '../../../components/Card/Card.jsx';
import PostService from './PostsService';
import TopicService from '../CreateTopic/TopicService';
import GroupService from '../GroupService';
import PostList from './PostList';
import NewPost from './NewPost';
import TopicCard from '../CreateTopic/TopicCard';
import Button from '../../../elements/CustomButton/CustomButton.jsx';

class GroupView extends Component {

    constructor(props){

        super(props);

        this.state = {
            show: false,
            pagina: {},
            post:{titulo:"teste"},
            grupo:{id:this.props.id},
            topico:{id:this.props.idt}          
        }
        
        //alert(this.state.topico.id);
        //alert(this.state.grupo.id);
        
        this.postService = new PostService();
        this.groupService = new GroupService();
        this.topicService = new TopicService();

        (this.state.topico.id)? this.listarPostEspecifico():this.listar();
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

    listar() {
        let paginaAtual=0;
        console.log(this.state.grupo.id);
        this.postService.listarPostGeral(this.state.grupo.id,paginaAtual,
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
    
    listarPostEspecifico() {

        let paginaAtual=0;      

        this.postService.listarPostEspecifico(this.state.grupo.id,this.state.topico.id,paginaAtual,
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
    
    data(date){
        console.log(date);

        let dateString = date;
        let dateParts = dateString.split("-");

        return dateParts[2] +"/"+ dateParts[1] +"/"+ dateParts[0];
    }
    
    render() {
        
        //console.log(this.state.topico.criadorTopico);
        //<PostList posts={this.state.pagina}/>   
        
        return (
            <div className="content">
    
                <div style={{padding:15}}>
                
                    <h1 style={{fontSize: '30px'}}>{this.state.grupo.nome} - {(this.state.topico.id)? 
                    this.state.topico.nome:"Geral"}</h1>

                    <span className="h5">{(this.state.topico.id && this.state.topico.criadorTopico)? 
                    "Criador do Tópico: " + this.state.topico.criadorTopico.nome +", Data: " 
                                          + this.data(this.state.topico.dataCriacao):"Tópico gerado automaticamente."}</span> 

                    
                </div>
                
                
                <Grid fluid>
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
                    />
                    </Col>
                    
                    <TopicCard
                    idGrupo={this.state.grupo.id}
                    />
                    
            </Row>
                    <NewPost 
                    voltar={()=>{this.setState({show:false});}}
                    show={this.state.show}
                    inserir ={(post)=>{ 
                                    this.postService.inserirEmTopico(post,this.state.grupo.id, 
                                    (post)=>{
                                        alert("Post criado com sucesso!");
                                        this.setState({show: false});                            
                                },
                                (erro)=>{
                                console.log("Erro!");
                                console.log(erro);
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