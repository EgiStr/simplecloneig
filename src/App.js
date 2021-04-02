import React from "react";
import Navbar from "./components/navbar/Navbar";
import Profile from "./components/profil/Profile";
import Login from "./components/auth/login";
import Home from "./components/home/home";
import Register from "./components/auth/Register";
import CreatePost from './components/createpost/createpost'
import Logout from './components/auth/logout'
import editProfile from './components/profil/edit/editProfile'
import SearchUser from './components/navbar/searchUser'
import ForgetPassword from './components/auth/forgetPassword'
import passwordNew from './components/auth/password-new'
import DetailPost from './components/detail/Posts'
import {BrowserRouter as Router, Switch, Route } from "react-router-dom";


const App = () => {
  return (
    <Router >
      
      <Navbar />
      {/* daerah content page atas*/}
      
      <Switch>
        {/* daerah switch bakal keganti otamatis sesuai lick dan compoenent */}
        <Route exact path="/" component={Home} />
        {/* <Route path="/message" component={Message} /> */}
        <Route path="/profile/:id" component={Profile} />
        <Route path="/p/:id" component={DetailPost} />
        <Route path="/create" component={CreatePost} />
        <Route path="/login" component={Login} />
        <Route path="/logout" component={Logout} />
        <Route path="/account" component={editProfile} />
        <Route path="/register" component={Register} />
        <Route path="/search" component={SearchUser} />
        <Route exact path="/forget-password" component={ForgetPassword} />
        <Route path="/forget-password/comfirm" component={passwordNew} />
      </Switch>
    </Router>
  );
}

export default App;
