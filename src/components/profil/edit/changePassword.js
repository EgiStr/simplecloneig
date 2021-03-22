import React,{ useState } from 'react'

import axios from 'axios' ;
import Cookies from 'js-cookie'

import {Link} from 'react-router-dom'

import { protectAuth } from '../../../utils/auth/auth'

import '../../../Password.css'


const changePassword = () => {
    const [access] = useState(Cookies.get('access'))
    const [refresh] = useState(Cookies.get('refresh'))
    const [respone,setRespone] = useState('')
    const [state,setState] = useState({
        oldpassword:'',
        newPassword:'',
        newPassword2:'',
    })
    const {oldpassword,newPassword,newPassword2} = state

    const handleChange = (e) => {
        const {id , value} = e.target   
        setState(prevState => ({
            ...prevState,
            [id] : value
        }))
    }
    
    const handleSubmit = () => {
        protectAuth(access,refresh).then(e => e ? '' : window.location.reload() )    
        const config = {headers: {'Authorization' : 'Bearer ' + access}}
        let formData = new FormData() ;
            formData.append('old_password',oldpassword)
            formData.append('new_password',newPassword)
            formData.append('new_password2',newPassword2)
        axios.put('http://127.0.0.1:8000/auth/password/change/',formData,config)
            .then( res => { 
                setState({
                    oldpassword:'',
                    newPassword:'',
                    newPassword2:'',
                })
                setRespone(res.data.message)})
            .catch(e => setRespone(e.request.response))
    }
        
   
    return (
        <div className="col s9">
            <div className="container row center-align" style={{padding:"50px",marginLeft:'20px'}}>
                <div className="input-password col l12">
                    <label>Old Password</label>
                    <input
                        type="password"
                        id="oldpassword"
                        value={oldpassword}
                        onChange={(event) => handleChange(event)}
                        className="browser-default rf"
                        />
                </div>
                <div className="input-password col l12">
                    <label>New Password</label>
                    <input
                        type="password"
                        id="newPassword"
                        value={newPassword}
                        onChange={(event) => handleChange(event)}
                        className="browser-default rf"
                        />
                </div>
                <div className="input-password col l12">
                    <label>Confirm New Password</label>
                    <input
                        type="password"
                        id="newPassword2"
                        value={newPassword2}
                        onChange={(event) => handleChange(event)}
                        className="browser-default rf"
                        />
                </div>
                <div className="input-password col l12">
                    <Link to={'/forget-password'}>Reset Password?</Link>
                    <button onClick={()=> handleSubmit()} className="btn btn-primary">change Password</button>
                </div>
                {respone && <p className="message-login center-align">{respone}</p>}
              
            </div>
        </div>
    )
}

export default changePassword;
