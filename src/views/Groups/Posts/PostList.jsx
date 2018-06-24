import React from 'react';
import {Col, Image, Row} from 'react-bootstrap';
import Card from '../../../components/Card/Card';
import anexoTeste from '../../../img/anexoTeste.JPG';
import InfiniteScroll from "react-infinite-scroll-component";
import { UserChip } from '../../../elements/UserChip/UserChip';
import ServicoLogin from '../../../login/ServicoLogin';

const imgStyle = {
    float: 'right',
    marginRight: '55px',
};

let posts = Array.from({length: 10});

export default class PostList extends React.Component {
    

    constructor(props) {

        super(props);
        this.state = {           
            items: Array.from({length: 10}),
            hasMore: true
        };
        
        //console.log(posts);
    }

    data(date) {
        //console.log(date);

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
        return <div style={{"margin-top":"1%"}}><UserChip
            usuario={usuario}
            key={usuario.id}
            nome={usuario.nome}
            avatar={`/api/usuarios/` + usuario.id + `/imagem?` +
                ServicoLogin.getAuthorizationGet()}
            alt={usuario.nome}
        /></div>
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
                                    title={this.posts[index].titulo}
                                    ctAllGroups
                                    content={
                                        <Row>
                                            <Col lg={12} md={12} sm={12} xs={12}>
                                                <div style={imgStyle}>
                                                    {(this.posts[index].anexoPost) ?
                                                        <Image src={anexoTeste} responsive width={30}/> : ""}
                                                    {/*<p style={{textAling:'center'}}>{post.anexoPost.nomeAnexo}</p>*/}
                                                </div>
                                                <p className="h5">{this.posts[index].texto}</p>
                                                <small>Postado por:
                                                {this.exibirAutor(this.posts[index].autorPost)}
                                                Data da postagem: {this.data(this.posts[index].dataPostagem)}.</small>
                                            </Col>
                                        </Row>
                                    }

                                />
                            } else {
                                return <div></div>
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