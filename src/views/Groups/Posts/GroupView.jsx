import React, { Component } from 'react';
import { Grid, Col, Row } from 'react-bootstrap';
import {Card} from '../../../components/Card/Card.jsx';
import PostService from './PostsService';
import PostList from './PostList';
import NewPost from './NewPost';
import TopicCard from '../CreateTopic/TopicCard';
import Button from '../../../elements/CustomButton/CustomButton.jsx';

class GroupView extends Component {

    constructor(props){

        super(props);

        this.state = {
            show: false,
            pagina:{},
            post:{titulo:"teste"}
            
        }

        this.postService = new PostService();
        this.listar();

    }

    setarItem(paginaResultado) {
        //console.log(paginaResultado);
        this.setState({
            pagina: paginaResultado
        });
    }
    
    abrirNovoPost() { 
        this.setState({
            show: true
        });
    }

    listar() {
        this.paginaAtual=0;
        this.postService.listarPaginado(0,
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
        
        
            //<PostList posts={this.state.pagina}/>
        return (
            <div className="content">

                <Grid fluid>
                    <Row>
                
                        <Col md={8}>
                            <Card 
                                title="Postagens"
                                
                                content={
                                
                                <from>
                                    
                                    <PostList posts ={this.state.pagina}/>
                                    
                        
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
                    
                    <TopicCard/>
                    
            </Row>
                    <NewPost 
                    voltar={()=>{this.setState({show:false});}}
                    show={this.state.show}
                    inserir ={(post)=>{ 
                                    this.postService.inserir(post, 
                                    (post)=>{
                                        alert("Post criado com sucesso!"+post.id);
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