import React, { Component } from 'react';
import {
Grid, Row, Col,
FormGroup, ControlLabel, FormControl, Radio, Checkbox
} from 'react-bootstrap';


import {Card} from '../Card/Card';


import {FormInputs} from '../FormInputs/FormInputs.jsx';
import Button from '../../elements/CustomButton/CustomButton.jsx';
import GroupService from '../../views/Groups/GroupService';
import servicoLogin from '../../login/ServicoLogin';

class GroupImage extends React.Component {

constructor (props){
    super(props);

    this.state = {
        file: "",//para imagem
        imagePreviewUrl: ""//para imagemo
    }
    
    this.groupService = new GroupService();
    this._handleImageChange = this._handleImageChange.bind(this);
    this._handleSubmit = this._handleSubmit.bind(this);
    //this.listaCategorias();
}




    
    _handleSubmit(form) {
        let formData = new FormData(form);
        fetch("/api/grupos/" +this.props.id + "/imagem", {
            method: "POST",

            headers: new Headers({
                'Authorization': servicoLogin.getAuthorization()

            }),
            body: formData
        }).then((resultado) => {
            if (resultado.ok) {
                this.setState(
                (anterior) =>
        {
            alert("Imagem inserida com sucesso!");
            console.log("Mudou!");
            return anterior;
        }
        );
                
                
            } else {
                resultado.json().then(
                        (resultadoErro) => console.log(resultadoErro)
                )
            }

        });
      }
    
      _handleImageChange(e) {
        e.preventDefault();
    
        let reader = new FileReader();
        let file = e.target.files[0];
    
        reader.onloadend = () => {
          this.setState({
            file: file,
            imagePreviewUrl: reader.result
          });
        }
    
        reader.readAsDataURL(file)
      }
    

    


render() {
    let {imagePreviewUrl} = this.state;
    let $imagePreview = null;
    if (imagePreviewUrl) {
      $imagePreview = (<img src={imagePreviewUrl} responsive width="100%"/>);
    }
    return (


                    <div>
                        {$imagePreview}

                        <form method="post" encType="multipart/form-data" 
                            onSubmit={(event) => {
                                event.preventDefault();
                                this._handleSubmit(event.target);
                        }}>
                        
                            
                     
                        <FormInputs
                            ncols={["col-md-6"]}
                            proprieties={[
                                {
                                    label: "Adicione uma foto ao grupo: ",
                                    type: "file",
                                    bsClass: "form-control",
                                    placeholder: "File",
                                    name:"arquivo",
                                    onChange:this._handleImageChange
                                }
                            ]}
                        />

                            <Button
                                style={{width: "100%"}}
                                className="btnSaveif"
                                block
                                fill
                                type="submit"
                            >
                                Enviar
                            </Button>

                        </form>
                        
                    </div>


                    
                    


            
  
                    
       
    );
}
}

export default GroupImage;