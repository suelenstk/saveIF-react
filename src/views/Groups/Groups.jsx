import React, { Component } from 'react';
import {Grid} from 'react-bootstrap';
import GroupService from './GroupService';
import GroupList from './GroupList';

class Groups extends Component {

    constructor(props){

        super(props);
        //console.log(this.props.user);
        this.state = {
            pagina: {},
            grupo:{nome:"teste"}
        }
        this.GroupService = new GroupService();
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
        this.GroupService.listarPaginado(0,
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

        return (            
            <div className="content">              
                <Grid fluid>

                    <h1 style={{fontSize: '30px'}}>Outros Grupos</h1>
                    <GroupList pagina={this.state.pagina}
                               solicitar = {(id,grupo)=>{ 
                                this.GroupService.editar(id, grupo, 
                                        (item)=>{
                                            alert("Solicitação efetuada com sucesso!");
                                        },
                                        (erro)=>{
                                            console.log("Erro!");
                                            console.log(erro);
                                            }
                                        );
                                }}/>
                    
                </Grid>
            </div>
        );
    }
}

export default Groups;
