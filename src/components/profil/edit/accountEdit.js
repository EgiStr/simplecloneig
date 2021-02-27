import React, { Component, Fragment } from "react";
import M from "materialize-css/dist/js/materialize.min.js";
import axios from "axios";
import { parseJwt } from "../../method/parseJwt";
import Cookies from "js-cookie";

import { protectAuth } from "../../auth/auth";

import Avatar from "@material-ui/core/Avatar";

import "../../../AccountEdit.css";

axios.defaults.headers.common["Authorization"] =
  "Bearer " + Cookies.get("access");

class AccountEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      access: Cookies.get("access"),
      refresh: Cookies.get("refresh"),
      redirectUrl: "",
      redirect: false,
      bio: "",
      name:'',
      username: "",
      email: "",
      phone: 0,
      gender: "",
      profil: null,
      respone : null,
      profilpriview: null,
    };
    this.avatarRef = React.createRef();
  }

  componentDidMount() {
   
    protectAuth(this.state.access, this.state.refresh).then((e) =>
      !e ? window.location.reload() : null
    );

    const userId = parseJwt(this.state.access).user_id;

    axios.get(`http://127.0.0.1:8000/auth/profil/${userId}/edit/`, {
        headers: {
          Authorization: "Bearer " + this.state.access,
        },
      })
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
          profilpriview: res.data.profil,
          bio: bio,
        });
      })
      .catch((e) => console.log(e));

    M.AutoInit();
  }

  handleGender = (event) => this.setState({ gender: event.target.value });
  // handleUsername = (event) => this.setState({ username: event.target.value });
  handleName = (event) => this.setState({ name: event.target.value });
  handlePhone = (event) => this.setState({ phone: event.target.value });
  handleEmail = (event) => this.setState({ email: event.target.value });
  handleBio = (event) => this.setState({ bio: event.target.value });

  handleProfil = (event) => {
    if (event.target.files[0].size > 2097152) {
      alert("this file to big low 2mb please");
    } else {
      const image = event.target.files[0];

      const reader = new FileReader();

      // menyimpan data ke url agar bisa di load di preview
      reader.addEventListener(
        "load",
        () => {
          this.setState({ profilpriview: reader.result });
        },
        false
      );
      // membuat base64
      reader.readAsDataURL(image);
      this.setState({ profil: event.target.files[0] });
    }
  };

  handleSubmit = () => {

    const userId = parseJwt(this.state.access).user_id;
    const { email, phone, bio, username, gender, profil,name } = this.state;
    let formdata = new FormData();
    formdata.append("bio", bio);
    formdata.append("gender", gender);
    formdata.append("nickname", username);
    formdata.append("nomorHp", phone);
    formdata.append("email", email);
    formdata.append("name", name);
    if (profil.size === undefined) {
    } else {
      formdata.append("profil", profil);
    }

    axios.put(`http://127.0.0.1:8000/auth/profil/${userId}/edit/`, formdata, {
        headers: {
          Authorization: "Bearer " + this.state.access,
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => this.setState({respone:res.statusText}))
      .catch((e) => console.log(e.request));
  };

  render() {
    const { username, email, phone, gender, bio,name } = this.state;
    return (
      <Fragment>
          <div className="col s9">
            <div className="container" style={{paddingTop:"20px"}}>
              <div className="head_edit">
                <Avatar
                  ref={this.avatarRef}
                  src={this.state.profilpriview}
                  className="avatar"
                  alt="foto"
                  style={{marginTop:"27px"}}
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
              <div className="input">
                <label>Name</label>
                <input
                  placeholder="Name"
                  type="text"
                  value={name === null ? '' : name}
                  onChange={this.handleName}
                  className="browser-default fr" />
              </div>
              {/* <div className="input">
                <label>Username</label>
                <input
                  type="text"
                  className="browser-default fr"
                  placeholder="Username"
                  id="username"
                  onChange={this.handleUsername}
                  value={username === null ? "" : username}
                />
              </div> */}
              <div className="input">
                <label>Bio</label>
                <textarea
                  onChange={this.handleBio}
                  value={bio === null ? "" : bio}
                  placeholder="Bio"
                  type="textarea"
                  ref={(node) => (this.textareRef = node)}
                  className="browser-default fr"
                />
              </div>
              <div style={{ display: "flex", flexDirection: "column", color: "#bfbfbf", width: "355px", fontSize: "0.7rem", padding: "40px 0 20px 70px" }}>
                <b>Personal Information</b>
                <p>Provide your personal information, even if the account is used for a business, a pet or something else. This won't be a part of your public profile.</p>
              </div>
              <div className="input">
                <label>Email</label>
                <input
                  placeholder="Email"
                  onChange={this.handleEmail}
                  value={email === null ? "" : email}
                  type="email"
                  className="browser-default fr"
                />
              </div>
              <div className="input">
                <label>Phone</label>
                <input
                  placeholder="Phone Number"
                  onChange={this.handlePhone}
                  value={phone === null ? "" : phone}
                  type="tel"
                  className="browser-default fr"
                />
              </div>
              <div className="input ">
                <label>Gender</label>
                <select
                  onChange={this.handleGender}
                  defaultValue={gender === "" ? "DEFAULT" : gender}
                  className="browser-default fr" >
                  
                  <option value="DEFAULT" disabled>
                    Choose a Your Gender
                    </option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
              </div>
              <div className="input">
                <button className="btn" onClick={this.handleSubmit}>
                  send
                  </button>
              </div>
              {this.state.respone === null ? '' : this.state.respone}
            </div>
          </div>
      </Fragment>
    );
  }
}

export default AccountEdit;
