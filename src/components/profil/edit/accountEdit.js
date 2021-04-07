import React, { Component, Fragment } from "react";
import M from "materialize-css/dist/js/materialize.min.js";

import axios from "../../../utils/axios";
import Cookies from "js-cookie";

import { protectAuth } from "../../../utils/auth/auth";
import { connect } from 'react-redux'
import { UpdateUser,massageUser } from '../../../action/auth'

import "../../../assert/css/AccountEdit.css";

class AccountEdit extends Component {
  constructor(props) {
    
    super(props);
    this.state = {
      username: "",
      name:'',
      bio: "",
      email: "",
      phone: 0,
      gender: "",
      profil: null,
      respone : null,
      profilpreview: null,
      loading:true,
    };
    this.avatarRef = React.createRef();
  }

  componentDidMount() {
   
    protectAuth(Cookies.get("access"), Cookies.get("refresh")).then( e => !e ? window.location.reload() : null );
 
    const config = {
      headers: {
        Authorization: "Bearer " + Cookies.get("access"),
      },
    }
    
    const userId = this.props.user.user_id

    axios.get(`auth/profil/${userId}/edit/`, config)
      .then((res) => {
        const nomor = res.data.nomorHp ? res.data.nomorHp : 62
        const bio  = res.data.bio ? res.data.bio : ''
        this.setState({
          username: res.data.nickname,
          email: res.data.email,
          name:res.data.name,
          phone: nomor,
          gender: res.data.gender,
          profil: res.data.profil,
          profilpreview: res.data.profil,
          bio: bio,
          loading:false,
        });
      })
      .catch( e => console.log(e.request));

    M.AutoInit();
  }

  handleChange = event => {
    const { name , value} = event.target ;
    this.setState(prev => ({
      ...prev,
      [name]: value
    }))
  }

  handleProfil = event => {
    if (event.target.files[0].size > 2097152) {
      alert("this file to big ,low 2mb please");
    } else {
      const image = event.target.files[0];

      const reader = new FileReader();

      // menyimpan data ke url agar bisa di load di preview
      reader.addEventListener(
        "load",() => {
          this.setState({ profilpreview: reader.result });
        },false);
      // membuat base64
      reader.readAsDataURL(image);
      this.setState({ profil: image });
    }
  };

  handleSubmit = () => {
    const config = {
      headers: {
        'Authorization': "Bearer " + Cookies.get("access"),
        "Content-Type": "multipart/form-data",
      },
    }
    const userId = this.props.user.user_id
    const { email, phone, bio, username, gender, profil,name } = this.state;
    let formdata = new FormData();
      formdata.append("bio", bio);
      formdata.append("gender", gender);
      formdata.append("nickname", username);
      formdata.append("nomorHp", phone);
      formdata.append("email", email);
      formdata.append("name", name);
    if (profil.size !== undefined) formdata.append("profil", profil);
    

    axios.put(`auth/profil/${userId}/edit/`, formdata, config)
      .then( res => {
        if(this.props.user.username !== username ||  profil.size !== undefined) this.props.UpdateUser(Cookies.get('access'))
        this.props.massageUser(`Success Updated Profil ,${res.responseText}`)
      })
      .catch( e => {
       console.log(e.request)
        this.setState({respone:e.request.responseText});
        this.props.massageUser(`Failed Update Profil ,${e.request.responseText}`)
      });
  };

  render() {
    const { username, email, phone, gender, bio,name } = this.state;
    return (
      <Fragment>
          <div className="col s9 l9">
            <div className="container row" style={{padding:"30px", paddingLeft:'50px', marginLeft:'30px'}}>
              <div className="head_edit">
                <img
                  ref={this.avatarRef}
                  src={this.state.profilpreview}
                  className="avatar circle"
                  alt="foto"
                  width={60}
                  height={60}
                  style={{margin:"0"}}
                />
                <div className="edit_right">
                  <p>{username}</p>
                  <div className="change_edit">
                    <label htmlFor="files">Change Profile Photo</label>
                    <input
                      onChange={this.handleProfil}
                      type="file"
                      style={{ visibility: "hidden" }}
                      accept={"image/*"}
                      id="files"
                    />
                  </div>
                </div>
              </div>
              <div className="input col s12">
                <label>Username</label>
                <input
                  type="text"
                  className="browser-default fr"
                  placeholder="Username"
                  id="username"
                  name="username"
                  onChange={this.handleChange}
                  value={username === null ? "" : username}
                />
              </div>
              <div className="input col s12">
                <label>Name</label>
                <input
                  placeholder="Name"
                  type="text"
                  name="name"
                  value={name === null ? '' : name}
                  onChange={this.handleChange}
                  className="browser-default fr" />
              </div>
              <div className="input col s12">
                <label>Bio</label>
                <textarea
                  onChange={this.handleChange}
                  value={bio === null ? "" : bio}
                  placeholder="Bio"
                  type="textarea"
                  name='bio'
                  className="browser-default fr"
    
                />
              </div>
              <div style={{ display: "flex", flexDirection: "column", color: "#bfbfbf", width: "355px", fontSize: "0.7rem", padding: "40px 0 20px 70px" }}>
                <b>Personal Information</b>
                <p>Provide your personal information, even if the account is used for a business, a pet or something else. This won't be a part of your public profile.</p>
              </div>
              <div className="input col s12">
                <label>Email</label>
                <input
                  placeholder="Email"
                  onChange={this.handleChange}
                  value={email === null ? "" : email}
                  name="email"
                  type="email"
                  className="browser-default fr"
                />
              </div>
              <div className="input col s12">
                <label>Phone</label>
                <input
                  placeholder="Email"
                  onChange={this.handleChange}
                  value={phone === null ? "" : phone}
                  name="phone"
                  type="email"
                  className="browser-default fr"
                />
              </div>
              <div className="input col s12 ">
                <label>Gender</label>
                <select
                  onChange={this.handleChange}
                  name="gender"
                  defaultValue={gender === "" ? "DEFAULT" : gender}
                  className="browser-default fr" >
                  <option value={"DEFAULT"} disabled>
                    Choose a Your Gender
                  </option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
              </div>
              <div className="input col s12">
                <button className="btn" onClick={this.handleSubmit}>
                  send
                </button>
              </div>
             
              {this.state.respone && <p className="message-login center-align col s12">{this.state.respone}</p> }
             
            </div>
          </div>
      </Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    user : state.auth.user,
  }
}

export default connect(mapStateToProps,{ UpdateUser,massageUser })(AccountEdit);
