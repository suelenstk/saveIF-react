import React from 'react';


import {FormInputs} from '../FormInputs/FormInputs.jsx';
import Button from '../../elements/CustomButton/CustomButton.jsx';
import servicoLogin from '../../login/ServicoLogin';
import Alert from "react-bootstrap/es/Alert";
import boia from '../../assets/img/boia.png';
import Redirect from "react-router-dom/es/Redirect";

class GroupImage extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            file: "",//para imagem
            imagePreviewUrl: "",//para imagemo
            loading: false,
            success: false,
            error: "",
            concluded: ""
        };

        this._handleImageChange = this._handleImageChange.bind(this);
        this._handleSubmit = this._handleSubmit.bind(this);
        //this.listaCategorias();

        this.setState ({imagePreviewUrl: "/api/grupos/" + this.props.id + "/imagem?" +
                                            servicoLogin.getAuthorizationGet()});
        // console.log ({imagePreviewUrl: "/api/grupos/" + this.props.id + "/imagem?" +
        // servicoLogin.getAuthorizationGet()});
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
                    this.sleep(2000).then(() => {
                        this.setState({concluded: <Redirect to={"/MyGroups/" + this.props.id + "/geral"}/>});
                    });
                    this.setState(
                        (anterior) => {
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

    validateImage(file) {
        if (file) {
            let num = file.name.split(".").length;
            let name = file.name.split(".")[num - 1].toLowerCase();
            if (name === "png" || name === "tiff" || name === "jpg" || name === "jpeg" || name === "bmp") {
                this.setState({error: ""});
                return true;
            } else {
                this.setState({error: "Formato inválido! São aceitos apenas arquivos no formato de imagem."});
                return false;
            }
        } else {
            this.setState({error: ""});
            return false;
        }
    }

    _handleImageChange(e) {
        e.preventDefault();

        this.setState({imagePreviewUrl: ""});
        this.setState({success: false});

        let reader = new FileReader();
        let file = e.target.files[0];

        if (this.validateImage(file)) {
            reader.onloadend = () => {
                this.setState({
                    file: file,
                    imagePreviewUrl: reader.result
                });
            };
            reader.readAsDataURL(file)
        }
    }

    render() {
        let {imagePreviewUrl} = this.state;
        let $imagePreview = null;
        let seletorImagem = (
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
                            accept: "image/*",
                            bsClass: "form-control",
                            placeholder: "File",
                            name: "arquivo",
                            onChange: this._handleImageChange
                        }
                    ]}
                />
                <Button
                    disabled={this.state.imagePreviewUrl === ""}
                    style={{width: "100%"}}
                    className="btnSaveif"
                    block
                    fill
                    type="submit"
                >
                    Enviar
                </Button>
            </form>
        );

        if (this.state.error !== "") {
            $imagePreview = (
                <Alert bsStyle="error">
                    {this.state.error} <i className="pe-7s-close-circle ld ldt-jump-in"/>
                </Alert>
            );
        }

        if (imagePreviewUrl) {
            $imagePreview = <img src={imagePreviewUrl} alt="Pré-visualização de imagem" width="100%"/>;
        }else {
            $imagePreview = <img src={"/api/grupos/" + this.props.id + "/imagem?" +
                                            servicoLogin.getAuthorizationGet()} alt="Pré-visualização de imagem" width="100%"/>;
        }

        if (this.state.loading) {
            $imagePreview = (<img src={boia} alt="Bóia loading" className="boia ld ld-cycle"/>);
        }

        if (this.state.success) {
            $imagePreview = (
                <Alert bsStyle="success">
                    Imagem enviada com sucesso! <i className="pe-7s-check ld ldt-jump-in"/>
                </Alert>
            );
            seletorImagem = "";
        }

        if (this.state.concluded) {
            return this.state.concluded;
        } else return (
            <div>
                {$imagePreview}
                {seletorImagem}
            </div>
        );
    }
}

export default GroupImage;