import React, { Component } from 'react';
import { Grid } from 'react-bootstrap';
import PostService from './PostsService';
import PostList from './PostList';
import PostRoute from './PostRoute';

class PostsView extends Component {

    constructor(props){

        super(props);

        this.state = {
            pagina:{},
            post:{titulo:"teste"}
        }

        this.PostService = new PostService();
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
        this.PostService.listarPaginado(0,
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
                    
                    <PostRoute pagina={this.state.pagina}/>

                </Grid>
                
            </div>
        );
    }
    
}

export default PostsView;