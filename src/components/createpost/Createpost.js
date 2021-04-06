import React,{Fragment} from 'react'

import { AvatarProfil } from '../../utils/auth/profil';
import Avatar from '../other/profil/avatarProfil';

import { connect } from 'react-redux'
import ModalPost from './modalPost';

import '../../assert/css/CreatePost.css'


export const uploadpost = (props) => {
   

    return (
        <Fragment>
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
            <div style={{ border: "1px solid gray", borderRadius: "10px", padding: "20px" }}>
                <div style={{ display: "flex", alignItems: "center" }}>
                    <Avatar 
                        src={AvatarProfil(props.user_id.profil)}
                        width={50}
                        height={50}
                    />
                    <a className="caption modal-trigger" href="#modalCreatePost" style={{ flex: "1", borderRadius: "50px", padding: "10px", marginLeft: "5px" }}>What Do You mind?</a>
                </div>
                <div className="divider" style={{ margin: "10px 0" }}></div>
                <div >
                    <a className="imageVid modal-trigger" href="#modalCreatePost" style={{ display: "flex", justifyContent: "center" }}>
                        <i className="material-icons" style={{ color: "#ee6e73" }}>image</i>
                        Foto
                    </a>
                </div>
            </div>
        <ModalPost />
        </div>
        </Fragment>
    )
}

const mapStateToProps = (state) => ({
    user_id : state.auth.user,
})

const mapDispatchToProps = {
    
}

export default connect(mapStateToProps, mapDispatchToProps)(uploadpost)
