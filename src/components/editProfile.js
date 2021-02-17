import React from "react";
import AccountEdit from "./accountEdit";
import changePassword from "./changePassword";
import { BrowserRouter as Switch, Route } from "react-router-dom";

function editProfile() {
  return (
    <div className="row box_edit">
      <div className="col s3">
        <a className="nav_edit" href="/account/edit">
          Edit Profile
        </a>
        <a className="nav_edit" href="/account/password/change">
          Change Password
        </a>
      </div>
      <Switch>
        <Route path="/account/edit" component={AccountEdit} />
        <Route path="/account/password/change" component={changePassword} />
      </Switch>
    </div>
  );
}

export default editProfile;
