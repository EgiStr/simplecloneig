import React, { useEffect } from 'react'

import { protectAuth } from '../../auth/auth'

import Cookies from 'js-cookie'

import { connect } from 'react-redux'
import { delete_comment_replies } from '../../../action/comment'



const Childcomment = ({user,nickname,profil,content,id,delete_comment_replies}) => {
  
    useEffect( () => {
     protectAuth(Cookies.get('access'),Cookies.get('refresh')).then(e => e ? '' : window.location.reload())   
    },[])

    const handleRemove = id =>  delete_comment_replies(id,Cookies.get('access'))
  
    
    if(user){
        return (
            <ul className="collection">
                <li key={Math.floor(Math.random() * Math.floor(Math.random() * Date.now()))} className="collection-item avatar">                                       
                    <img loading='lazy' src={`http://127.0.0.1:8000${profil}`} className="circle" alt="...."/>
                    <span className="title">{nickname}</span>
                    <p>{content}</p>
                    <a className="secondary-content btn" onClick={()=>{handleRemove(id)}}><i className="material-icons">send</i></a>
                    

                </li>
            </ul>
        )     
    }else{
        return (
            <ul className="collection">
                <li key={Math.floor(Math.random() * Math.floor(Math.random() * Date.now()))} className="collection-item avatar">                                       
                    <img loading='lazy' src={`http://127.0.0.1:8000${profil}`} className="circle" alt="...."/>
                    <span className="title">{nickname}</span>
                    <p>{content}</p>
                </li>    
            </ul>
    )}
}



const mapStateToProps = state => {
    return {
        replies_comment : state.comment.replies,
    }
}
export default connect(mapStateToProps,{delete_comment_replies})(Childcomment)
