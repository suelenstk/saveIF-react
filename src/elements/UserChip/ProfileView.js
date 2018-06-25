/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
import React from 'react';
import {Modal} from 'react-bootstrap';
import {UserCard} from '../../components/UserCard/UserCard.jsx';
import ServicoLogin from '../../login/ServicoLogin';

export default class ProfileView extends React.Component {
        
    constructor(props) {
        super(props);
        
        this.state = {
         avatar: `/api/usuarios/` + this.props.usuario.id + `/imagem?` 
         + ServicoLogin.getAuthorizationGet()
       }
       
       //console.log(this.props.usuario);
    }
        
    render() {
        
        return (
            <Modal
                show={this.props.show}
                onHide={() => {
                    this.props.voltar();
                }}
                container={this}
                aria-labelledby="contained-modal-title"
            >

                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title">
                        Perfil do Usuário
                    </Modal.Title>
                </Modal.Header>
                
                <Modal.Body>

                    <UserCard

                                avatar={this.state.avatar}
                                name={this.props.usuario.nome}
                                curso={(this.props.usuario.curso) ? this.props.usuario.curso.nome : ""}
                                email={this.props.usuario.email}
                                description={this.props.usuario.sobreUsuario}

                    />

                </Modal.Body>
                    
            </Modal>
        );
        
        
        
    }
        
        
}