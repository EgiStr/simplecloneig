import React,{ useState } from 'react'
import axios from '../../utils/axios'
import Loading from '../other/loading'
import {useHistory} from 'react-router-dom'
import { connect } from 'react-redux'

const passwordNew = props => {
    const history = useHistory()
    const [state,setState] = useState({
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
        const { password } = state
        const token = props.location.search.substring(1)
        
        const data = {
            token:token,
            password:password,
        }
        axios.post(`auth/password_reset/confirm/`,data)
            .then(res => {
                setLoading(false)
                props.dispatch({ type:'GET_SUCCESS_MASSAGE', payload: `Successfully Reset Password` })
                history.push('/login')
            })
            .catch(e => {
                props.dispatch({ type:'GET_SUCCESS_MASSAGE', payload: `failed Reset Password ,${e.request.response}` })
                setRespone(`${e.request.response} password Invalid invalid !`)
                console.log(e.request)
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

export default connect()(passwordNew) ;
