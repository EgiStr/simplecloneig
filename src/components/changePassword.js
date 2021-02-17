import React,{useState,useEffect} from 'react'
import Avatar from '@material-ui/core/Avatar'
import { Container } from '@material-ui/core'
import axios from 'axios' ;
import Cookies from 'js-cookie'
import {protectAuth} from './auth'

import '../Password.css'


axios.defaults.headers.common['Authorization'] = 'Bearer ' + Cookies.get('access')

function changePassword() {
    const [access] = useState(Cookies.get('access'))
    const [refresh] = useState(Cookies.get('refresh'))
    const [state,setState] = useState({
        oldpassword:'',
        newPassword:'',
        newPassword2:'',
    })

    const handleChange = (e) => {
        const {id , value} = e.target   
        setState(prevState => ({
            ...prevState,
            [id] : value
        }))
    }
    const {oldpassword,newPassword,newPassword2} = state
    const [error,setError] = useState(false)
    const [respone,setRespone] = useState('')



    
    useEffect(()=> {
      
        protectAuth(access,refresh).then(e => e ? '' : window.location.reload() )    

    },[])


    const handleSubmit = () => {
        let formData = new FormData() ;
        formData.append('old_password',oldpassword)
        formData.append('new_password',newPassword)
        formData.append('new_password2',newPassword2)
        axios.put('http://127.0.0.1:8000/auth/password/change/',formData,
        {headers: {'Authorization' : 'Bearer ' + access}})
        .then( res => {
            setError(false)
            setRespone('success')})
        .catch(e => {
            setRespone(e.request.response)
            setError(true)})
    }
        
   
    
    return (
        <div className="col s9" style={{padding:"40px"}}>
            <Container>
                <div className="head_edit">
                    <Avatar
                        alt="foto"
                    />
                    <div className="edit_right" >
                        <p style={{marginTop:"5px"}}>username</p>
                    </div>
                </div>
                <div className="input-password">
                    <label>Old Password</label>
                    <input
                        type="password"
                        id="oldpassword"
                        value={oldpassword}
                        onChange={(event) => handleChange(event)}
                        className="browser-default rf"
                        />
                </div>
                <div className="input-password">
                    <label>New Password</label>
                    <input
                        type="password"
                        id="newPassword"
                        value={newPassword}
                        // onChange={(event) => newPasswordChange(event)}
                        onChange={(event) => handleChange(event)}
                        className="browser-default rf"
                        />
                </div>
                <div className="input-password">
                    <label>Confirm New Password</label>
                    <input
                        type="password"
                        id="newPassword2"
                        value={newPassword2}
                        onChange={(event) => handleChange(event)}
                        className="browser-default rf"
                        />
                </div>
                <div className="input-password">
                    <a>Forgot Password?</a>
                    <button onClick={()=> handleSubmit()} className="btn btn-primary">change Password</button>
                </div>
                {respone !== '' ? respone : ''}
                {error && 'password anda tidak sama'}
            </Container>
        </div>
    )
}

export default changePassword;
