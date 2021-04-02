import React,{ useState } from 'react'
import axios from '../../utils/axios'
import Loading from '../other/loading'
import {useHistory} from 'react-router-dom'

const passwordNew = () => {
    const history = useHistory()
    const [state,setState] = useState({
        token:'',
        password:''
    })
    const [respone,setRespone] = useState(null)
    const [loading,setLoading] = useState(false)

    const handleChange = e => {
        const {name,value} = e.target
        setState(prev => ({
            ...prev,
            [name]:value
        }))
    }

    const handleSubmit = () => {
        delete axios.defaults.headers.common["Authorization"];
        setLoading(true)
        const {token,password} = state
        const data = {
            token:token,
            password:password,
        }
        axios.post(`auth/password_reset/`,data)
            .then(res => {
                setLoading(false)
                history.push('/login')
            })
            .catch(e => {
                setRespone(`${e.request.statusText} password or token invalid !`)
                setLoading(false)
            })
    }

    return (
        <div>
            <div className="container_login">
                <div className="box_login">
                    <h5>RESET PASSWORD</h5>
                    {loading && <Loading />}
                    {respone && <p className="message-login">{respone}</p>}
                
                <div className="input-field">
                    <input 
                        id="icon_prefix2" 
                        type="text" 
                        className="validate" 
                        name='token' 
                        onChange={ e => handleChange(e)} 
                    />
                    <label htmlFor="icon_prefix2">Token key</label>
                </div>
                <div className="input-field">
                    <input 
                        id="icon_prefix" 
                        type="password" 
                        className="validate" 
                        name='password' 
                        onChange={ e => handleChange(e)} 
                    />
                    <label htmlFor="icon_prefix">New Password</label>
                </div>
                <button
                    className="btn waves-effect waves-light"
                    type="submit"
                    onClick={() => handleSubmit()}
                    >
                    Submit
                    <i className="material-icons right">send</i>
                </button>
                </div>
            </div>
        </div>
    )
}

export default passwordNew ;
