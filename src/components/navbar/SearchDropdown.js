import React from 'react'
import {SearchUser} from './searchUser'

export const SearchDropdown = ({toggle}) => {
    const StyleDropdown = {
        position: "absolute",
        background: "white", 
        display: toggle ? 'block' : 'none', 
        marginTop: "65px", 
        boxShadow: " 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
        width: "40vw", 
        height: "50vh", 
        right: "130px", 
        color: "black", 
        borderRadius: "5px", 
        overflow: "auto",
        padding: "15px" 
    }
    return (
        <div>
        <li className="box-notif" style={StyleDropdown}>            
            <SearchUser />   
        </li>
            
        </div>
    )
}
