import React, { useState,lazy,Suspense,Fragment } from 'react'


import Loading from '../../other/loading'
import { 
    delete_comment,
    add_username,
    add_parent
    } from '../../../action/comment'

import { connect } from 'react-redux'

import {AvatarProfil} from '../../../utils/auth/profil'
import CommentMore from '../../other/comment/commentedit'

const Childcomment = lazy(() => import('./comments'))

const CommentUser = ({user_id,user,time,profil,nickname,content,id,replies,add_parent,add_username}) => {
 
    const [limit,setLimit] = useState(0)
    
    let child = replies.length !== 0 ? (replies.length - limit)  : null 
 
   
    const handleReplies = (parent_id,user_username) => {
        add_parent(parent_id)
        add_username(user_username)
    }
    
    // mengekstrak replies
    const renderReplies = () => {
            return replies.slice(0,limit).map((e,i)=>{
                console.log(e)
                return   <Suspense key={i} fallback={<Loading />}>
                            <Childcomment   
                                key={i}
                                parent = {id}
                                id_user={e.user.id}
                                nickname = {e.user.nickname}
                                time = {e.timestamp}
                                profil = {e.user.profil}
                                content = {e.content}
                                id    = {e.id}
                                user = {user_id === e.user.id}                                     
                            /> 
                        </Suspense>
            })
    }

    if(user){
        return (
            <Fragment>
                <li className="comment-user">
                    <div className="col s3">
                        <img
                            src={AvatarProfil(profil)}
                            alt="profil muuu"
                            width="45"
                            height="45"
                            style={{borderRadius:'50%'}}
                        />
                    </div>
                    <div className="col s7 comment-content" style={{paddingTop:10}}>
                        <b>{nickname}</b> {content}
                        <div className='col s12 reply'>
                            <div className="col s4" style={{fontStyle:'italic',fontSize:12,color:'rgb(138, 130, 129)',paddingLeft:0}} >
                                {time.substring(0,6)}
                            </div>
                            <div className="col s4">
                                <span style={{cursor: "pointer"}} onClick={() => handleReplies(id,nickname)}>Reply</span> 
                            </div>
                        </div>
                        <div className="col s12 replies" style={{margin:'10px auto'}}>
                          {/* agar membuat hanya di itu sendiri replies dimuat  */}
                        {/* membuat beberapa kemungkinan diReplies */}
                        {
                                (function(){
                                    if(replies.length > 0){
                                        if(limit <= 0) {
                                            return <p style={{cursor: "pointer",margin:'10px 0'}} onClick={() => setLimit(prev => prev + 2)}>View replies {replies.length} </p>
                                        }else{
                                            if(child > 0){
                                                return <p style={{cursor: "pointer",margin:'10px 0'}} onClick={() => setLimit(prev => prev + 2)}>View replies {child} </p>
                                            }else if(child === 0 || child < 0){
                                                return <p style={{cursor: "pointer",margin:'10px 0'}} onClick={()=> setLimit(0)}>Hide replies</p>
                                            }
                                        }
                                    }
                                })()
                        }
                        {renderReplies()}      
                        
                        
                        </div>
                    </div>
                    <div className='col s1 more-edit' >
                             <CommentMore id={id} type={true} />   
                    </div>
                </li>
            </Fragment>
           
        )     
    }else{
        return (
            <Fragment>
            <li className="comment-user">
                    <div className="col s3">
                        <img
                            src={AvatarProfil(profil)}
                            alt="profil muuu"
                            width="45"
                            height="45"
                            style={{borderRadius:'50%'}}
                        />
                    </div>
                    <div className="col s8" style={{paddingTop:10}}>
                        <b>{nickname}</b> {content}
                        <div className='col s12 reply'>
                            <div className="col s4" style={{fontStyle:'italic',fontSize:12,color:'rgb(138, 130, 129)',paddingLeft:0}} >
                                {time.substring(0,6)}
                            </div>
                            <div className="col s4">
                                <span style={{cursor: "pointer"}} onClick={() => handleReplies(id,nickname)}>Reply</span> 
                            </div>
                        </div>
                        <div className="col s12 replies" style={{margin:'10px auto'}}>
                          {/* agar membuat hanya di itu sendiri replies dimuat  */}
                        
                        
                        {/* membuat beberapa kemungkinan diReplies */}
                        {
                                (function(){
                                    if(replies.length > 0){
                                        if(limit <= 0) {
                                            return <p style={{cursor: "pointer",margin:'10px 0'}} onClick={() => setLimit(prev => prev + 2)}>View replies {replies.length} </p>
                                        }else{
                                            if(child > 0){
                                                return <p style={{cursor: "pointer",margin:'10px 0'}} onClick={() => setLimit(prev => prev + 2)}>View replies {child} </p>
                                            }else if(child === 0 || child < 0){
                                                return <p style={{cursor: "pointer",margin:'10px 0'}} onClick={()=> setLimit(0)}>Hide replies</p>
                                            }
                                        }
                                    }
                                })()
                            }
                            {renderReplies()}      
                        </div>
                    </div>
                    {user_id === user.id ?
                    <div className='col s1 more-edit'>
                             <CommentMore id={id} type={true} />   
                    </div> : null}
                    
                </li>
        </Fragment>
    )}
}



const mapStateToProps = state => {
    return {
        user_id : state.auth.user.user_id,
    }
}
export default connect(mapStateToProps,{add_parent,delete_comment,add_username})(CommentUser)
