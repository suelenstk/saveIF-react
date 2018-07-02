import React, {Component} from 'react';
import avatar from "../../assets/img/faces/face-3.jpg";
import UserChip from "../../elements/UserChip/UserChip"
import GroupService from './GroupService';

class ListParticipants extends Component {

    constructor(props) {
        super(props);
        this.state = {chip: true, flagParticipante: false, idGrupo: this.props.idGrupo, coordenador: false};
        this.groupService = new GroupService();

        //this.verificarCoordenador();
    }

    /*
     verificarCoordenador() {
         this.state.grupo.coordenadoresGrupo.map((usuario) => {
             if (this.props.idUsua === servicoLogin.getUsuario()) {
                 this.state.coordenador = true;
             }
         });
     }*/

    removeGrupo(usuario) {
        this.groupService.removerParticipante(this.state.idGrupo, usuario.id,
            (sucesso) => {
                alert("Usuário (a) " + usuario.nome + " removido (a) com sucesso!");
                window.location.reload();
            },
            (erro) => {
                console.log("Erro!");
                console.log(erro);
                alert(erro.message);
            }
        );
    }
    verificaCoordenador(usuarioLista) {  
        let coordena = true;
        this.props.coordenadoresGrupo.map((usuario) => {            
            if (usuario.id === usuarioLista.id) {
                coordena = false;
            }
            
        });
        return coordena;
    }
    coordenaGrupo(usuario) {
        this.groupService.tornarCoordenador(this.state.idGrupo, usuario.id,
            (sucesso) => {
                alert("Usuário (a) " + usuario.nome + " agora é um(a) coordenador(a)!");
                window.location.reload ();
            },
            (erro) => {
                console.log("Erro!");
                console.log(erro);
                alert (erro.message);
            }
        );
    }

    render() {
        if (this.props.pagina.content) {
            console.log(this.props.pagina);

            if (this.props.coordenadoresGrupo) {
                return <div className="content">
                    {this.props.pagina.content.map((usuario) => {
                        let coordena = this.verificaCoordenador(usuario);
                        
                        return <UserChip
                            value={usuario.id}
                            key={usuario.id}
                            nome={usuario.nome}
                            avatar={avatar}
                            alt={usuario.nome}
                            class="addUserbtn"
                            largura="30%"
                            colorIcon={this.state.colorIcon}
                            
                            icone1={this.props.icone}                        
                            evento1={() => {
                                this.removeGrupo(usuario)
                            }}
                            nomeEvento1={"Remover Participante"}
                            
                            icone2={"pe-7s-star"}
                            evento2={() => {
                                this.coordenaGrupo(usuario)
                            }}
                            nomeEvento2={"Tornar Coordenador"}
                            eventoDisplay2={coordena}
                        />
                    })}
                </div>
            }

        } else {
            return <div></div>
        }
    }

}

export default ListParticipants;