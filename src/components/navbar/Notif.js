import { Avatar } from '@material-ui/core'
import React from 'react'
import '../../notif.css'

const Notif = ({post,sender,text,type}) => {
    return (
        <div className="notif">
            <div className="notif-profile">
                <Avatar
                            className="avatar"
                            alt="foto"
                            src={'http://127.0.0.1:8000'+sender.profil}
                            width={30}
                            height={30}
                           
                        />
                <div className="notif-txt" ><b>{sender.nikcname} </b>{text}<span>2H</span></div>
            </div>
            {type === 2 ? (
                <button className="follow">Follow</button>
                ) : (
                <img
                            className="follow"
                            alt="foto"
                            src={'http://127.0.0.1:8000'+post.post}
                            width={40}
                            height={40}
                        />
            )}
        </div>
    )
}

export default Notif
