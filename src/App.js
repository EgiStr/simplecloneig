import React from "react";
// import Content from './components/content'
import {Navbar} from "./components/Navbar";
import Message from "./components/Message";
import Profile from "./components/Profile";
import Login from "./components/login";
import Home from "./components/home";
import Register from "./components/Register";
import CreatePost from './components/createpost'
import Logout from './components/logout'
import editProfile from './components/editProfile'
import SearchUser from './components/searchUser'
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";


function App() {
  return (
    <Router>
      {/* {localStorage.getItem('token') === null ? window.location.reload() : null } */}
      <Navbar />
      {/* daerah content page atas*/}
      
      <Switch>
        {/* daerah switch bakal keganti otamatis sesuai lick dan compoenent */}
        <Route exact path="/" component={Home} />
        <Route path="/message" component={Message} />
        <Route path="/profile/:id" component={Profile} />
        <Route path="/create" component={CreatePost} />
        <Route path="/login" component={Login} />
        <Route path="/logout" component={Logout} />
        <Route path="/account" component={editProfile} />
        <Route path="/register" component={Register} />
        <Route path="/search" component={SearchUser} />
      </Switch>
    </Router>
  );
}

export default App;
