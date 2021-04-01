import React, { Fragment } from 'react'

import { protectAuth } from '../../../utils/auth/auth'

import Cookies from 'js-cookie'

import { connect } from 'react-redux'
import { delete_comment_replies,
         add_username,
         add_parent } from '../../../action/comment'

import {AvatarProfil} from '../../../utils/auth/profilPicture'

const Childcomment = ({parent,user,nickname,time,profil,content,id,delete_comment_replies,add_parent,add_username}) => {
    
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
            <Fragment>
                    <div className="col s3">
                        <img
                            src={AvatarProfil(profil)}
                            alt="profil muuu"
                            width="36"
                            height="36"
                            style={{borderRadius:'50%'}}
                        />
                    </div>
                    <div className="col s8" style={{paddingTop:10}}>
                        <b>{nickname}</b> {content}
                        <div className='col s12 reply'>
                            <div className="col s4" style={{paddingLeft:0}}>
                                {time.substring(0,6)}
                            </div>
                            <div className="col s6">
                                <span style={{cursor: "pointer",marginLeft:'10px',marginBottom:'10px'}} onClick={() => handleReplies(nickname)}>Reply</span> 
                            </div>
                        </div>
                    </div>
            </Fragment>
        )     
    }else{
        return (
            <Fragment>
            <div className="col s3">
                        <img
                            src={AvatarProfil(profil)}
                            alt="profil muuu"
                            width="36"
                            height="36"
                            style={{borderRadius:'50%'}}
                        />
                    </div>
                    <div className="col s8" style={{paddingTop:10}}>
                        <b>{nickname}</b> {content}
                        <div className='col s12 reply'>
                            <div className="col s4" style={{paddingLeft:0}}>
                                {time.substring(0,6)}
                            </div>
                            <div className="col s6">
                                <span style={{cursor: "pointer",marginLeft:'10px',marginBottom:'10px'}} onClick={() => handleReplies(nickname)}>Reply</span> 
                            </div>
                        </div>
                    </div>
        </Fragment>
    )}
}



const mapStateToProps = state => {
    return {
        replies_comment : state.comment.replies,
    }
}
export default connect(mapStateToProps,{delete_comment_replies, add_username,add_parent})(Childcomment)
