import React from 'react';
import {ControlLabel, FormControl, FormGroup, HelpBlock, Modal} from 'react-bootstrap';
import Button from '../../elements/CustomButton/CustomButton.jsx';
import {Redirect} from "react-router-dom";
import UserService from '../../services/UserService';

export default class RecoverForm extends React.Component {
    
    
    constructor(props) {
        super(props);
        
        this.state = {
            errorEmail: "",
            msgErroEmail: "",
            email:"",
            sucesso:""
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
    
    enviar(){
       
      this.setErrorEmail("","");

        this.UserService.consultarEmail(
            this.state.email,
            (sucesso) => {
                console.log(sucesso);
                this.setState({          
                    sucesso:<Redirect to="/recover"/>                  
                });
            },
            (erro) => {
                //console.log(erro);
                this.setErrorEmail("error",erro.message);
            }
        );
            
            
    }
    
    render(){
        
        let erroEmail = null;
        
        if (this.state.errorEmail === "error") {

            erroEmail = <HelpBlock>{this.state.msgErroEmail}</HelpBlock>;

        } else erroEmail = "";
        
        if (this.state.sucesso)
            
            return this.state.sucesso;
        
        else return (
            
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
                            <ControlLabel>Digite E-mail para ser enviado:</ControlLabel>
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

                            onClick={(e) => {
                                this.enviar();
                            }}
                        >
                            Enviar
                            
                        </Button>

                        <div className="clearfix"></div>
                        {erroEmail}
                    </form>
                </Modal.Body>
            </Modal>
        );
        
    }
    
}