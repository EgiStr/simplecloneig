import { Avatar } from '@material-ui/core'
import React from 'react'
import '../../notif.css'

function Notif() {
    return (
        <div className="notif">
            <div className="notif-profile">
                <Avatar />
                <div className="notif-txt" ><b>username </b>started follow you.asdasdasdassadsaasas.asdsdaasasas. <span>2H</span></div>
            </div>
            <button className="follow">Follow</button>
        </div>
    )
}

export default Notif
