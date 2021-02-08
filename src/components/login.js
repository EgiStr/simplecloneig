
import React, {Component,} from 'react';
import { Redirect } from 'react-router-dom'
import axios from 'axios';
class Login extends Component {
    constructor(props){

        super(props)
        this.state = {
            title: '',
            email : '',
            password : '',
            password2 : '',
            notValide:false,
            redirect: false,
        }
        this.handlePasswordChange = this.handlePasswordChange.bind(this)
        this.handleTitleChange = this.handleTitleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleValidatePassword = this.handleValidatePassword.bind(this)
    }   

    componentDidMount(){

        this.setState({redirect:false})

    }

    handleSubmit(e){
        e.preventDefault()
        axios.post(`http://127.0.0.1:8000/auth/login/`,
        {   username:this.state.title,
            password:this.state.password,
            // password2:this.state.password2,
            // email:'egicuco50@gmail.com',
        })

        .then(res => {
            
            localStorage.setItem('token',res.data.access)
            this.setState({redirect:true})
        })
        .catch( e => console.log(e))
        
       
    }

    handleTitleChange(event){
        let input = event.target.value;
        this.setState(
            {
                title: input,
            }
        )
    }

    handlePasswordChange(event){
        this.setState(
            {
                password:event.target.value
            }
        )
    }
    handleValidatePassword(event){
        let password2 = event.target.value ; 
        
        this.setState({
            password2:password2,
            notValide:password2 !== this.state.password,
        })
    }

    render(){
        if(this.state.redirect){
            return <Redirect to='/' />
        }
        let content = ``
        if(this.state.notValide){
            content = `<div> password anda tidak macth</div>`
        }
        
        return (
            <div className="container">
               
                <input
                    value={this.state.title}
                    onChange={(event) => {this.handleTitleChange(event)}}
                    placeholder='What username ? ....'
                />
                
                <input
                    type='password'
                    value={this.state.password}
                    onChange={(event) => {this.handlePasswordChange(event)}}
                    placeholder='What password ? ....'
                />
                <button className="btn waves-effect waves-light" type="submit" onClick={this.handleSubmit}>Submit
                    <i className="material-icons right">send</i>
                </button>
                You dont have account? <a href="/register">sign up</a>   

                {content}
            </div>
        )
    }

}

export default Login;
