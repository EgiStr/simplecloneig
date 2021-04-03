import React from 'react'


import M from "materialize-css";

import { connect } from 'react-redux'
import Follow from '../../other/profil/follow'
import { AvatarProfil } from '../../../utils/auth/profil';

const Following = ({user_id,user,modal}) => {

    const redirect = () => {
        var instance = M.Modal.getInstance(modal);
        instance.close();
        window.location =`/profile/${user.nickname}`
    }

    return (
        
        <li key={Math.floor(Math.random() * Math.floor(Math.random() * Date.now()))} className="collection-item avatar row">                                       
            <img loading='lazy' src={AvatarProfil(user.profil)} className="circle col s3" alt="...."/>
            <div className="col s5">
                <span style={{cursor: "pointer"}} className="title" onClick={() => redirect()}>{user.nickname}</span>
                <p>{user.name}</p>
            </div>
            <div className="col s4">
                {user.id === user_id ? '' : <Follow follow_id={user.id} className="btn_edit" />}
            </div>
        </li>
       
    )
}

const mapStateToProps = state => {
    return {
      user_id : state.auth.user.user_id,
    }
}

export default connect(mapStateToProps)(Following) ;