import React from 'react'
import Avatar from '@material-ui/core/Avatar'
import '../Profile.css'
function Profile() {
    return (
        <div>
            <div className="row header" >
                <div>
                    <Avatar
                        className="avatar"
                        alt="foto"
                        src=""
                        style={{ width: "150px", height: "150px" }}
                    />
                </div>
                <div>
                    <div style={{ display: "flex" }}>
                        <h5 style={{ fontWeight: "350" }}>username</h5>
                        <p className="btn_edit
                        "> edit profile</p>
                    </div>
                    <div style={{ display: "flex", flexDirection: "row" }}>
                        <h6 style={{ fontWeight: "300" }}>519 posts</h6>
                        <h6 style={{ fontWeight: "300", margin: "12px 25px", cursor: "pointer" }}>519 followers</h6>
                        <h6 style={{ fontWeight: "300", cursor: "pointer" }}>519 following</h6>
                    </div>
                    <div>
                        <h6 style={{ fontWeight: "500", fontSize: "15px", marginBottom: "-10px" }}>FULL NAME</h6>
                        <p>bio bio bio</p>
                    </div>
                </div>
            </div>
            <div className="divider"></div>
            <div className="post_nav">
                <div style={{ fontWeight: "600" }}><i className="material-icons tiny" style={{ marginRight: "4px" }}>grid_on</i>POSTS</div>
                <div style={{}}><i className="material-icons tiny" style={{ marginRight: "4px", }}>turned_in_not</i>SAVED</div>
                <div style={{}}><i className="material-icons tiny" style={{ marginRight: "4px" }}>person_pin</i>TAGGED</div>
            </div>
        </div>
    )
}

export default Profile
