import React, { Component } from "react";

import { Redirect,Link } from "react-router-dom";

import { connect } from 'react-redux'

import { loginUser, get_post_like,get_post_save } from '../../action/auth'
import { getFollower } from '../../action/follow'
import { get_notif_login, } from '../../action/notifikasi'

import FacebookLogin from 'react-facebook-login';
import { GoogleLogin } from 'react-google-login';

import axios from ".././../utils/axios";
import Loading from '../other/loading'
import Cookies from 'js-cookie'

import '../../login.css'


class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      password: "",
      notValide: false,
      loading: false,
    };
    delete axios.defaults.headers.common["Authorization"];
  }

  handleSubmit = e => {
    e.preventDefault();
    const data = {
      grant_type : 'password',
      client_id: 'qDqQ2k5cz2HNaHsuyZC4JPwRRHxPOm2PJUoSXeTJ',
      client_secret : '6Xb1TvCPLJRmKsrQ4XhGg0uPnwLSvwmJ96DZiUKyG1pB87I6YfkJYhyDycl4vX6EBWCG4lFeDcuHecSGboz6gckgo3RWwSSj0xaBdnvwUwLWUYZOO1HBVdLSOsBrIcVe',
      username : this.state.title, 
      password: this.state.password,
    }

    this.setState({loading:true})
    axios.post('auth/token/',data)
      .then((res) => {
        Cookies.set('access', res.data.access_token)
        Cookies.set('refresh', res.data.refresh_token)
        this.props.get_post_like()  
        this.props.get_post_save()
        this.props.get_notif_login()
        this.props.getFollower(res.data.access_token)
        this.props.loginUser(res.data.access_token)
        this.setState({loading:false})
        
      })
      .catch((e) => this.setState({ notValide: true,loading:false }));
    }
    
  responseCallbackGoogle = response => {
    const data = {
      client_id: 'GXAKvHOF27PXTF4qzLHiFTL9MdKrv5wfEHiqpnYr',                   
      client_secret: 'BMN5fi1R9yNcmTYO53bAPeODNlu3xQK8QTpl8MxKjf7odJn7hvITOFW8B1jR0yHH6wHP11Ifpj0s1YLlutkyTs2p8rXuMTbKamr2LSHoan4jxUFkPFz70l8sE4cAlS6b',
      grant_type:'convert_token',
      backend : 'google-oauth2',
      token:response.accessToken
    }
    this.setState({loading:true})
    
    axios.post(`auth/convert-token/`, data)
    .then((res) => {
      Cookies.set('access', res.data.access_token)
      Cookies.set('refresh', res.data.refresh_token)
      this.props.get_post_like()
      this.props.get_post_save()
      this.props.getFollower(res.data.access_token)
      this.props.get_notif_login()
      this.props.loginUser(res.data.access_token)
      this.setState({loading:false})
      
    })
      .catch((e) => this.setState({notValide:true,loading:false}));
  }
    
  responseCallbackFacebook = response => {

    const data = {
      client_id: 'M2jCI0zmsBQAhJJGWl1FHZIRcCor3y7zFVibFjgj',                   
      client_secret: '3QVb9j86NnCrhAoZsnALFjY3hNg25a7zGgdeFVH6Q88zew2iTv3QHg1ZgW5Xw2Ef0BwdKEgz6T6gbJqBJ9NQuO88Y6ZPN8bxHNf76z7VTx4B1sPOATSqV541cgxNUMEe',
      grant_type:'convert_token',
      backend : 'facebook',
      token:response.accessToken
    }
    this.setState({loading:true})
    
    axios.post(`auth/convert-token/`, data)
      .then((res) => {
        Cookies.set('access', res.data.access_token)
        Cookies.set('refresh', res.data.refresh_token)
        this.props.get_post_like()
        this.props.get_post_save()
        this.props.getFollower(res.data.access_token)
        this.props.get_notif_login()
        this.props.loginUser(res.data.access_token)
        this.setState({loading:false})
        
      })
      .catch((e) => this.setState({notValide:true,loading:false}));
  }
  
  handleTitleChange = event => this.setState({ title: event.target.value })
  handlePasswordChange = event => this.setState({ password: event.target.value })
  handleValidatePassword = event => this.setState({ password2: event.target.value, notValide: event.target.value !== this.state.password });


  render() {
    if (this.props.user !== null) return <Redirect to="/" />

    return (

      <div className="container_login">
        <div className="box_login">
          <h5>Sign in</h5>
          {this.state.loading && <Loading /> }
          {this.state.notValide && <p className="message-login">Password or Username Not Valid</p>}
          <div className="input-field">
            <i className="material-icons prefix">person</i>
            <input
              type="text"
              value={this.state.title}
              onChange={this.handleTitleChange}
              placeholder="What password ? ...."
            />

          </div>
          <div className="input-field">
            <i className="material-icons prefix">https</i>
            <input
              type="password"
              value={this.state.password}
              onChange={this.handlePasswordChange}
              placeholder="What password ? ...."
              id="icon_prefix"
            />
          </div>
          <button
            className="btn waves-effect waves-light"
            type="submit"
            onClick={this.handleSubmit}
          >
            Submit
          <i className="material-icons right">send</i>
          </button>
          <div className="line"><span>OR</span></div>
         
          <div className="icon_box">
            <div className="icon_field">
            <FacebookLogin
              appId="800571104144427"
              autoLoad={false}
              fields="name,email"
              callback={this.responseCallbackFacebook} 
            />         
            </div>
            <div className="icon_field">
              <GoogleLogin
                clientId="853564458690-kj782663d50bbft782m1na2s9hks69gi.apps.googleusercontent.com"
                buttonText="Login"
                onSuccess={this.responseCallbackGoogle}
              />,
            </div>
          </div>
          <div>You dont have account? <a href="/register">sign up</a></div>
          <br></br>
          <Link to={"/forget-password"}> Forget-password ?</Link>
        </div>
      </div>
    );
  }
}


const mapStateToProps = state => {
  return {user : state.auth.user}
}

export default connect(mapStateToProps, { loginUser, get_post_like, get_notif_login,getFollower,get_post_save  })(Login);
