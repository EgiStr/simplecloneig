import React, { Component } from 'react'

import Avatar from '@material-ui/core/Avatar'
import axios from 'axios'
import Cookies from 'js-cookie'

import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

import { protectAuth } from '../auth/auth'
import { getFollower, is_follow } from '../../action/follow'

import ModalFollow from './follow/modelFollow'
import Content from '../home/content'

import '../../Profile.css'


class Profile extends Component {
    constructor(props) {
        super(props)
        this.state = {
            access: Cookies.get('access'),
            refresh: Cookies.get('refresh'),
            type: null,
            follow: 'follow',
            unfollow: 'unfollow',
            data: [],
            redirect: false,
            redirectUrl: '',

        }
    }

    componentDidMount() {

        protectAuth(this.state.access, this.state.refresh).then(e => !e ? window.location.reload() : this.setState({ redirect: false }))
        this.props.getFollower(this.state.access)

        const id = this.props.match.params.id;

        axios.get(`http://127.0.0.1:8000/auth/profil/${id}/`)
            .then(res => {
                this.props.is_follow(res.data.follower.map(e => e.id))
                this.setState({ data: res.data })
            })
            .catch(e => console.log(e.request))

    }

    handleEditProfil = () => this.setState({ redirect: true, redirectUrl: '/account/edit' })

    handleFollow = () => {

        const diikuti = this.state.data.id
        const pefollow = this.props.user.user_id

        let form = new FormData();
        form.append('user', diikuti)
        form.append('following_user', pefollow)

        axios.post('http://127.0.0.1:8000/auth/following/',
            form, {
            headers: {
                "Authorization": 'Bearer ' + Cookies.get('access')
            }
        })

            .then(res => res.data.id === undefined ? this.setState({ follow: 'follow', unfollow: 'follow' }) : this.setState({ follow: 'unfollow', unfollow: 'unfollow' }))
            .catch(e => console.log(e))

    }

    render() {
        if (this.state.redirect || this.props.user === null) return <Redirect to={this.state.redirectUrl} />

        const authUser = this.props.user.username
        const idUser = this.props.match.params.id

        const data = this.state.data

        const { follower, following, post_data, id } = data


        return (
            <div className="container">
                <div className="row header" >
                    <div>
                        <Avatar
                            className="avatar"
                            alt="foto"
                            src={data.profil}
                            style={{ width: "150px", height: "150px" }}
                        />
                    </div>
                    <div>
                        <div style={{ display: "flex" }}>
                            <h5 style={{ fontWeight: "350" }}>{data.nickname}</h5>

                            {this.props.follow_user ? (
                                <p onClick={authUser === idUser ? this.handleEditProfil : this.handleFollow} className="btn_edit">{authUser === idUser ? ('edit profile') : this.state.unfollow}</p>
                            ) : (
                                    <p onClick={authUser === idUser ? this.handleEditProfil : this.handleFollow} className="btn_edit">{authUser === idUser ? ('edit profile') : this.state.follow}</p>
                                )}

                        </div>
                        <div style={{ display: "flex", flexDirection: "row" }}>
                            <h6 style={{ fontWeight: "300" }}>{data.post_count} Posts</h6>
                            <h6 style={{ fontWeight: "300", margin: "12px 25px", cursor: "pointer" }} onClick={() => this.setState({ type: true })} className="modal-trigger" href={`#modal_id_follow`} >{follower ? follower.length : null} Followers</h6>
                            <h6 style={{ fontWeight: "300", cursor: "pointer" }} onClick={() => this.setState({ type: false })} className="modal-trigger" href={`#modal_id_follow`} >{following ? following.length : null} Followings</h6>

                            <ModalFollow
                                type={this.state.type}
                                id={id}
                                token={this.state.access}
                            />
                        </div>
                        <div>
                            <h6 style={{ fontWeight: "500", fontSize: "15px" }}>{data.name} </h6>
                            <p>{data.bio}</p>
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

                        {post_data ? (post_data.map((item, index) => {

                            return (
                                <Content
                                    key={index}
                                    id={index}
                                    contentType={item.content_type_id}
                                    postId={item.id}
                                    userId={item.user.id}
                                    username={item.user.nickname}
                                    captions={item.caption}
                                    imageUrl={`http://127.0.0.1:8000${item.post}`}
                                    avatar={item.user.profil}
                                    like={item.likes}
                                />

                            )
                        }))
                            : (null)}

                    </div>
                </div>
            </div>
        )
    }

}

// function Profile() {
//     const [contents] = useState([
//         {
//             imageUrl: "https://lh3.googleusercontent.com/2Fz6Fn5zq_hh75oNLsyNqyGSHzPopHojN77Eu6GImw_3bb4JteONR_K8lnCY2nRbZQV9RD7ACVYvTHEEoW6oGt2GNkAVXzsGdHl1XI9JWwr9ojo3N7t5mYgqaux8lESdvi4mJTti4Ok=w2400"
//         }

//     ]);

// }

const mapStateToProps = (state) => {
    return {
        user: state.auth.user,

        follow_user: state.follow.is_following,
    }
}


export default connect(mapStateToProps, { getFollower, is_follow })(Profile)