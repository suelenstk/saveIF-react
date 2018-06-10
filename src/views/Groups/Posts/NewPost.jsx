import React from 'react';
import {ControlLabel, FormControl, FormGroup, HelpBlock, Modal} from 'react-bootstrap';
import {FormInputs} from '../../../components/FormInputs/FormInputs.jsx';
import Button from '../../../elements/CustomButton/CustomButton.jsx';
import Loading from 'react-loading';
import doc from "../../../assets/img/doc.png";
import ppt from "../../../assets/img/ppt.png";
import pdf from "../../../assets/img/pdf.png";
import outro from "../../../assets/img/outro.png";

export default class NewPost extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            post: this.props.post,
            extensaoArquivo: null,
            file: null,
            errorDescricao: "",
            errorTitulo: "",
            msgErroDescricao: "",
            msgErroTitulo: ""
        };

        this.mostraArquivo = this.mostraArquivo.bind(this);
    }

    componentWillReceiveProps(proximoEstado) {
        this.setState({post: proximoEstado.post});
    }

    setTitulo(valor) {
        this.setState(
            (anterior) => {
                anterior.post.titulo = valor;
                return anterior;
            }
        );
    }

    setTexto(valor) {
        this.setState(
            (anterior) => {
                anterior.post.texto = valor;
                return anterior;
            }
        );
    }


    setExtensaoArquivo(extensao, arquivo) {
        this.setState({
            extensaoArquivo: extensao,
            file: arquivo
        });
    }

    setErrorTitulo(estilo, msg) {
        this.setState({
            errorTitulo: estilo,
            msgErroTitulo: msg
        });
    }

    setErrorDescricao(estilo, msg) {
        this.setState({
            errorDescricao: estilo,
            msgErroDescricao: msg
        });
    }

    confirmar(arquivo) {

        if (!this.state.extensaoArquivo) {
            arquivo = null;
        }

        if (this.state.post.titulo && this.state.post.texto) {
            this.setErrorDescricao("", "");
            this.setErrorTitulo("", "");
            this.props.inserir(this.state.post, arquivo);
            this.setExtensaoArquivo(null, null);
            this.setTitulo("");
            this.setTexto("");
        }
        if (!this.state.post.titulo) {
            this.setErrorTitulo("error", "Campo Titulo não pode ser vazio!");
        } else this.setErrorTitulo("", "");
        if (!this.state.post.texto) {
            this.setErrorDescricao("error", "Campo Descrição não pode ser vazio!");
        } else this.setErrorDescricao("", "");

    }

    mostraArquivo(e) {
        e.preventDefault();

        let reader = new FileReader();

        if (e.target.files.length !== 0) {
            let posicao = e.target.files[0].name.split(".").length;
            let extensao = e.target.files[0].name.split(".")[posicao - 1];

            reader.onloadend = () => {
                this.setExtensaoArquivo(extensao, reader.result)
            };

            reader.readAsDataURL(e.target.files[0])

        } else {
            this.setExtensaoArquivo(null, null);
        }
    }

    render() {

        let iconeArquivo = null;
        let btnCloseFile = null;

        let extensao = this.state.extensaoArquivo;

        if (extensao) {

            if (extensao === "png" || extensao === "tiff" || extensao === "jpg" || extensao === "jpeg" || extensao === "bmp") {
                iconeArquivo = <img src={this.state.file} alt="Ícone de imagem" width="100px" height="auto" download/>
            } else if (extensao === "doc" || extensao === "docx") {
                iconeArquivo = <img src={doc} alt="Ícone de .doc" width="100px" height="auto" download/>
            } else if (extensao === "ppt" || extensao === "pptx") {
                iconeArquivo = <img src={ppt} alt="Ícone de .ppt" width="100px" height="auto" download/>
            } else if (extensao === "pdf") {
                iconeArquivo = <img src={pdf} alt="Ícone .pdf" width="100px" height="auto" download/>
            } else iconeArquivo = <img src={outro} alt="Ícone do aqrquivo" width="100px" height="auto"/>;

            btnCloseFile = <button className="close" onClick={() => {
                this.setExtensaoArquivo(null, null);
            }} style={{float: "right", border: "none", backgroundColor: "white"}}>&#x2716;</button>
        }

        let erroTitulo = null;

        if (this.state.errorTitulo === "error") {

            erroTitulo = <HelpBlock>{this.state.msgErroTitulo}</HelpBlock>

        } else erroTitulo = "";

        let erroDescricao = null;

        if (this.state.errorDescricao === "error") {

            erroDescricao = <HelpBlock>{this.state.msgErroDescricao}</HelpBlock>

        } else erroDescricao = "";
        return (
            <Modal
                show={this.props.show}
                onHide={() => {
                    this.props.voltar();
                    this.setExtensaoArquivo(null, null);
                }}
                container={this}
                aria-labelledby="contained-modal-title"
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title">
                        Novo Post
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    <FormGroup controlId="formControlsText">
                        <ControlLabel>Título</ControlLabel>
                        <FormControl
                            type="text"
                            placeholder="Título"
                            value={this.state.titulo}
                            onChange={(e) => this.setTitulo(e.target.value)}
                        />
                    </FormGroup>
                    {erroTitulo}

                    <FormGroup controlId="formControlsTextarea">
                        <ControlLabel>Descrição</ControlLabel>
                        <FormControl rows="4" componentClass="textarea"
                                     bsClass="form-control"
                                     placeholder="Descrição"
                                     value={this.state.texto}
                                     onChange={(e) => this.setTexto(e.target.value)}
                        />
                    </FormGroup>
                    {erroDescricao}

                </Modal.Body>
                <Modal.Footer>
                    <form method="post" encType="multipart/form-data"
                          onSubmit={(event) => {
                              event.preventDefault();
                              this.confirmar(event.target);
                          }}>
                        <FormInputs
                            ncols={["col-md-6"]}
                            proprieties={[
                                {
                                    id: "arquivo",
                                    type: "file",
                                    bsClass: "form-control",
                                    placeholder: "File",
                                    name: "arquivo",
                                    onChange: this.mostraArquivo
                                }
                            ]}
                        />
                        <div style={{float: "left"}}>
                            {btnCloseFile}
                            <a href={this.state.file} download>
                                {iconeArquivo}
                            </a>
                        </div>
                        <div style={{float: "right", display: this.props.loading}}><Loading type='spinningBubbles'
                                                                                            color='#FF4A55' height={30}
                                                                                            width={30}/></div>

                        <br/><br/><br/>
                        <Button onClick={() => {
                            this.props.voltar();
                            this.setExtensaoArquivo(null, null);
                        }}>Voltar</Button>
                        <Button
                            bsStyle="danger"
                            pullRight
                            fill
                            type="submit"
                        >
                            Postar
                        </Button>
                    </form>
                </Modal.Footer>
            </Modal>
        );
    }
}
