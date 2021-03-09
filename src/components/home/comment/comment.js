import React, { useState } from 'react'

import { protectAuth } from '../../auth/auth'

import Cookies from 'js-cookie'

import Childcomment from './comments'

import { 
    delete_comment,
    add_username,
    add_parent
} from '../../../action/comment'

import { connect } from 'react-redux'



const CommentUser = ({user_id,user,profil,nickname,content,id,replies,add_parent,delete_comment,add_username}) => {
 
    const [limit,setLimit] = useState(0)
    
    let child = replies.length !== 0 ? (replies.length - limit)  : null 
    // const [hide,setHide] = useState(false)
 
    const handleRemove = id => {
        protectAuth(Cookies.get('access'),Cookies.get('refresh')).then(e => e ? '' : '')
        delete_comment(id,Cookies.get('access'))
    }
    const handleReplies = (parent_id,user_username) => {
        add_parent(parent_id)
        add_username(user_username)
    }

    
    
    const renderReplies = () => {
            return replies.slice(0,limit).map((e,i)=>{
    
                return  <Childcomment   
                        key={i}
                        nickname = {e.user.nickname}
                        profil = {e.user.profil}
                        content = {e.content}
                        id    = {e.id}
                        user = {user_id === e.user.id}                                     
                        /> 
            })
    
    }

// mengekstrak replies
    if(user){
        return (
            <ul className="collection">
                <li key={Math.floor(Math.random() * Math.floor(Math.random() * Date.now()))} className="collection-item avatar">                                       
                    <img loading='lazy' src={`http://127.0.0.1:8000${profil}`} className="circle" alt="...."/>
                    <span className="title">{nickname}</span>
                    <p>{content}</p>
                    <a className="btn" onClick={()=>{handleRemove(id)}}><i className="material-icons">send</i></a>
                    <a className="secondary-content btn" onClick={()=>{handleReplies(id,nickname)}}><i className="material-icons">send</i></a>
                    {/* agar membuat hanya di itu sendiri replies dimuat  */}
                    {renderReplies()}      
                   
                    {/* membuat beberapa kemungkinan diReplies */}
                    {
                            (function(){
                                if(replies.length > 0){
                                    if(limit <= 0) {
                                        return <p onClick={() => setLimit(prev => prev + 2)}>view replies {replies.length} </p>
                                    }else{
                                        if(child > 0){
                                            return <p onClick={() => setLimit(prev => prev + 2)}>view replies {child} </p>
                                        }else if(child === 0 || child < 0){
                                            return <p onClick={()=> setLimit(0)}>Hide replies</p>
                                        }
                                    }
                                }
                            })()
                    }

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
                    <a className="secondary-content btn" onClick={()=>{handleReplies(id)}}><i className="material-icons">send</i></a>
                    {/* sama kayak diatas */}
                    {renderReplies()}      
                    {
                        
                        (function(){
                            if(replies.length > 0){
                                if(limit <= 0) {
                                    return <p onClick={() => setLimit(prev => prev + 2)}>view replies {replies.length} </p>
                                }else{
                                    if(child > 0){
                                        return <p onClick={() => setLimit(prev => prev + 2)}>view replies {child} </p>
                                    }else if(child === 0 || child < 0){
                                        return <p onClick={()=> setLimit(0)}>Hide replies</p>
                                    }
                                }
                            }
                        })()
                    }      
                </li>    
            </ul>
    )}
}



const mapStateToProps = state => {
    return {
        user_id : state.auth.user.user_id,
    }
}
export default connect(mapStateToProps,{add_parent,delete_comment,add_username})(CommentUser)
