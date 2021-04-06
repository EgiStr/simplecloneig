import React, { Component } from "react";
import axios from '../../utils/axios'
import { connect } from 'react-redux'
class Register extends Component {
  constructor(props) {
    super(props)
    this.state = {
      username: '',
      password: '',
      password2: '',
      email: '',
      error:null,
    }
    delete axios.defaults.headers.common["Authorization"];
  }

  handleChange = event => {
    const {name , value} = event.target
    this.setState(prev => ({
      ...prev,
      [name] : value
    }))
  }

  handleSubmit = e => {
    e.preventDefault();
    const data = {
      username: this.state.username,
      password: this.state.password,
      password2: this.state.password2,
      email: this.state.email,
    }
    axios.post('auth/register/',data)
      .then((res) => {
        this.props.dispatch({ type:'GET_SUCCESS_MASSAGE', payload: `${data.username} Successfuly Created ,` })
        this.props.history.push('/login')
      })
      .catch(e => {
        if (e.request.status === 400) { console.clear(); }
        this.props.dispatch({ type:'GET_SUCCESS_MASSAGE', payload: `Failed Created Account` })
        this.setState({ validate: true, error: e.request.response })
      })
  }
  
  render() {
    if(this.props.user !== null) this.props.history.push('/')
    return (
      <div className="container_login" >
        <div className="box_login row" style={{minWidth:'30vw',height:'93vh'}}>
          <h5>Create Account</h5>
          {this.state.error && <p className="message-login">{this.state.error}</p>}
          <div className="input-field">
            <input id="icon_prefix" type="text" className="validate" name='username' onChange={this.handleChange} />
            <label htmlFor="icon_prefix">username</label>
          </div>
          <div className="input-field">
            <input id="icon_prefix2" type="text" className="validate" name='email' onChange={this.handleChange} />
            <label htmlFor="icon_prefix2">email</label>
          </div>
          <div className="input-field">
            <input id="icon_prefix3" type="password" className="validate" name='password' onChange={this.handleChange} />
            <label htmlFor="icon_prefix3">password</label>
          </div>
          <div className="input-field">
            <input id="icon_prefix4" type="password" className="validate" name="password2" onChange={this.handleChange} />
            <label htmlFor="icon_prefix4">password confirm</label>
          </div>
          <button
              className="btn waves-effect waves-light "
              type="submit"
              onClick={this.handleSubmit}
            >
              Submit
              <i className="material-icons right">send</i>
          </button>

            have an account? <a href="/login">Log in</a>
        </div>
      </div>
    );
  }

}

const mapStateToProps = state => ({
  user : state.auth.user,
  massage : state.massage
})

export default connect(mapStateToProps)(Register);
