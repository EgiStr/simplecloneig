import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import axios from "axios";
import Cookies from 'js-cookie'

import '../login.css'
class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      email: "",
      password: "",
      password2: "",
      notValide: false,
      redirect: false,
    };

    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleValidatePassword = this.handleValidatePassword.bind(this);
  }

  componentDidMount() {

    this.setState({ redirect: false });
  }

  handleSubmit(e) {
    e.preventDefault();
    axios
      .post(`http://127.0.0.1:8000/auth/login/`, {
        username: this.state.title,
        password: this.state.password,
        // password2:this.state.password2,
        // email:'egicuco50@gmail.com',
      })

      .then((res) => {
        Cookies.set('access',res.data.access)
        Cookies.set('refresh',res.data.refresh)
        this.setState({ redirect: true });
      })
      .catch((e) => console.log(e.request));
  }

  handleTitleChange(event) {
    let input = event.target.value;
    this.setState({
      title: input,
    });
  }

  handlePasswordChange(event) {
    this.setState({
      password: event.target.value,
    });
  }
  handleValidatePassword(event) {
    let password2 = event.target.value;

    this.setState({
      password2: password2,
      notValide: password2 !== this.state.password,
    });
  }

  render() {

    if (this.state.redirect) {
      return <Redirect to="/" />;
    }
    let content = ``;
    if (this.state.notValide) {
      content = `<div> password anda tidak macth</div>`;
    }

    return (
      <div className="container_login">
        <div className="box_login">
          <h5>Sign in</h5>
          <div className="input-field">
            <i className="material-icons prefix">person</i>
            <input
              type="text"
              value={this.state.title}
              onChange={(event) => {
                this.handleTitleChange(event);
              }}
              placeholder="What password ? ...."

            />
          </div>
          <div className="input-field">
            <i className="material-icons prefix">https</i>
            <input
              type="password"
              value={this.state.password}
              onChange={(event) => {
                this.handlePasswordChange(event);
              }}
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
          </div>
        You dont have account? <a href="/register">sign up</a>
          {content}
        </div>
      </div>
    );
  }
}

export default Login;
