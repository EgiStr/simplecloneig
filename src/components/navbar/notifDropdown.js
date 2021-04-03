import React from 'react'
import Notif from './Notif'




export const NotifDropdown = ({notif,toggle}) => {
    const StyleDropdown = {
        position: "absolute",
        background: "white", 
        display: toggle ? 'block': 'none', 
        marginTop: "65px", 
        boxShadow: " 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
        width: "40vw", 
        height: "50vh", 
        right: "15px", 
        color: "black", 
        borderRadius: "5px", 
        overflow: "auto",
        padding: "15px" 
    }
    return (
        <div>
        <li className="box-notif " style={StyleDropdown}>
            {notif.map((item,index) => {
  
                return (
                    <div key={index}>
                        <p style={{ lineHeight: "1.6" }}>{item.create_at}</p>
                        <Notif 
                            post ={item.post}
                            text ={item.more_text}
                            sender = {item.sender}
                            type = {item.type_notif}
                        />
                    </div>
                )
            })}
                        
            
        </li>
            
        </div>
    )
}
