import React from 'react'

import { protectAuth } from '../../../utils/auth/auth'

import Cookies from 'js-cookie'

import { connect } from 'react-redux'
import { delete_comment_replies,
         add_username,
         add_parent } from '../../../action/comment'



const Childcomment = ({parent,user,nickname,profil,content,id,delete_comment_replies,add_parent,add_username}) => {
    
    const handleRemove = id => {
        protectAuth(Cookies.get('access'),Cookies.get('refresh')).then(e => e ? '' : '')
        delete_comment_replies(id,Cookies.get('access'))
    }
    
    const handleReplies = (user_username) => {
        add_parent(parent)
        add_username(user_username)
    }
  
    
    if(user){
        return (
            <ul className="collection">
                <li key={Math.floor(Math.random() * Math.floor(Math.random() * Date.now()))} className="collection-item avatar">                                       
                    <img src={`http://127.0.0.1:8000${profil}`} className="circle" alt="...."/>
                    <span className="title">{nickname}</span>
                    <p>{content}</p>
                    <a className="secondary-content btn" onClick={ () => handleReplies(nickname) }><i className="material-icons">send</i></a>
                    <a className="secondary-content btn" onClick={ () => handleRemove(id) } ><i className="material-icons">delete</i></a>
                    

                </li>
            </ul>
        )     
    }else{
        return (
            <ul className="collection">
                <li key={Math.floor(Math.random() * Math.floor(Math.random() * Date.now()))} className="collection-item avatar">                                       
                    <img src={`http://127.0.0.1:8000${profil}`} className="circle" alt="...."/>
                    <span className="title">{nickname}</span>
                    <p>{content}</p>
                    <a className="secondary-content btn" onClick={()=>{ handleReplies(nickname) }}><i className="material-icons">send</i></a>
                   
                </li>    
            </ul>
    )}
}



const mapStateToProps = state => {
    return {
        replies_comment : state.comment.replies,
    }
}
export default connect(mapStateToProps,{delete_comment_replies, add_username,add_parent})(Childcomment)
