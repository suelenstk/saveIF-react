import React, {Component} from 'react';
import {Col, ControlLabel, FormControl, FormGroup, Grid, Row} from 'react-bootstrap';
import HelpBlock from "react-bootstrap/es/HelpBlock";
import {FormInputs} from '../../components/FormInputs/FormInputs.jsx';
import {Card} from '../../components/Card/Card.jsx';
import {UserCard} from '../../components/UserCard/UserCard.jsx';
import Button from '../../elements/CustomButton/CustomButton.jsx';
import UserService from '../../services/UserService';
import courseService from "../../services/CourseService";
import avatar from "../../assets/img/faces/face-3.jpg";
import {Redirect} from "react-router-dom";
import Alert from "react-bootstrap/es/Alert";
import boia from '../../assets/img/boia.png';
import ServicoLogin from '../../login/ServicoLogin';
import ProfileImage from './ProfileImage';

class UserProfile extends Component {
    
    
   constructor(props){

       super(props);
       console.log(this.props.user);
       
       this.state = {
            avisoUsuario: "",
            sucesso: "",
            listaCurso: "",
            curso: "",
            cadastro: true,
            usuario: this.props.user,
            nome:this.props.user.nome,
            desc:this.props.user.sobreUsuario,
            avatar:`/api/usuarios/` + this.props.user.id +`/imagem?`+
                                        ServicoLogin.getAuthorizationGet(),
            
       };
       
       this.UserService = new UserService();

       this.setState({
            listaCurso: (
                courseService.listarNaoPaginado(
                    (sucesso) => {
                        this.setState({listaCurso: sucesso});
                        console.log(this.state.listaCurso);
                    },
                    (erro) => {
                        console.log(erro);
                    }
                )
            )
       });
       
        this.setState({
            curso: (
                courseService.recuperar((this.state.usuario.curso.id)?this.state.usuario.curso.id:this.state.usuario.curso,
                    (sucesso) => {
                        this.setState({curso: sucesso});
                        console.log(this.state.curso);
                    },
                    (erro) => {
                        console.log(erro);
                    }
                )
            )
       });

   }
   
    setValor(atributo, valor) {
        this.setState(
            (estado) => estado.usuario[atributo] = valor
        );
    }
    
    editarUsuario() {
        let usuario = this.state.usuario;
        this.UserService.editar(this.state.usuario.id,usuario,
            (sucesso) => {
                this.setState({cadastro: false});
                alert("Perfil alterado com sucesso!");
                this.setState({sucesso: <Redirect to="/"/>})
            },
            (erro) => {
                console.log("Erro!");
                console.log(erro);
                this.setState({
                    avisoUsuario: "Erro inesperado ao alterar perfil:\n" + erro.message + "\nInforme ao administrador do sistema."
                });
            }
        )
    }
   
    confirmar() {

        let regexNome = /^[a-zA-Z\u00C0-\u00FF ]+$/;

        if (this.state.usuario.tipoVinculo !== "aluno" || (this.state.usuario.tipoVinculo === "aluno" && this.state.usuario.curso !== "")) {    
                if (regexNome.test(this.state.usuario.nome)) {

                    this.editarUsuario();
                       
                } else {
                        
                    alert("Nome inválido! Não são aceitos números ou caracteres especiais.");
                }
         }else{
             alert("Preencha o campo 'CURSO'!");
         }
    }
    
    render() {
        
        let campoCurso = null;
        let erroCadastro = "";
        

        if (this.state.usuario.tipoVinculo === "aluno" && this.state.listaCurso) {
            campoCurso =
                <Row>
                    <FormGroup controlId="formControlSelectCurso" className="col-md-12">
                        <ControlLabel>Curso</ControlLabel>
                        <FormControl
                            componentClass="select"
                            placeholder="curso"
                            value={this.state.usuario.curso}
                            onChange={(e) => this.setValor("curso", e.target.value)}
                            required
                        >
                            <option value="">-- Selecione --</option>
                            {this.state.listaCurso.map((curso) => {
                                return <option
                                    value={curso.id}
                                    key={curso.id}
                                >{curso.nome}</option>
                            })}
                        </FormControl>
                    </FormGroup>
                </Row>
        } else {
            campoCurso = "";
        }     
        
        if (this.state.avisoUsuario !== "") {
            erroCadastro =
                <div>
                    <HelpBlock>{this.state.avisoUsuario}</HelpBlock>
                </div>
        }
        
        if (this.state.sucesso)
            return this.state.sucesso;
        else return (
            <div className="content">
                <Grid fluid>
                    <Row>
                        <Col md={8}>
                            <Card
                                title="Editar Perfil"
                                content={
                                    <form onSubmit={(event) => {
                                            event.preventDefault();
                                            this.confirmar()
                                        }}>
                                  
                                        <Row>
                                            <FormGroup controlId="formHorizontalNome" className="col-md-12">
                                                <ControlLabel>Nome</ControlLabel>
                                                    <FormControl
                                                        type="text"
                                                        placeholder={this.state.usuario.nome}
                                                        onChange={(e) => this.setValor("nome", e.target.value)}                                                      
                                                    />
                                            </FormGroup>
                                        </Row>

                                        <Row>
                                            <FormGroup controlId="formControlSelectVinculo"
                                                           className="col-md-12">
                                                <ControlLabel>Vínculo</ControlLabel>
                                                <FormControl
                                                    componentClass="select"
                                                    placeholder="vinculo"
                                                    value={this.state.usuario.tipoVinculo}
                                                    onChange={(evento) => this.setValor("tipoVinculo", evento.target.value)}
                                                    required>
                                                    
                                                       <option value="">-- Selecione --</option>
                                                       <option value="aluno">Aluno</option>
                                                       <option value="professor">Professor</option>
                                                       <option value="servidor">Servidor Técnico</option>
                                                       
                                                </FormControl>
                                            </FormGroup>
                                        </Row>

                                        {campoCurso}

                                        <Row>
                                                <Col md={12}>
                                                    <FormGroup controlId="formControlsTextarea">
                                                        <ControlLabel>Sobre mim (opcional)</ControlLabel>
                                                        <FormControl
                                                            rows="5" componentClass="textarea"
                                                            bsClass="form-control"
                                                            placeholder="Fale um pouco sobre você..."
                                                            value={this.state.usuario.sobreUsuario}
                                                            onChange={(e) => this.setValor("sobreUsuario", e.target.value)}
                                                        />
                                                    </FormGroup>
                                                </Col>
                                        </Row>
                                        
                                        <ProfileImage id={this.state.usuario.id}/>
                                        
                                        <div className="clearfix"/>
                                        
                                    </form>
                                }
                            />
                        </Col>
                        
                        <Col md={4}>
                            <UserCard
                                
                                avatar={this.state.avatar}
                                name={this.state.nome}
                                curso={(this.state.curso)?this.state.curso.nome:""}
                                description={this.state.desc}

                            />
                                                                                        
                        </Col>

                    </Row>
                </Grid>
            </div>
        );
    }
}

export default UserProfile;


