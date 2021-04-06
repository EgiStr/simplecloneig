import React, { Component } from 'react'

import axios from '../../utils/axios'
import Cookies from 'js-cookie'

import { connect } from 'react-redux'


import { Redirect } from 'react-router-dom'


import { get_post_data } from '../../action/auth'

import ModalFollow from './follow/modelFollow'
import NavProfil from './navProfil/navProfil'
import RouterProfil from './routerProfil/routerprofil'
import Loading from '../other/loading'
import Follow from '../other/profil/follow'
import PageNull from '../other/pageNull'

import '../../assert/css/Profile.css'



class Profile extends Component {
    constructor(props) {
        super(props)
        this.state = {
            type: null,
            data: [],
            loading : true,
            error : false,
        }
        delete axios.defaults.headers.common["Authorization"];
    }

    componentDidMount() {
        
        const id = this.props.match.params.id;

        if(this.props.user !== null){
            axios.get(`auth/profil/${id}/`)
            .then(res => {    
                this.props.get_post_data(res.data.post_data)
                this.setState({ data: res.data,loading:false })
            })
            .catch(e => this.setState({error:true}))
        }
    }
    componentDidUpdate({match}){
        if(this.props.match.url !== match.url){

            const id = this.props.match.params.id;
            this.setState({loading:true})
            axios.get(`auth/profil/${id}/`)
                .then(res => {
                    
                    this.props.get_post_data(res.data.post_data)
                    this.setState({ data: res.data,loading:false})
                })
                .catch(e => this.setState({error:true}))
        }
    }
   
    handleEditProfil = () => this.props.history.push('/account/edit')

    

    render() {
        if(this.props.user === null) return <Redirect to={'/login'}/>
        
        const { url, path } = this.props.match
        const authUser = this.props.user.username
        const idUser = this.props.match.params.id
    
        const { follower, following, id, nickname, bio, name, profil, post_count } = this.state.data


        return (
            this.state.loading ? <div><Loading /> {this.state.error && <PageNull page={`${idUser} pr not Found error 404`} />}</div> :(
                <div className="container">
                <div className="row header" >
                    <div>
                        <img
                            className="avatar hide-on-small-only"
                            alt="foto"
                            src={profil}
                            width={150}
                            height={150}
                            style={{ borderRadius:'50%'}}
                        />
                        <img
                            className="avatar hide-on-med-and-up"
                            alt="foto"
                            src={profil}
                            width={80}
                            height={80}
                            style={{ borderRadius:'50%'}}
                        />
                    </div>
                    <div>
                        <div style={{ display: "flex" }}>
                            <h5 style={{ fontWeight: "350" }}>{nickname}</h5>
                            {authUser === idUser ?  <p onClick={this.handleEditProfil} className="btn_edit"> Edit Profile</p> : <Follow follow_id={id} className="btn_edit"/>}
                        </div>
                        <div style={{ display: "flex", flexDirection: "row" }}>
                            <h6 style={{ fontWeight: "300" }}>{post_count} Posts</h6>
                            <h6 style={{ fontWeight: "300", margin: "12px 25px", cursor: "pointer" }} onClick={ async () => await this.setState({ type: true })} className="modal-trigger" href={`#modal_id_follow`} >{follower.length } Followers</h6>
                            <h6 style={{ fontWeight: "300", cursor: "pointer" }} onClick={ async () => await this.setState({ type: false })} className="modal-trigger" href={`#modal_id_follow`} >{following.length } Followings</h6>

                            <ModalFollow
                                type={this.state.type}
                                id={id}
                                token={Cookies.get('access')}
                            />

                        </div>
                        <div>
                            <h6 style={{ fontWeight: "500", fontSize: "15px" }}>{name} </h6>
                            <p>{bio}</p>
                        </div>
                    </div>
                </div>

                <div className="divider"></div>

                {/* zona navprofil */}

                <NavProfil 
                    idUser = {idUser}
                    url = {url}
                />
               

                {/* zona router profil */}
                
                <RouterProfil 
                    idUser = {idUser}
                    path   = {path}
                />
                

            </div>
            )
            
        )
    }

}


const mapStateToProps = (state) => {
    return {
        user: state.auth.user,
    }
}


export default connect(mapStateToProps, { get_post_data })(Profile)