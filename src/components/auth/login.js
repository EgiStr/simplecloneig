import React, { Component } from "react";

import { Redirect,Link } from "react-router-dom";

import { connect } from 'react-redux'

import { loginUser, get_post_like,get_post_save } from '../../action/auth'

import { getFollower } from '../../action/follow'
import { get_notif_login, } from '../../action/notifikasi'

import FacebookLogin from 'react-facebook-login'
import { GoogleLogin } from 'react-google-login';

import axios from ".././../utils/axios";
import Loading from '../other/loading'
import Cookies from 'js-cookie'

import '../../assert/css/login.css'


class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      password: "",
      notValide: false,
      loading: false,
    };
    
  }

  handleSubmit = e => {
    e.preventDefault();
    const data = {
      grant_type : 'password',
      client_id: <make client id ini admin panel in Django toolkit-application>',
      client_secret : <make client scret ini admin panel in Django toolkit-application>',
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
      client_id:<make client id ini admin panel in Django toolkit-application>' ,                   
      client_secret:<make client id ini admin panel in Django toolkit-application>' ,
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
      client_id:<make client id ini admin panel in Django toolkit-application>' ,                   
      client_secret:<make client id ini admin panel in Django toolkit-application>',
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

          <button className="btn waves-effect waves-light" type="submit" onClick={this.handleSubmit}> Submit <i className="material-icons right">send</i> </button>
          
          <div className="line"><span>OR</span></div>
         
          <div className="icon_box row">
            <div className="col s12">
            <FacebookLogin
              appId=<your app id>
              autoLoad={false}
              fields="name,email"
              size={'medium'}
              textButton={'Facebook'}
              callback={this.responseCallbackFacebook} 
            
            />         
            </div>
            <div className="col s12">
              <GoogleLogin
                clientId=<your app id>
                onSuccess={this.responseCallbackGoogle}
                size={'small'}
                buttonText={'Google'}
                icon={true}
              
              />,
            </div>
          </div>
          <div>You dont have account? <a href="/register">sign up</a></div>
          <br></br>
          <Link to={"/forget-password/?maskaan"}> Forget-password ?</Link>
        </div>
      </div>
    );
  }
}


const mapStateToProps = state => ({ user : state.auth.user })

export default connect(mapStateToProps, { loginUser, get_post_like, get_notif_login,getFollower,get_post_save  })(Login);
