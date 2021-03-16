import React,{ useState } from 'react'
import axios from 'axios'
import Loading from '../other/loading'

const forgetPassword = () => {
    const [email,setEmail] = useState('')
    const [respone,setRespone] = useState(null)
    const [loading,setLoading] = useState(false)

    const handleChange = e => setEmail(e.target.value)

    const handleSubmit = () => {
        delete axios.defaults.headers.common["Authorization"];
        setLoading(true)
        const data = {
            email:email
        }
        axios.post(`http://127.0.0.1:8000/auth/password_reset/`,data)
            .then(res => {
                setLoading(false)
                setRespone(`${res.data.status} check your email from snapthina`)
            })
            .catch(e => {
                setRespone(`${e.request.statusText} input valid email !`)
                setLoading(false)
            })
    }

    return (
        <div>
            <div className="container_login">
                <div className="box_login">
                    <h5>Forget or reset password IgClone</h5>
                    {loading && <Loading />}
                    {respone && <p className="message-login">{respone}</p>}
                <div className="input-field">
                    <input 
                        id="icon_prefix" 
                        type="email" 
                        className="validate" 
                        name='email'
                        value={email}
                        onChange={ e => handleChange(e)} 
                    />
                    <label htmlFor="icon_prefix">Email</label>
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

export default forgetPassword ;
