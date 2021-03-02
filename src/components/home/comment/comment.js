import React, {useState} from 'react'

import { protectAuth } from '../../auth/auth'

import Cookies from 'js-cookie'

import Childcomment from './comments'

import { 
    delete_comment,
    get_replies,
    add_parent
} from '../../../action/comment'

import { connect } from 'react-redux'



const CommentUser = ({user,profil,nickname,content,id,replies,add_parent,delete_comment,get_replies,replies_comment}) => {
 
    const [limit,setLimit] = useState(2)
    // const [hide,setHide] = useState(false)


    const handleRemove = id => {
        protectAuth(Cookies.get('access'),Cookies.get('refresh')).then(e => e ? '' : '')
        delete_comment(id,Cookies.get('access'))
    }

    const handleReplies = (parent_id) => add_parent(parent_id)
    
    const handleHide = () => setLimit(0)
    
    let child = replies_comment ? replies_comment[0] : null
    let child4 = replies_comment ? replies_comment : null
    let child2 = child ? child.parent : null 
    let child3 = child ? child4 : null 
    let child5 = child ? (child4.length - limit)  : null 
    
    
    const hadleGetreplies = (id) => {
        get_replies(id)
        if(replies_comment.length === 0){
            setLimit(prev => prev)
        }
        setLimit(prev => prev + 2)
    }

    const renderReplies = () => {
        
        return child3.slice(0,limit).map((e,i)=>{
            
            return  <Childcomment
                    key={i}
                    nickname = {e.user.nickname}
                    profil = {e.user.profil}
                    content = {e.content}
                    id    = {e.id}
                    user = {user}                                     
                    /> 
        })}

// mengekstrak replies
    if(user){
        return (
            <ul className="collection">
                <li key={Math.floor(Math.random() * Math.floor(Math.random() * Date.now()))} className="collection-item avatar">                                       
                    <img loading='lazy' src={`http://127.0.0.1:8000${profil}`} className="circle" alt="...."/>
                    <span className="title">{nickname}</span>
                    <p>{content}</p>
                    <a className="btn" onClick={()=>{handleRemove(id)}}><i className="material-icons">send</i></a>
                    <a className="secondary-content btn" onClick={()=>{handleReplies(id)}}><i className="material-icons">send</i></a>
                   
                    {/* agar membuat hanya di itu sendiri replies dimuat  */}
                    {child2 === id ? renderReplies(): ('')}      
                   
                    {/* membuat beberapa kemungkinan diReplies */}
                    {
                            (function(){
                                if(replies.length > 0){
                                    if(child5 > 0 && child2 === id){
                                       return <p onClick={() => hadleGetreplies(id)}>view replies {child5 } </p>
                                        
                                    }else if(child5 === 0 || child5 < 0){
                                        return <p onClick={()=> handleHide()}>Hide replies</p>
                                    }else{                            
                                        return <p onClick={() => hadleGetreplies(id)}>view replies {replies.length} </p>
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
                    {child2 === id ? (
                        renderReplies()
                        
                        ) : ('')}      
                    {
                        
                            (function(){
                                if(replies.length > 0){
                                    if(child5 > 0 && child2 === id){
                                       return <p onClick={() => hadleGetreplies(id)}>view replies {child5 } </p>
                                        
                                    }else if(child5 === 0 || child5 < 0){
                                        return <p onClick={()=> handleHide()}>Hide replies</p>
                                    }else{                            
                                        return <p onClick={() => hadleGetreplies(id)}>view replies {replies.length} </p>
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
        replies_comment : state.comment.replies,
    }
}
export default connect(mapStateToProps,{add_parent,delete_comment,get_replies})(CommentUser)
