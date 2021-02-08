import React ,{Component}from "react";
import Avatar from "@material-ui/core/Avatar";
import axios from 'axios'

import { InView } from 'react-intersection-observer'
import Modal from './modal'
import {Redirect} from 'react-router-dom'

import "./../content.css";

class Content extends Component {
    constructor(props){
        super(props)

        this.state = {
            redirect:false,
            redirectUrl:'',
            comment :'',
            buttonClass:'small material-icons icon',
     
        }

        this.handleLikeButton = this.handleLikeButton.bind(this)
        
    }


    handleProfilRedirect(Userid){
        let url = `/profile/${Userid}`
        this.setState({
            redirect:true,
            redirectUrl:url,
           
        })
    }

    preloadingImg(img){
        const src = img.getAttribute('data-src')
        if(!src){
            return
        }
        img.src = src
    }

    handleLikeButton(userId,postId){

        axios({
            method:'post',
            url: 'http://127.0.0.1:8000/api/like/',
            data:{
                post:postId,
                user:userId
            },
            headers:{
                "Authorization": 'Bearer ' + localStorage.getItem('token')
            }
            
        })
        .then(res => {
            if(this.state.buttonClass === 'small material-icons icon'){
                this.setState({ buttonClass:'small material-icons icon red-text'})
            }else{
                this.setState({ buttonClass:'small material-icons icon'})
            }
            
        })
        .catch(e => {console.log(e)})
    }


    render(){
        console.log(this.props);
        if(this.state.redirect){
            const url = this.state.redirectUrl
            return <Redirect to={url} />
        }
        
        const urlProfil = `http://127.0.0.1:8000${this.props.avatar}`;

        return (

        
        <div className="box">
        <div className="head">
          <Avatar  className="avatar" alt="foto" src={urlProfil} />
          <h6 onClick={()=> {this.handleProfilRedirect(this.props.userId)}}>{this.props.username}</h6>
        </div>
        {/* membuat post image menjadi loading lazy alias diloading jika post an dilayar */}
            <InView>
            {({ inView, ref, entry }) => (
                <div ref={ref}>
                    {inView ? (this.preloadingImg(entry.target.firstChild)) : (null)}
                    <img loading="lazy" className="contentImage" data-src={this.props.imageUrl} alt="foto" />
                </div>
                )}
            </InView>
        <div className="icon__box">
           <p>{this.props.like}</p><a onClick={()=>{this.handleLikeButton(this.props.userId,this.props.postId)}}><i className={this.state.buttonClass}>favorite</i></a> 
        <div>
            <a className="modal-trigger" href={`#modal_id${this.props.id}`}><i className="small material-icons icon ">comment</i></a>
     
                <Modal 
                    key ={this.props.id}
                    id = {this.props.id}
                    username = {this.props.username}
                    profil = {urlProfil}
                    contentType={this.props.contentType}
                    obj_id = {this.props.postId}
                    comments = {this.props.comment}
                />
          </div>

          <i className="small material-icons icon ">near_me</i>
         
        </div>
        <h6 className="caption">
          <b>{this.props.username}</b> {this.props.captions}
        </h6>
      </div>
        )
    }
}


// function Content({ username, captions, imageUrl, avatar }) {
//   return (
      
//   );
// }

export default Content;
