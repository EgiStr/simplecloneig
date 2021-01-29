import React from 'react'
import "../content.css";
import Avatar from "@material-ui/core/Avatar";

function Content({ username, captions, imageUrl }) {
    return (

        <div className="content container"> 
            <div className="head">
                <Avatar
                    className="avatar"
                    alt="hasyim"
                    src="https://lh3.googleusercontent.com/2Fz6Fn5zq_hh75oNLsyNqyGSHzPopHojN77Eu6GImw_3bb4JteONR_K8lnCY2nRbZQV9RD7ACVYvTHEEoW6oGt2GNkAVXzsGdHl1XI9JWwr9ojo3N7t5mYgqaux8lESdvi4mJTti4Ok=w400"
                />
                <h6>{username}</h6>
            </div>
            <img className="contentImage" src="https://lh3.googleusercontent.com/2Fz6Fn5zq_hh75oNLsyNqyGSHzPopHojN77Eu6GImw_3bb4JteONR_K8lnCY2nRbZQV9RD7ACVYvTHEEoW6oGt2GNkAVXzsGdHl1XI9JWwr9ojo3N7t5mYgqaux8lESdvi4mJTti4Ok=w400" />
            <h6 className="caption"><b>{username}</b> {captions}</h6>
        </div>
    )
}   

export default Content

