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
    console.log(this.props.posts);
       if (this.props.posts.content !== undefined) {
     
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
                                       {(post.anexoPost)?<Image src={anexoTeste} responsive width={30} />:""}
                                       {/*<p style={{textAling:'center'}}>{post.anexoPost.nomeAnexo}</p>*/}
                                   </div>

                                   <p className="h5">{post.texto}</p> 

                                   <small>Por {post.autorPost.nome}, {this.data(post.dataPostagem)}.</small>                                   


                               </Col>
                       
                           </Row>

                       }
                       
                       
                   />
               })}
               </Col>
           </Row>

       }else{

            return <div></div>


       }

   }


}