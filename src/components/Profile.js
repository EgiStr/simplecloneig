import React from 'react'
import Avatar from '@material-ui/core/Avatar'
function Profile() {
    return (
        <div>
            <div className="row">
                <div className="col s4" >
                    <Avatar
                        className="avatar"
                        alt="foto"
                        src=""
                        style={{width:"150px",height:"150px", margin:"30px 45px"}}
                    />
                </div>
                <div className="col 6">
                        <h5 >username</h5>
                </div>
            </div>
        </div>
    )
}

export default Profile
