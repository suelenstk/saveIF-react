import React, {Component} from 'react';
import {Col, Grid, Image, Row} from 'react-bootstrap';
import ListParticipants from './ListParticipants.jsx';
import Card from '../../components/Card/Card';
import Button from '../../elements/CustomButton/CustomButton.jsx';
import {Link} from 'react-router-dom';
import GroupService from './GroupService';
import ServicoLogin from '../../login/ServicoLogin';

class GroupEnter extends Component {

    constructor(props) {
        super(props);

        this.state = {
            grupo: {nome: ""},
            id: this.props.id,
            solicitar: this.props.solicitar,
            idUsuario: this.props.user,
            pagina: ""
        };

        //console.log(this.props.id);
        this.GroupService = new GroupService();
        this.listarGrupo();
        this.listarParticipantes();

    }

    setarItem(paginaResultado) {
        this.setState({
            pagina: paginaResultado
        });
    }

    setarGrupo(resultado) {
        this.setState({
            grupo: resultado
        });
    }


    listarParticipantes() {
        this.GroupService.listarParticipantes(this.state.id, 0,
            (resultado) => {
                console.log(resultado);
                this.setarItem(resultado);
            },
            (erro) => {
                console.log("Erro:");
                console.log(erro);
            }
        );
    }

    listarGrupo() {
        this.GroupService.listarGrupoEspecifico(this.state.id,
            (resultado) => {
                // console.log(resultado);
                this.setarGrupo(resultado);
            },
            (erro) => {
                console.log("Erro:");
                console.log(erro);
            }
        );
    }

    //simulação da solicitação
    confirmar() {
        //insere a id do usuário solicitante
        //this.state.grupo.solicitantesGrupo[0] = {id:this.state.idUsuario}

        //alert(this.state.grupo.solicitantesGrupo[0].id);
        //alert(this.state.solicitar);
        //manda para atualzar no banco de dados
        this.state.solicitar(this.state.id, this.state.idUsuario);

    }

    verificarSolicitante(id, solicitantesGrupo) {

        for (let i = 0; i < solicitantesGrupo.length; i++) {
            if (id === solicitantesGrupo[i].id) {
                return false;
            }
        }

        return true;

    }

    botaoSolicitar() {

        if (this.verificarSolicitante(this.state.idUsuario,
            this.state.grupo.solicitantesGrupo)) {

            let botoes = [];

            let botao = <Link to={{
                pathname: '/home'
            }}>
                <Button
                    bsStyle="danger"
                    pullRight
                    fill
                    type="submit"
                    onClick={() => {
                        this.confirmar()
                    }}>
                    Solicitar Inscrição
                </Button></Link>;

            botoes.push(botao);

            return botoes;
        }

    }

    render() {

        if (this.state.grupo.nome !== "")
            return (
                <div className="content">

                    <Grid fluid>
                        <Row>
                            <Col md={12}>

                                <Card
                                    ctAllGroups

                                    content={
                                        <Row>
                                            <Image src={"/api/grupos/" + this.props.id + "/imagem?" +
                                            ServicoLogin.getAuthorizationGet()} responsive width="450"/>
                                            <Col lg={12} md={12} sm={12} xs={12}>

                                                <h2>{this.state.grupo.nome}</h2>
                                                <br/>

                                                <h5>Descrição</h5>

                                                <p style={{marginLeft: 20}}>{this.state.grupo.descricao}</p>
                                                <br/>
                                                <h5>Categorias</h5>
                                                <p style={{marginLeft: 20}}>{this.state.grupo.categoria.nome}</p>
                                                <br/>

                                                <h5>Tipo de privacidade</h5>
                                                <p style={{marginLeft: 20}}>{this.state.grupo.tipoPrivacidade}</p>
                                                <br/>

                                                <h5>Participantes</h5>

                                                <ListParticipants pagina={this.state.pagina}/>

                                                {this.botaoSolicitar()}

                                                <br/><br/>
                                                <hr/>

                                            </Col>

                                        </Row>
                                    }
                                />
                            </Col>
                        </Row>
                    </Grid>
                </div>
            );
        else
            return <div>Não foi selecionado nenhum grupo.</div>
    }
}

export default GroupEnter;