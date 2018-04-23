/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

import React, { Component } from 'react';
import GroupService from '../GroupService';
import CreateGroupPage1 from './CreateGroupPage1';


export default class CreateGroup extends Component {
        
        constructor(props) {
        super(props);

        this.state = {
            group:{}
        }
        this.GroupService = new GroupService();

    }

    render() {

        return  <CreateGroupPage1
        
                    create ={(group)=>{ 
                    this.GroupService.create(group, 
                            (group)=>{
                                
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

