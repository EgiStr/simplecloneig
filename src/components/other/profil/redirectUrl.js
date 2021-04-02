import React from 'react'
import {useHistory} from 'react-router-dom'


export const redirectUrl = ({nickname}) => {
    const history = useHistory()
    
    const handleProfilRedirect = Userid => history.push(`/profile/${Userid}`)
   
    return <p style={{ cursor:'pointer' }} onClick={()=> {handleProfilRedirect(nickname)}}><b>{nickname}</b></p>
    
}

export default redirectUrl
