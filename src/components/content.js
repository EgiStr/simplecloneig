import React from 'react'
import "../content.css";
import Avatar from "@material-ui/core/Avatar";
function Content({ username, captions, imageUrl, avatar }) {
    return (
        <div className="row">
            <div className="col s8" style={{ backgroundColor: "white" }} >
                <div className="head">
                    <Avatar
                        className="avatar"
                        alt="foto"
                        src={avatar}
                    />
                    <h6>{username}</h6>
                </div>
                <img className="contentImage" src={imageUrl} alt="foto" />
                <div className="ml 5">      
                    <i className="small material-icons">favorite</i>
                    <i className="small material-icons">comment</i>
                    <i className="small material-icons">near_me</i>
                </div>
                <h6 className="caption"><b>{username}</b> {captions}</h6>
            </div>
            <div>
                
            </div>
        </div>
    )
}

export default Content

