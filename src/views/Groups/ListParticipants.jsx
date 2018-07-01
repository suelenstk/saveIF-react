import React, {Component} from 'react';
import avatar from "../../assets/img/faces/face-3.jpg";
import UserChip from "../../elements/UserChip/UserChip"
import GroupService from './GroupService';
import servicoLogin from "../../login/ServicoLogin";

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
            return <div className="content">
                {this.props.pagina.content.map((usuario) => {
                    return <UserChip
                        value={usuario.id}
                        key={usuario.id}
                        nome={usuario.nome}
                        avatar={avatar}
                        alt={usuario.nome}
                        class="addUserbtn" 
                        largura="30%"
                        icone={this.props.icone}
                        colorIcon={this.state.colorIcon}
                        evento={() => {
                            this.removeGrupo(usuario)
                        }}                
                    />
                })}      
            </div>
            

        } else {
            return <div></div>
        }
    }

}

export default ListParticipants;