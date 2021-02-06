import React, {useState} from 'react'
import Avatar from '@material-ui/core/Avatar'
import '../Profile.css'
import Posts from './Posts'
function Profile() {
    const [contents] = useState([
        {
            imageUrl: "https://lh3.googleusercontent.com/2Fz6Fn5zq_hh75oNLsyNqyGSHzPopHojN77Eu6GImw_3bb4JteONR_K8lnCY2nRbZQV9RD7ACVYvTHEEoW6oGt2GNkAVXzsGdHl1XI9JWwr9ojo3N7t5mYgqaux8lESdvi4mJTti4Ok=w2400"
        },
        {
            imageUrl: "https://lh3.googleusercontent.com/2Fz6Fn5zq_hh75oNLsyNqyGSHzPopHojN77Eu6GImw_3bb4JteONR_K8lnCY2nRbZQV9RD7ACVYvTHEEoW6oGt2GNkAVXzsGdHl1XI9JWwr9ojo3N7t5mYgqaux8lESdvi4mJTti4Ok=w2400"
        },
        {
            imageUrl: "https://lh3.googleusercontent.com/2Fz6Fn5zq_hh75oNLsyNqyGSHzPopHojN77Eu6GImw_3bb4JteONR_K8lnCY2nRbZQV9RD7ACVYvTHEEoW6oGt2GNkAVXzsGdHl1XI9JWwr9ojo3N7t5mYgqaux8lESdvi4mJTti4Ok=w2400"
        }
    ]);
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
                <div className="post__nav active"><i className="material-icons tiny" >grid_on</i>POSTS</div>
                <div className="post__nav"><i className="material-icons tiny" >turned_in_not</i>SAVED</div>
                <div className="post__nav"><i className="material-icons tiny" >person_pin</i>TAGGED</div>
            </div>
            <div className="posts">
                {
                    contents.map(content => (
                        <Posts
                            imageUrl={content.imageUrl}
                        />
                    ))
                }
            </div>
        </div>
    )
}

export default Profile
