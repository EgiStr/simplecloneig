import React, { Component, Fragment } from "react";
import M from "materialize-css/dist/js/materialize.min.js";
import axios from "axios";
import { parseJwt } from "./Navbar";
import Cookies from "js-cookie";
import { Redirect } from "react-router-dom";
import { protectAuth } from "./auth";
import Avatar from "@material-ui/core/Avatar";
import "../AccountEdit.css";

class AccountEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      access: Cookies.get("access"),
      refresh: Cookies.get("refresh"),
      redirectUrl: "",
      redirect: false,
      bio: "",
      username: "",
      email: "",
      phone: null,
      gender: "",
      profil: null,
      profilpriview: null,
    };
    this.avatarRef = React.createRef();
  }

  componentDidMount() {
    if (!protectAuth(this.state.access, this.state.refresh))
      this.setState({ redirect: true, redirectUrl: "/login" });

    const userId = parseJwt(this.state.access).user_id;

    axios
      .get(`http://127.0.0.1:8000/auth/profil/${userId}/edit/`, {
        headers: {
          Authorization: "Bearer " + this.state.access,
        },
      })
      .then((res) => {
        this.setState({
          username: res.data.nickname,
          email: res.data.email,
          phone: res.data.nomorHp,
          gender: res.data.gender,
          profil: res.data.profil,
          profilpriview: res.data.profil,
          bio: res.data.bio,
        });
      })
      .catch((e) => console.log(e));

    M.AutoInit();
  }

  handleGender = (event) => this.setState({ gender: event.target.value });
  handleUsername = (event) => this.setState({ username: event.target.value });
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
    const { email, phone, bio, username, gender, profil } = this.state;
    let formdata = new FormData();
    formdata.append("bio", bio);
    formdata.append("gender", gender);
    formdata.append("nickname", username);
    formdata.append("nomorHp", phone);
    formdata.append("email", email);
    if (profil.size === undefined) {
    } else {
      formdata.append("profil", profil);
    }

    axios
      .put(`http://127.0.0.1:8000/auth/profil/${userId}/edit/`, formdata, {
        headers: {
          Authorization: "Bearer " + this.state.access,
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => console.log(res))
      .catch((e) => console.error(e));
  };

  render() {
    if (this.state.redirect)
      return <Redirect to={this.state.redirectUrl}></Redirect>;
    const { username, email, phone, gender, bio } = this.state;
    return (
      <Fragment>
        <div className="container">
          <div className="row box_edit">
            <div className="col s3">
              <a className="nav_edit">Edit Profile</a>
              <a className="nav_edit">Change Password</a>
            </div>
            <div className="col s9">
              <div className="edit_body">
                <div className="head_edit">
                  <Avatar
                    ref={this.avatarRef}
                    src={this.state.profilpriview}
                    className="avatar"
                    alt="foto"
                    style={{ width: "40px", height: "40px" }}
                  />
                  <div className="edit_right">
                    <p>username</p>
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
                <div className="form">
                  <div className="input">
                    <label htmlFor="username">Name</label>
                    <input type="text" className="browser-default" />
                  </div>
                  <div className="input">
                    <label htmlFor="username">Username</label>
                    <input type="text" className="browser-default" />
                  </div>
                  <div className="input">
                    <label htmlFor="username">Email</label>
                    <input type="email" className="browser-default" />
                  </div>
                  <div className="input">
                    <label htmlFor="username">Username</label>
                    <input type="text" className="browser-default" />
                  </div>
                </div>

                {/* <div className="input">
                  <label htmlFor="username">UserName</label>
                  <input
                    placeholder="username"
                    id="username"
                    onChange={this.handleUsername}
                    value={username === null ? "" : username}
                    type="text"
                  />
                </div>
                <div className="input">
                  <input
                    placeholder="email"
                    id="email"
                    type="email"
                    onChange={this.handleEmail}
                    value={email === null ? "" : email}
                  />
                  <label htmlFor="email">Email</label>
                </div>
                <div className="input">
                  <textarea
                    id="textarea1"
                    onChange={this.handleBio}
                    value={bio === null ? "" : bio}
                    placeholder="Bio"
                    type="textarea"
                    ref={(node) => (this.textareRef = node)}
                  ></textarea>
                  <label htmlFor="textarea1">Bio</label>
                </div>
                <div className="input">
                  <input
                    placeholder="Phone Number"
                    id="Phone_Number"
                    onChange={this.handlePhone}
                    value={phone === null ? "" : phone}
                    type="tel"
                  />
                  <label htmlFor="Phone_Number">Phone Number</label>
                </div>
                <div className="input ">
                  <select
                    onChange={this.handleGender}
                    defaultValue={gender === "" ? "DEFAULT" : gender}
                  >
                    <option value="DEFAULT" disabled>
                      Choose a Your Gender
                    </option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                  </select>
                  <label>Gender Select</label>
                </div>
                <div className="input">
                  <button className="btn" onClick={this.handleSubmit}>
                    send
                  </button>
                </div> */}
              </div>
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}

export default AccountEdit;
