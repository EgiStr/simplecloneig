import React, {useEffect} from 'react'

import { protectAuth } from '../auth/auth'

import Cookies from 'js-cookie'
import { connect } from 'react-redux'
import Childcomment from './comments'
import { 
    delete_comment,
    get_replies,
    add_parent
} from '../../action/comment'



const CommentUser = ({user,profil,nickname,content,id,replies,add_parent,delete_comment,get_replies,replies_comment}) => {

    useEffect( () => {
        protectAuth(Cookies.get('access'),Cookies.get('refresh')).then(e => e ? '' : window.location.reload())   
    },[])

    const handleRemove = (id) => {
        delete_comment(id,Cookies.get('access'))
    }
    const handleReplies = (parent_id) => add_parent(parent_id)

    const hadleGetreplies = (id) => {
        get_replies(id)
    }
    let child = replies_comment ? replies_comment[0] : null
    let child4 = replies_comment ? replies_comment : null
    let child2 = child ? child.parent : null 
    let child3 = child ? child4 : null 
    console.log(child3)
    if(user){
        return (
            <ul className="collection">
                <li key={Math.floor(Math.random() * Math.floor(Math.random() * Date.now()))} className="collection-item avatar">                                       
                    <img loading='lazy' src={`http://127.0.0.1:8000${profil}`} className="circle" alt="...."/>
                    <span className="title">{nickname}</span>
                    <p>{content}</p>
                    <a className="btn" onClick={()=>{handleRemove(id)}}><i className="material-icons">send</i></a>
                    <a className="secondary-content btn" onClick={()=>{handleReplies(id)}}><i className="material-icons">send</i></a>
                    {replies.length > 0 ? (<p onClick={() => hadleGetreplies(id)}>view replies {replies.length} </p>) : ( null)}
                    {child2 === id ? (
                        
                        child3.map((e,i) => {
                            
                            return <Childcomment
                                    key={i}
                                    nickname = {e.user.nickname}
                                    profil = {e.user.profil}
                                    content = {e.content}
                                    id    = {e.id}
                                    user = {user}                                     
                                    /> 
                        })
                    ) : ('')}     
                    {/* {
                    (() => {
                        if (child2 === id) 
                        console.log('masuk dong')  
                        return ()
                        
                    })()
                    } */}
                   
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
                    {replies.length > 0 ? (<p onClick={() => hadleGetreplies(id)}>view replies {replies.length} </p>) : ( null)}
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
