import React from 'react';
import ReactLoading from 'react-loading';


import {FormInputs} from '../FormInputs/FormInputs.jsx';
import Button from '../../elements/CustomButton/CustomButton.jsx';
import GroupService from '../../views/Groups/GroupService';
import servicoLogin from '../../login/ServicoLogin';
import Alert from "react-bootstrap/es/Alert";

class GroupImage extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            file: "",//para imagem
            imagePreviewUrl: "",//para imagemo
            loading: false,
            success: false
        };

        this.groupService = new GroupService();
        this._handleImageChange = this._handleImageChange.bind(this);
        this._handleSubmit = this._handleSubmit.bind(this);
        //this.listaCategorias();
    }

    _handleSubmit(form) {
        this.setState({loading: true});
        let formData = new FormData(form);
        fetch("/api/grupos/" + this.props.id + "/imagem", {
            method: "POST",

            headers: new Headers({
                'Authorization': servicoLogin.getAuthorization()

            }),
            body: formData
        }).then((resultado) => {
            this.setState({loading: true});

            // simulacao de atraso no upload - pode ser removido ao entrar em producao

            this.sleep(3000).then(() => {
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
                this.setState({loading: false});
                this.setState({success: true});
            });

        });
    }

    sleep(tempo) {
        return new Promise((e) => setTimeout(e, tempo));
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
        };

        reader.readAsDataURL(file)

    }


    render() {
        let {imagePreviewUrl} = this.state;
        let $imagePreview = null;

        if (imagePreviewUrl) {
            $imagePreview = (<a href={imagePreviewUrl} download> download </a>);
        }

        if (this.state.loading) {
            $imagePreview = (<ReactLoading type="spinningBubbles" className="loading" color="#ED3846"/>);
        }

        if (this.state.success) {
            $imagePreview = (
                <Alert bsStyle="success">
                    Imagem enviada com sucesso!
                </Alert>
            );
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