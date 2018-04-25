import React from 'react';
import GroupService from '../GroupService';
import CreateGroupPage1 from './CreateGroupPage1';


export default class CreateGroup extends React.Component {
        
        constructor(props) {
        super(props);

        this.state = {

            group:{}
        }
        this.GroupService = new GroupService();

    }

    novoGrupo(){
        this.setState({
      
            group:{}
        });
    }

    render() {

        return  <CreateGroupPage1
        
                    inserir ={(group)=>{ 
                    this.GroupService.inserir(group, 
                            (grupo)=>{
                                
                                alert("Grupo criado com sucesso!");
                                                   
                            },
                            (erro)=>{
                                console.log("Erro!");
                                console.log(erro);
                                }
                            );
                    }}
                          
                group={this.state.group} />
            
        

    }
}
