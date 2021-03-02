import React, { Component } from "react";
import axios from 'axios'
import { Redirect } from 'react-router-dom'
class Register extends Component {
  constructor(props) {
    super(props)
    this.state = {
      username: '',
      password: '',
      password2: 'l',
      email: '',
      validate: false,
      redirect: false,
      error:null,
    }
  }

  handleUsername = event => this.setState({ username: event.target.value })
  handleEmail = event => this.setState({ email: event.target.value })
  handlePassword = event => this.setState({ password: event.target.value })
  handlePasswordValidate = event => this.setState({ password2: event.target.value, validate: this.state.password === event.target.value })
  

  handleSubmit = e => {
    e.preventDefault();
    axios({
      method: 'post',
      url: 'http://127.0.0.1:8000/auth/register/',
      data: {
        username: this.state.username,
        password: this.state.password,
        password2: this.state.password2,
        email: this.state.email,
      }
    })
      .then((res) => {
        this.setState({ redirect: true });
      })
      .catch(e => {
        if (e.request.status === 400) { console.clear(); }
        this.setState({ username: '', password: '', password2: '', email: '', validate: true, redirect: false, error: e.request.response })
      })
  }
  render() {
    if (this.state.redirect) return <Redirect to="/login" />
    
  
    return (
      <div className="container_login">
        <div className="box_login">
          <h5>CloneIG</h5>
          <div className="input-field">
            <input id="icon_prefix" type="text" className="validate" onChange={(event) => {
              this.handleUsername(event);
            }} />
            <label htmlFor="icon_prefix">username</label>
          </div>
          <div className="input-field">
            <input id="icon_prefix2" type="text" className="validate" onChange={(event) => {
              this.handleEmail(event);
            }} />
            <label htmlFor="icon_prefix2">email</label>
          </div>
          <div className="input-field">
            <input id="icon_prefix3" type="password" className="validate" onChange={(event) => {
              this.handlePassword(event);
            }} />
            <label htmlFor="icon_prefix3">password</label>
          </div>
          <div className="input-field">
            <input id="icon_prefix4" type="password" className="validate" onChange={(event) => {
              this.handlePasswordValidate(event);
            }} />
            <label htmlFor="icon_prefix4">password confirm</label>
          </div>
          {this.state.validate ? (<p>{this.state.error}</p>) : (null)}
          {this.state.validate ?
            (<button
              className="btn waves-effect waves-light"
              type="submit"
              onClick={this.handleSubmit}>
              Submit
              <i className="material-icons right">send</i>
            </button>) :
            (<button
              className="btn waves-effect waves-light disabled"
              type="submit"
              onClick={this.handleSubmit}
            >
              Submit
              <i className="material-icons right">send</i>
            </button>)}
            have an account? <a href="/login">Log in</a>
        </div>
      </div>
    );
  }

}

export default Register;
