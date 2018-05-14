import React from 'react';
import ReactLoading from 'react-loading';


import {FormInputs} from '../FormInputs/FormInputs.jsx';
import Button from '../../elements/CustomButton/CustomButton.jsx';
import GroupService from '../../views/Groups/GroupService';
import servicoLogin from '../../login/ServicoLogin';

class GroupImage extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            file: "",//para imagem
            imagePreviewUrl: "",//para imagemo
            loading: false
        };

        this.groupService = new GroupService();
        this._handleImageChange = this._handleImageChange.bind(this);
        this._handleSubmit = this._handleSubmit.bind(this);
        //this.listaCategorias();
    }

    _handleSubmit(form) {
        let formData = new FormData(form);
        fetch("/api/grupos/" + this.props.id + "/imagem", {
            method: "POST",

            headers: new Headers({
                'Authorization': servicoLogin.getAuthorization()

            }),
            body: formData
        }).then((resultado) => {
            if (resultado.ok) {
                this.setState(
                    (anterior) => {
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

    sleep() {
        return new Promise((e) => setTimeout(e, 3000));
    }

    _handleImageChange(e) {
        e.preventDefault();
        this.setState({imagePreviewUrl: ""});
        this.setState({loading: true});

        let reader = new FileReader();
        let file = e.target.files[0];
        // simulacao de demora
        // this.sleep().then(() => {
        reader.onloadend = () => {
            this.setState({
                file: file,
                imagePreviewUrl: reader.result
            });
        };

        reader.readAsDataURL(file)
        // });

    }


    render() {
        let {imagePreviewUrl} = this.state;
        let $imagePreview = null;
        if (this.state.loading) {
            $imagePreview = (<ReactLoading type="spinningBubbles" className="loading" color="#ED3846"/>);
        }
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
                                name: "arquivo",
                                onChange: this._handleImageChange
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