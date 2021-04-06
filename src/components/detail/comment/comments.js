import React, { Fragment } from 'react'

import { connect } from 'react-redux'

import { add_username,
         add_parent } from '../../../action/comment'

import CommentMore from '../../other/comment/commentedit'

import { useHistory } from 'react-router-dom'
import { AvatarProfil } from '../../../utils/auth/profil'

const Childcomment = ({user_id,id_user,parent,user,nickname,time,profil,content,id,add_parent,add_username}) => {
    const history = useHistory()
    
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
                    <div className="col s7" style={{paddingTop:10}}>
                        <b style={{cursor: "pointer"}} onClick={() => history.push(`/profile/${nickname}`)}>{nickname}</b> {content}
                        <div className='col s12 reply'>
                            <div className="col s4" style={{fontStyle:'italic',fontSize:12,color:'rgb(138, 130, 129)',paddingLeft:0}}>
                                {time.substring(0,6)}
                            </div>
                            <div className="col s6">
                                <span style={{cursor: "pointer",marginLeft:'10px',marginBottom:'10px'}} onClick={() => handleReplies(nickname)}>Reply</span> 
                            </div>
                        </div>
                    </div>
                    {user_id === id_user ?
                    <div className='col s1 more-edit'>
                             <CommentMore id={id} type={false} />   
                    </div> : null}
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
                    <div className="col s7" style={{paddingTop:10}}>
                        <b style={{cursor: "pointer"}} onClick={() => history.push(`/profile/${nickname}`)}>{nickname}</b> {content}
                        <div className='col s12 reply'>
                            <div className="col s4" style={{fontStyle:'italic',fontSize:12,color:'rgb(138, 130, 129)',paddingLeft:0}}>
                                {time.substring(0,6)}
                            </div>
                            <div className="col s6">
                                <span style={{cursor: "pointer",marginLeft:'10px',marginBottom:'10px'}} onClick={() => handleReplies(nickname)}>Reply</span> 
                            </div>
                        </div>
                    </div>
                    {user_id === id_user ?
                    <div className='col s1 more-edit'>
                             <CommentMore id={id} type={false} />   
                    </div> : null}
        </Fragment>
    )}
}



const mapStateToProps = state => {
    return {
        user_id : state.auth.user.user_id,
    }
}
export default connect(mapStateToProps,{add_username,add_parent})(Childcomment)
