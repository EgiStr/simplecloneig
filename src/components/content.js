import React ,{Component,lazy,Suspense}from "react";
import Avatar from "@material-ui/core/Avatar";
import axios from 'axios'
import {parseJwt} from './Navbar'

import { InView } from 'react-intersection-observer'

import {Redirect} from 'react-router-dom'

import '../content.css'

const Modal = lazy(()=> import('./modal'))


class Content extends Component {
    constructor(props){
        super(props)
        this.state = {
            redirect:false,
            redirectUrl:'',
            likes : this.props.like,
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

    handleLikeButton(postId){

        const userId = parseJwt(localStorage.getItem('token')).user_id
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
            // jiga ga ada id berarti menghapus
            res.data.id === undefined ? this.setState({ likes : this.state.likes - 1}) : this.setState({ likes : this.state.likes+1})
            
            
            if(this.state.buttonClass === 'small material-icons icon'){
                this.setState({ buttonClass:'small material-icons icon red-text'})
            }else{
                this.setState({ buttonClass:'small material-icons icon'})
            }
            
        })
        .catch(e => {console.log(e.request)})
    }


    render(){
        
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
                {/* daerah loading lazy */}
            {({ inView, ref, entry }) => (
                <div ref={ref}>
                    {inView ? (this.preloadingImg(entry.target.firstChild)) : (null)}
                    <img loading="auto" src='data:image/jpeg;base64,/9j/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAJAA4DASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAABQT/xAAlEAABAgQEBwAAAAAAAAAAAAABAgMABAYRBRIhMRM0NXGBkbL/xAAVAQEBAAAAAAAAAAAAAAAAAAABA//EABoRAAICAwAAAAAAAAAAAAAAAAECABIDERP/2gAMAwEAAhEDEQA/AAaWpluWZM5OKYmV3HACX0hYJ1JIzaWNt/Rg+qMQcUzKsmWQXGhYvFGVat9DY7RHhvTF90fKoFq7nfAh57axkmKrjqBP/9k=' className="contentImage" data-src={this.props.imageUrl} alt="foto" />
                </div>
                )}
            </InView>

        <div className="icon__box">
           <p>{this.state.likes}</p><a onClick={()=>{this.handleLikeButton(this.props.postId)}}><i className={this.state.buttonClass}>favorite</i></a> 
        <div>
            <a className="modal-trigger" href={`#modal_id${this.props.id}`}><i className="small material-icons icon ">comment</i></a>
                <Suspense fallback={<div></div>}>
                    <Modal 
                        key ={this.props.id}
                        id = {this.props.id}
                        username = {this.props.username}
                        profil = {urlProfil}
                        contentType={this.props.contentType}
                        obj_id = {this.props.postId}
                        comments = {this.props.comment}
                    />
                </Suspense>
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
