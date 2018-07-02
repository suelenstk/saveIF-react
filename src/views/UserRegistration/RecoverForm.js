import React from 'react';
import {ControlLabel, FormControl, FormGroup, HelpBlock, Modal} from 'react-bootstrap';
import Button from '../../elements/CustomButton/CustomButton.jsx';
import {Redirect} from "react-router-dom";
import UserService from '../../services/UserService';
import { TextNumCode } from './GerarCodigo';


export default class RecoverForm extends React.Component {
    
    
    constructor(props) {
        super(props);
        
        this.state = {
            errorEmail: "",
            msgErroEmail: "",
            email:"",
            sucesso:"",
            usuarioCodigo: {
                usuarioCodigo:"",
                codigo:""
            }
        };
        
        this.UserService = new UserService();
        
    }
    
    setValor(valor) {

        this.setState(
            (e) => e.email = valor
        );

    }
       
    setErrorEmail(estilo, msg) {
        this.setState({
            errorEmail: estilo,
            msgErroEmail: msg
        });
    }
    
    enviarSCodigo(){     
      this.setErrorEmail("","");

      this.setState({          
                    sucesso:<Redirect to={`/recover/${"Email"}`}/>,
      });                
    }
    
    enviar(){
       
      this.setErrorEmail("","");
      
      if(this.state.email){
        this.UserService.consultarEmail(
            this.state.email,
            (sucesso) => {
                //console.log(sucesso);
                this.setState({          
                    sucesso:<Redirect to={`/recover/${sucesso.email}`}/>,
                    usuarioCodigo:{
                        id:sucesso.id,
                        usuarioCodigo:sucesso,
                        codigo:TextNumCode(10,10)
                    }
                });               
                
            },
            (erro) => {
                //console.log(erro);
                this.setErrorEmail("error",erro.message);
            }
        );
            
      }else{
          this.setErrorEmail("error","Campo E-mail não pode ficar em branco!");
      }
    }
    
    inserirCodigo(usuario){
        
        this.UserService.inserirCodigoRecuperacao(usuario,
            () => {
                this.setState({sucesso:<Redirect to={`/recover/${usuario.usuarioCodigo.id}`}/>})
            },
            (erro) => {
                //console.log(erro);
                this.setErrorEmail("error",erro.message);
            }
        )
        
        
    }
    
    render(){
        
        let erroEmail = null;
        
        if (this.state.errorEmail === "error") {

            erroEmail = <HelpBlock>{this.state.msgErroEmail}</HelpBlock>;

        } else erroEmail = "";
        
        if (this.state.sucesso){
            
            //console.log(this.state.usuarioCodigo);
            if(this.state.usuarioCodigo.usuarioCodigo !== ""){
                this.inserirCodigo(this.state.usuarioCodigo);
            }
                
            return this.state.sucesso;
        
        }else return (
            
            <Modal
                show={this.props.showRecovery}
                container={this}
                onHide={(event) => {
                    this.props.voltarRecovery();
                    this.setErrorEmail("", "");
                    this.setValor("");
                }}
                aria-labelledby="contained-modal-title"
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title">
                        Recuperação de senha.
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form>

                        <FormGroup controlId="formControlsText">
                            <ControlLabel>Digite o E-mail para ser gerado e enviado um código de recuperação:</ControlLabel>
                            <FormControl
                                type="text"
                                placeholder="E-mail"
                                value={this.state.email}  
                                onChange={(e) => this.setValor(e.target.value)}   
                                required
                            />
                        </FormGroup>
                      
                                                                      
                        <Button
                            bsStyle="danger"
                            pullRight
                            fill
                            style={{"margin-left":"5%"}}
                            onClick={(e) => {
                                this.enviar();
                            }}
                        >
                            Enviar
                            
                        </Button>
                        
                        <Button
                            bsStyle="danger"
                            pullRight
                            fill

                            onClick={(e) => {
                                this.enviarSCodigo();
                            }}
                        >
                            Já tenho código
                            
                        </Button>

                        <div className="clearfix"></div>
                        {erroEmail}
                    </form>
                </Modal.Body>
            </Modal>
        );
        
    }
    
}