import React from 'react'

import { Switch, Route, Link } from 'react-router-dom'

import AccountEdit from './accountEdit'
import changePassword from './changePassword'

function editProfile() {
    return (
        <div className="container">
            <div className="row box_edit">
                <div className="col s3">
                    <Link className="nav_edit" to={"/account/edit"}>Edit Profile</Link>
                    <Link className="nav_edit" to={"/account/password/change"} >Change Password</Link>
                </div>
                <div>
                <Switch>
                    <Route path="/account/edit" component={AccountEdit} />
                    <Route path="/account/password/change" component={changePassword} />
                </Switch>
                </div>
            </div>
        </div>
    )
}

export default editProfile;
