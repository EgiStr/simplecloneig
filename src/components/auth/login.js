import React, { Component } from "react";

import { Redirect,Link } from "react-router-dom";
import Cookies from 'js-cookie'

import { connect } from 'react-redux'
import { loginUser, get_post_like,get_post_save } from '../../action/auth'
import { getFollower } from '../../action/follow'
import { get_notif_login, } from '../../action/notifikasi'

import { GoogleLogin } from 'react-google-login';

import axios from "axios";

import '../../login.css'
class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      password: "",
      notValide: false,
      redirect: false,
    };
    delete axios.defaults.headers.common["Authorization"];
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      grant_type : 'password',
      client_id: 'qDqQ2k5cz2HNaHsuyZC4JPwRRHxPOm2PJUoSXeTJ',
      client_secret : '6Xb1TvCPLJRmKsrQ4XhGg0uPnwLSvwmJ96DZiUKyG1pB87I6YfkJYhyDycl4vX6EBWCG4lFeDcuHecSGboz6gckgo3RWwSSj0xaBdnvwUwLWUYZOO1HBVdLSOsBrIcVe',
      username : this.state.title, 
      password: this.state.password,
  }
    axios.post('http://127.0.0.1:8000/auth/token/',data)
    .then((res) => {
      Cookies.set('access', res.data.access_token)
      Cookies.set('refresh', res.data.refresh_token)
      this.props.get_post_like()  
      this.props.get_post_save()
      this.props.get_notif_login()
      this.props.getFollower(res.data.access_token)
      this.props.loginUser(res.data.access_token)
      
      })
      .catch((e) => this.setState({ notValide: true }));
  }
  
  responseGoogle = response => {
    const data = {
      client_id: 'GXAKvHOF27PXTF4qzLHiFTL9MdKrv5wfEHiqpnYr',                   
      client_secret: 'BMN5fi1R9yNcmTYO53bAPeODNlu3xQK8QTpl8MxKjf7odJn7hvITOFW8B1jR0yHH6wHP11Ifpj0s1YLlutkyTs2p8rXuMTbKamr2LSHoan4jxUFkPFz70l8sE4cAlS6b',
      grant_type:'convert_token',
      backend : 'google-oauth2',
      token:response.accessToken
    }
    axios.post(`http://127.0.0.1:8000/oauth2/convert-token/`, data)
    .then((res) => {
      Cookies.set('access', res.data.access_token)
      Cookies.set('refresh', res.data.refresh_token)
      
      this.props.get_post_like()
      this.props.get_post_save()
      this.props.getFollower(res.data.access_token)
      this.props.get_notif_login()
      this.props.loginUser(res.data.access_token)
      
    })
      .catch((e) => console.log(e.request));
  }
  
  failResponse = response => {
    console.log(response);
  }
  handleTitleChange = event => this.setState({ title: event.target.value })
  handlePasswordChange = event => this.setState({ password: event.target.value })
  handleValidatePassword = event => this.setState({ password2: event.target.value, notValide: event.target.value !== this.state.password });


  render() {
    if (this.props.user != null) return <Redirect to="/" />

    return (

      <div className="container_login">
        <div className="box_login">
          <h5>Sign in</h5>
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
              <i className="material-icons">facebook</i>
            </div>
            <div className="icon_field">
              <GoogleLogin
                clientId="853564458690-kj782663d50bbft782m1na2s9hks69gi.apps.googleusercontent.com"
                buttonText="Login"
                onSuccess={this.responseGoogle}
                onFailure={this.failResponse}
        
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
