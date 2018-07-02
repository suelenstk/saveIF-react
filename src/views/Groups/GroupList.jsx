import React, {Component} from 'react';
import {Col, Image, Row} from 'react-bootstrap';
import Card from '../../components/Card/Card';
import Button from '../../elements/CustomButton/CustomButton.jsx';
import {Link} from 'react-router-dom';
import ServicoLogin from '../../login/ServicoLogin';
import GroupService from './GroupService';
import Pager from "react-bootstrap/es/Pager";

export default class GroupList extends Component {

    constructor(props) {

        super(props);

        this.state = {
            paginaAtual: 0,
            grupo: {},

        };

        this.groupService = new GroupService();
        //alert(this.props.user);
        (this.props.rota === "MyGroups") ?
            this.listarGrupoParticipa(0, this.props.user) : this.listar(0);
    }

    setarItem(paginaResultado) {
        this.setState({
            grupo: paginaResultado
        });
    }


    listar(pagina) {

        this.groupService.listarPaginado(pagina,
            (resultado) => {
                // console.log(resultado);
                this.setarItem(resultado);
            },
            (erro) => {
                console.log("Erro:");
                console.log(erro);
            }
        );
    }

    listarGrupoParticipa(pagina, id) {

        this.groupService.listarGrupoIntegrantes(id, pagina,
            (resultado) => {
                // console.log(resultado);
                this.setarItem(resultado);
            },
            (erro) => {
                console.log("Erro:");
                console.log(erro);
            }
        );
    }

    botaoVerMais(grupo) {

        let botoes = [];


        let verificar = this.verificarUsuario(this.props.user, grupo.integrantesGrupo);
        //let botao = <Link to={`/GroupEnter`}>
        //Verificar rota certa
        let rota = (this.props.rota === "MyGroups" || verificar) ?
            `MyGroups/${grupo.id}/geral` : `groups/${grupo.id}/view`;


        let botao =
            <Link to={{pathname: `/${rota}`}} key="">

                <Button
                    className="btnSaveif"
                    pullRight
                    fill
                    type="submit"
                >
                    {(this.props.rota === "MyGroups" || verificar) ? "Ver postagens" : "Ver mais"}


                </Button></Link>;

        botoes.push(botao);

        return botoes;

    }

    verificarUsuario(id, integrantesGrupo) {
        for (let i = 0; i < integrantesGrupo.length; i++) {
            if (id === integrantesGrupo[i].id) {
                return true;
            }
        }
        return false;
    }

    testarIcone(privacidade) {
        if (privacidade.toLowerCase() === "aberto") {
            return "pe-7s-unlock";

        } else if (privacidade.toLowerCase() === "público") {
            return "fa fa-globe";

        } else {
            return "pe-7s-lock";
        }
    }


    mudarCor(privacidade) {
        if (privacidade.toLowerCase() === "aberto") {
            return "green";

        } else if (privacidade.toLowerCase() === "público") {
            return "#2E64FE";

        } else {
            return "red";
        }
    }

    descricao(privacidade) {
        if (privacidade.toLowerCase() === "aberto") {
            return "Grupo onde todos podem participar sem a necessidade de convite ou solicitação.";

        } else if (privacidade.toLowerCase() === "público") {
            return "Grupo onde todos podem solicitar a participação e ingressar mediante a aprovação do administrador.";
        } else {
            return "Grupo onde todos podem participar mediante ao convite do administrador.";
        }
    }


    render() {
        //alert(this.props.pagina);
        let statusNext = true;
        let statusPrev = true;
        //alert(this.state.pagina.totalPages);

        if (this.state.paginaAtual > 0) {
            statusPrev = false;
        }

        if (this.state.paginaAtual < this.state.grupo.totalPages - 1) {
            statusNext = false;
        }


        if (!this.state.grupo.content) {

            return <div>Não há grupos cadastrados!</div>;

        } else {
            return <Row>
                <h1 style={{fontSize: '30px'}}>{(this.props.rota === "MyGroups") ? "Meus Grupos" : "Outros Grupos"}</h1>
                <Col md={12}>
                    {this.state.grupo.content.map((grupo) => {
                        return <Card
                            key={grupo.id}
                            ctAllGroups
                            content={

                                <Row>
                                    <Col lg={4} md={4} xs={4}>

                                        <Image src={"/api/grupos/" + grupo.id + "/imagem?" +
                                        ServicoLogin.getAuthorizationGet()} responsive width="350"/>
                                    </Col>
                                    <Col lg={8} md={6} sm={6} xs={6}>

                                        <h2>{grupo.nome}</h2>

                                        <div style={{textIndent: 15}}>

                                            <p><strong>Categoria:</strong> {grupo.categoria.nome}</p>

                                            <p><strong>Descrição do Grupo:</strong> {grupo.descricao}</p>
                                        </div>

                                    </Col>

                                    <Col lg={12} xs={12} className="text-center">


                                {/*Sugestão modificações*/}
                                        <p style={{}}>
                                            Grupo {grupo.tipoPrivacidade}<i
                                            className={this.testarIcone(grupo.tipoPrivacidade)}
                                            title={this.descricao(grupo.tipoPrivacidade)}
                                            style={{
                                                color: this.mudarCor(grupo.tipoPrivacidade),
                                                marginLeft: 5
                                            }}/><br/>
                                            {(this.verificarUsuario(this.props.user, grupo.integrantesGrupo) && this.props.rota !== "MyGroups") ?
                                                "Você é integrante desse grupo" :
                                                (this.verificarUsuario(this.props.user, grupo.solicitantesGrupo) ?
                                                    "Você já solicitou a participação neste grupo" :
                                                    "")}</p>
                                        {this.botaoVerMais(grupo)}
                    
                                        <br/><br/>

                                    </Col>


                                </Row>
                            }
                        />
                    })}

                </Col>

                <Pager>
                    {(!statusPrev) ?
                        <Pager.Item
                            previous
                            disabled={statusPrev}
                            onClick={() => {
                                (this.props.rota === "MyGroups") ?
                                    this.listarGrupoParticipa(this.state.paginaAtual - 1, this.props.user) : this.listar(this.state.paginaAtual - 1);
                                this.state.paginaAtual--;
                            }}
                        >

                            &lt; Anterior
                        </Pager.Item> : ""}
                    {(!statusNext) ?
                        <Pager.Item
                            next
                            disabled={statusNext}
                            onClick={() => {
                                (this.props.rota === "MyGroups") ?
                                    this.listarGrupoParticipa(this.state.paginaAtual + 1, this.props.user) : this.listar(this.state.paginaAtual + 1);
                                this.state.paginaAtual++;
                            }}
                        >
                            Próxima &gt;
                        </Pager.Item> : ""}

                </Pager>


            </Row>

        }
    }
}
