import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import Cookies from 'js-cookie'

import { connect } from 'react-redux'
import { loginUser, get_post_like } from '../../action/auth'
import { getFollower } from '../../action/follow'
import { get_notif_login, } from '../../action/notifikasi'


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
  }

  handleSubmit = (e) => {
    e.preventDefault();
    axios.post(`http://127.0.0.1:8000/auth/login/`, {
      username: this.state.title,
      password: this.state.password,
    })
      .then((res) => {
        Cookies.set('access', res.data.access)
        Cookies.set('refresh', res.data.refresh)
        this.props.get_post_like()
        this.props.get_notif_login()
        this.props.loginUser(res.data.access)
        this.props.getFollower(res.data.access)

        this.setState({ redirect: true });
      })
      .catch((e) => this.setState({ notValide: true }));
  }

  handleTitleChange = (event) => this.setState({ title: event.target.value })
  handlePasswordChange = (event) => this.setState({ password: event.target.value })
  handleValidatePassword = event => this.setState({ password2: event.target.value, notValide: event.target.value !== this.state.password });


  render() {

    if (this.state.redirect) {
      return <Redirect to="/" />;
    }

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
              <i className="material-icons">email</i>
            </div>
          </div>You dont have account? <a href="/register">sign up</a>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    is_auth: state.auth.is_auth
  }
}

export default connect(mapStateToProps, { loginUser, get_post_like, get_notif_login,getFollower  })(Login);
