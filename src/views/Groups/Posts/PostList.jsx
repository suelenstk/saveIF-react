import React from 'react';
import {Col, Image, Row} from 'react-bootstrap';
import Card from '../../../components/Card/Card';
import InfiniteScroll from "react-infinite-scroll-component";
import {UserChip} from '../../../elements/UserChip/UserChip';
import ServicoLogin from '../../../login/ServicoLogin';
import doc from "../../../assets/img/doc.png";
import ppt from "../../../assets/img/ppt.png";
import pdf from "../../../assets/img/pdf.png";
import outro from "../../../assets/img/outro.png";


const imgStyle = {
    float: 'right',
    marginRight: '10px'
};

let posts = Array.from({length: 10});

export default class PostList extends React.Component {
    

    constructor(props) {

        super(props);
        this.state = {           
            items: Array.from({length: 10}),
            hasMore: true,
            file: null
        };
    }

    data(date) {
        let dateParts = date.split("-");

        return dateParts[2] + "/" + dateParts[1] + "/" + dateParts[0];

    }

    fetchMoreData = () => {
        
        if (this.state.items.length >= this.posts.length) {
                this.setState({hasMore: false});
                return;
        }

            // a fake async api call like which sends
            // 20 more records in .5 secs
            setTimeout(() => {
        this.setState({
              items: this.state.items.concat(Array.from({length: 10}))
        });
        }, 1000);
    };
    
    exibirAutor(usuario){
        return <div style={{marginTop: "1%"}}>
          <UserChip
            usuario={usuario}
            perfil={true}
            key={usuario.id}
            nome={usuario.nome}
            avatar={`/api/usuarios/` + usuario.id + `/imagem?` +
                ServicoLogin.getAuthorizationGet()}
            alt={usuario.nome}
        />
         </div>
    }

    mostraArquivo (post) {
        let extensao = post.anexoPost.nomeAnexo.split(".")[post.anexoPost.nomeAnexo.split(".").length - 1];
        return extensao === "png" || extensao === "tiff" || extensao === "jpg" || extensao === "jpeg" || extensao === "bmp" ?
        <a href={"/api/posts/" + post.id + "/anexo?" + ServicoLogin.getAuthorizationGet()} download={post.anexoPost.nomeAnexo}><Image src={"/api/posts/" + post.id + "/anexo?" + ServicoLogin.getAuthorizationGet()} responsive width={50}/></a>
        : extensao === "doc" || extensao === "docx" ? <a href={"/api/posts/" + post.id + "/anexo?" + ServicoLogin.getAuthorizationGet()} download={post.anexoPost.nomeAnexo}><Image src={doc} responsive width={50}/></a>
        : extensao === "ppt" || extensao === "pptx" ? <a href={"/api/posts/" + post.id + "/anexo?" + ServicoLogin.getAuthorizationGet()} download={post.anexoPost.nomeAnexo}><Image src={ppt} responsive width={50}/></a>
        : extensao === "pdf" ? <a href={"/api/posts/" + post.id + "/anexo?" + ServicoLogin.getAuthorizationGet()} download={post.anexoPost.nomeAnexo}><Image src={pdf} responsive width={50}/></a> 
        : <a href={"/api/posts/" + post.id + "/anexo?" + ServicoLogin.getAuthorizationGet()} download={post.anexoPost.nomeAnexo}><Image src={outro} responsive width={50}/></a> 
    }

    render() {

        this.posts = Array.from(this.props.posts);

        if (posts !== "") {
            if(this.posts.length !== 0){
     
            return <Row>
                
                <Col md={12}>
                    <InfiniteScroll
                        dataLength={this.state.items.length}
                        next={this.fetchMoreData}
                        hasMore={this.state.hasMore}
                        loader={<h4>Carregando...</h4>}
                    >

                        {this.state.items.map((i, index) => {

                            if (this.posts[index] != null) {
                                return <Card
                                    key={index}
                                    title={this.posts[index].titulo}
                                    ctAllGroups
                                    content={
                                        <Row>
                                            <Col lg={12} md={12} sm={12} xs={12}>
                                                <div style={imgStyle}>
                                                    {(this.posts[index].anexoPost) ?
                                                        <div>
                                                            {this.mostraArquivo(this.posts[index])} 
                                                            <p style={{width: '80px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis'}}>{this.posts[index].anexoPost.nomeAnexo}</p>                
                                                        </div>
                                                        : ""
                                                        }
                                                </div>
                                                <p style={{width: '480px', textAlign: 'justify'}}>{this.posts[index].texto}</p>
                                                <small>Postado por:
                                                {this.exibirAutor(this.posts[index].autorPost)}
                                                Data da postagem: {this.data(this.posts[index].dataPostagem)}.</small>
                                            </Col>    
                                        </Row>       
                                    }
                                />
                            } else {
                                return <div key={index}/>
                            }
                        })}
                    </InfiniteScroll>    
                    
                </Col>
            </Row>
             } else {
                return <div></div>
            }
        } else {
            return <div></div>
        }
    }
}