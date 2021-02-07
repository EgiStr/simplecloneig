import React, { useState } from 'react'
import Avatar from '@material-ui/core/Avatar'
import '../Profile.css'
import Posts from './Posts'
function Profile() {
    const [contents] = useState([
        {
            imageUrl: "https://lh3.googleusercontent.com/2Fz6Fn5zq_hh75oNLsyNqyGSHzPopHojN77Eu6GImw_3bb4JteONR_K8lnCY2nRbZQV9RD7ACVYvTHEEoW6oGt2GNkAVXzsGdHl1XI9JWwr9ojo3N7t5mYgqaux8lESdvi4mJTti4Ok=w2400"
        }
       
    ]);
    return (
        <div className="container">
            <div className="row header" >
                <div>
                    <Avatar
                        className="avatar"
                        alt="foto"
                        src="data:image/jpeg;base64,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"
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
                <div className="post__nav active"><i className="material-icons tiny" >grid_on</i>POSTS</div>
                <div className="post__nav"><i className="material-icons tiny" >turned_in_not</i>SAVED</div>
                <div className="post__nav"><i className="material-icons tiny" >person_pin</i>TAGGED</div>
            </div>
            <div className="posts">
                <div className="posts_wrap">
                    {
                        contents.map(content => (
                            <Posts
                                imageUrl={content.imageUrl}
                                className="ci"
                            />
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

export default Profile
