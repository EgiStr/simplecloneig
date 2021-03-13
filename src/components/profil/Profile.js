import React, { Component } from 'react'
import Avatar from '@material-ui/core/Avatar'
import axios from 'axios'
import Cookies from 'js-cookie'

import { connect } from 'react-redux'


import { Switch, Route,Redirect,NavLink } from 'react-router-dom'

// import { protectAuth } from '../auth/auth'
import { getFollower, is_follow } from '../../action/follow'
import { get_post_data } from '../../action/auth'

import ModalFollow from './follow/modelFollow'
import Posts from './posts'
import SavePosts from './save_post'

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
        delete axios.defaults.headers.common["Authorization"];
    }

    componentDidMount() {
        const id = this.props.match.params.id;
        // protectAuth(this.state.access, this.state.refresh).then(e => !e ? window.location.reload() : this.setState({ redirect: false }))
        this.props.getFollower(this.state.access)
        
        axios.get(`http://127.0.0.1:8000/auth/profil/${id}/`)
        .then(res => {
            this.props.get_post_data(res.data.post_data)
            this.props.is_follow(res.data.follower.map(e => e.id))
            this.setState({ data: res.data })
        })
        .catch(e => console.log(e.request))
    }
    componentDidUpdate({match}){
        if(this.props.match.url !== match.url){
            this.props.getFollower(this.state.access)
        
            const id = this.props.match.params.id;
    
            axios.get(`http://127.0.0.1:8000/auth/profil/${id}/`)
                .then(res => {
                    this.props.get_post_data(res.data.post_data)
                    this.props.is_follow(res.data.follower.map(e => e.id))
                    this.setState({ data: res.data })
                })
                .catch(e => console.log(e.request))
        }
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
        const {url,path} = this.props.match
        const authUser = this.props.user.username
        const idUser = this.props.match.params.id
        
        const data = this.state.data
        const { follower, following, id } = data


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
                
                {/* masih ada masalah didalam navlink , ga mau pindah route */}
                                {/* isuue is beres ajg , jangan buat roouter baru lagi disini karna routernya udh di app */}
                <NavLink
                    to={`${url}`}
                    exact
                    activeClassName="post__nav active"
                    className="post__nav"
                >
                   <i className="material-icons tiny" >grid_on</i>POSTS
                </NavLink>
                
                {idUser === authUser 
                    ? (<NavLink
                            to={`${url}/savePost`}
                            activeClassName="post__nav active"
                            className="post__nav"
                            >
                            <i className="material-icons tiny" >turned_in_not</i>SAVES
                        </NavLink>)
                    : null }
                     {/* <div className="post__nav"><i className="material-icons tiny" >person_pin</i>TAGGED</div> */}
                </div>

                <Switch>
                    <Route path={`${path}`} exact component={()=> <Posts param={idUser} />} />
                    <Route path={`${path}/savePost`} exact component={() => <SavePosts param={idUser} />} />
                </Switch>

            </div>
        )
    }

}


const mapStateToProps = (state) => {
    return {
        user: state.auth.user,
        follow_user: state.follow.is_following,
    }
}


export default connect(mapStateToProps, { getFollower, is_follow,get_post_data })(Profile)