import React from 'react';
import {Col, Image, Row} from 'react-bootstrap';
import Card from '../../../components/Card/Card';
import anexoTeste from '../../../img/anexoTeste.JPG';
import InfiniteScroll from "react-infinite-scroll-component";

const imgStyle = {
    float: 'right',
    marginRight: '55px',
};

export default class PostList extends React.Component {

    constructor(props){

        super(props);
        this.state = {
           items: Array.from({ length: 10 }),
           posts: Array.from({ length: 10 }),
            hasMore: true
        };
        
    }    
        
    data(date) {
        console.log(date);

        let dateParts = date.split("-");

        return dateParts[2] + "/" + dateParts[1] + "/" + dateParts[0];
        
    }
    
    fetchMoreData = () => {
    if (this.state.items.length >= this.state.posts.length) {
      this.setState({ hasMore: false });
      return;
    }
    // a fake async api call like which sends
    // 20 more records in .5 secs
    setTimeout(() => {
      this.setState({
        items: this.state.items.concat(Array.from({ length: 10 }))
      });
    }, 1000);
  };
  

    render() {
           
       this.state.posts = Array.from(this.props.posts);
       console.log(this.state.posts[0]);   
       
         if (this.state.posts != "") {
           
            return <Row>
            
                <Col md={12}>
                <InfiniteScroll
                                        dataLength={this.state.items.length}
                                        next={this.fetchMoreData}
                                        hasMore={this.state.hasMore}
                                        loader={<h4>Carregando...</h4>}
                                        >
                                         
                                        {this.state.items.map((i, index) => {
                                                                                                
                          if(this.state.posts[index] != null){                                                                       
                        return <Card
                            title={this.state.posts[index].titulo}
                            ctAllGroups
                            content={
                                <Row>
                                    <Col lg={12} md={12} sm={12} xs={12}>
                                        <div style={imgStyle}>
                                            {(this.state.posts[index].anexoPost) ? <Image src={anexoTeste} responsive width={30}/> : ""}
                                            {/*<p style={{textAling:'center'}}>{post.anexoPost.nomeAnexo}</p>*/}
                                        </div>
                                        <p className="h5">{this.state.posts[index].texto}</p>
                                        <small>Por {this.state.posts[index].autorPost.nome}, {this.data(this.state.posts[index].dataPostagem)}.</small>
                                    </Col>
                                </Row>
                            }
                            
                        />
                    }else{
                            return <div></div>
                            }
                    
                    
                                                                                     
                    })}
                     </InfiniteScroll>
                </Col>
            </Row>
        } else {
            return <div></div>
        }
    }
}