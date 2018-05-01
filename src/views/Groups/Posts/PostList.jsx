import React, { Component } from 'react';
import { Row, Col, Image } from 'react-bootstrap';
import Card from '../../../components/Card/Card';
import {Link} from 'react-router-dom';
import anexoTeste from '../../../img/anexoTeste.JPG';

const imgStyle = {
   float: 'right',
   marginRight: '55px',
};

export default class PostList extends React.Component{
        
    data(date){
    console.log(date);

    let dateString = date;
    let dateParts = dateString.split("-");

    return dateParts[2] +"/"+ dateParts[1] +"/"+ dateParts[0];
    }


   render() {
       
       if (!this.props.posts.content) {

           return <div>Não há posts disponíveis!</div>;

       }else{

           return <Row>
                     
               <Col md={12}>
               {this.props.posts.content.map((post) => {

                   return <Card
                       title={post.titulo}
                       ctAllGroups
                       content={
                           <Row>
                       
                               <Col lg={12} md={12} sm={12} xs={12}>

                                   <div style={imgStyle}>
                                       <Image src={anexoTeste} responsive/>
                                       <p style={{textAling:'center'}}>{post.anexoPost.nomeAnexo}</p>
                                   </div>

                                   <h5>Por {post.autorPost.nome}, {this.data(post.dataPostagem)}.</h5>
                                   <p>{post.texto}</p> 


                               </Col>
                       
                           </Row>

                       }
                   />
               })}
               </Col>
           </Row>
       }

   }


}