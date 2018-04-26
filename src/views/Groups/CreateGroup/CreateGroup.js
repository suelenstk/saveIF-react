import React from 'react';
import CreateGroupPage1 from './CreateGroupPage1';
import GroupService from '../GroupService.jsx';


export default class CreateGroup extends React.Component {
        
        constructor(props) {
        super(props);

        this.state = {

            group:{}
        }
        
     this.groupService = new GroupService();

    }

    render() {

        return  <CreateGroupPage1
        
                    inserir ={(group)=>{ 
                    this.groupService.inserir(group, 
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
