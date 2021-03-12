import React from "react";
// import Content from './components/content'
import Navbar from "./components/navbar/Navbar";
import Message from "./components/massage/Message";
import Profile from "./components/profil/Profile";
import Login from "./components/auth/login";
import Home from "./components/home/home";
import Register from "./components/auth/Register";
import CreatePost from './components/createpost/createpost'
import Logout from './components/auth/logout'
import editProfile from './components/profil/edit/editProfile'
import SearchUser from './components/navbar/searchUser'
import {BrowserRouter as Router, Switch, Route } from "react-router-dom";


function App() {
  return (
    <Router>
      {/* {localStorage.getItem('token') === null ? window.location.reload() : null } */}
      <Navbar />
      {/* daerah content page atas*/}
      
      <Switch>
        {/* daerah switch bakal keganti otamatis sesuai lick dan compoenent */}
        <Route exact path="/" component={Home} />
        <Route exact path="/message" component={Message} />
        <Route exact path="/profile/:id" component={Profile} />
        <Route exact path="/create" component={CreatePost} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/logout" component={Logout} />
        <Route exact path="/account" component={editProfile} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/search" component={SearchUser} />
      </Switch>
    </Router>
  );
}

export default App;
