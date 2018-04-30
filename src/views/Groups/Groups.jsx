import React, { Component } from 'react';
import {Grid} from 'react-bootstrap';
import GroupService from './GroupService';
import GroupRoute from './GroupRoute';


class Groups extends Component {

    constructor(props){

        super(props);
        //console.log(this.props.user);
        this.state = {
            pagina: {},
            grupo:{nome:"teste"}
        }
        this.groupService = new GroupService();
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
        this.groupService.listarPaginado(0,
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

                    <h1 style={{fontSize: '30px'}}>Grupos</h1>
                    <GroupRoute pagina={this.state.pagina}
                               solicitar = {(id, grupo)=>{ 
                                this.groupService.solicitar(id, grupo, 
                                        (item)=>{
                                            alert("Solicitação efetuada com sucesso!");
                                        },
                                        (erro)=>{
                                            console.log("Erro!");
                                            console.log(erro);
                                            }
                                        );
                                }}
                                user={this.props.user}
                                rota="groups" />

                </Grid>
            </div>
        );
    }
}

export default Groups;
