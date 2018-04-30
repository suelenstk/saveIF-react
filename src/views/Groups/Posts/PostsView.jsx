import React, { Component } from 'react';
import { Grid } from 'react-bootstrap';
import PostService from './PostsService';
import PostList from './PostList';
import PostRoute from './PostRoute';
import NewPost from './NewPost';
import Button from '../../../elements/CustomButton/CustomButton.jsx';

class PostsView extends Component {

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

        return (
            <div className="content">

                <Grid fluid>
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
                    
                    <PostRoute pagina={this.state.pagina}/>
                            
                    <NewPost 
                    voltar={()=>{this.setState({show:false});}}
                    show={this.state.show}
                    inserir ={(post)=>{ 
                                    this.postService.inserir(post, 
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
                    />

                </Grid>
                
            </div>
        );
    }
    
}

export default PostsView;