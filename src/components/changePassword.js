import React from 'react'
import Avatar from '@material-ui/core/Avatar'
import { Container } from '@material-ui/core'
import '../Password.css'

function changePassword() {
    return (
        <div className="col s9">
            <Container>
                <div className="head_edit">
                    <Avatar
                        className="avatar"
                        alt="foto"
                    />
                    <div className="edit_right">
                        <p>username</p>
                    </div>
                </div>
                <div className="input-password">
                    <label>Old Password</label>
                    <input
                        type="password"
                        className="browser-default rf"
                    />
                </div>
                <div className="input-password">
                    <label>New Password</label>
                    <input
                        type="password"
                        className="browser-default rf"
                    />
                </div>
                <div className="input-password">
                    <label>Confirm New Password</label>
                    <input
                        type="password"
                        className="browser-default rf"
                    />
                </div>
            </Container>
        </div>
    )
}

export default changePassword
