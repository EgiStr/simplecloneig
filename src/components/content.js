import React from 'react'
import "../Content.css";
import Avatar from "@material-ui/core/Avatar";
function Content({ username, captions, imageUrl, avatar }) {
    return (
            <div className="box">
                <div className="head">
                    <Avatar
                        className="avatar"
                        alt="foto"
                        src={avatar}
                    />
                    <h6>{username}</h6>
                </div>
                    <img className="contentImage" src={imageUrl} alt="foto" />
                <div className="icon__box">
                    <i className="small material-icons icon">favorite</i>
                    <i className="small material-icons icon">comment</i>
                    <i className="small material-icons icon ">near_me</i>
                </div>
                <h6 className="caption"><b>{username}</b> {captions}</h6>
            </div>
    )
}

export default Content

