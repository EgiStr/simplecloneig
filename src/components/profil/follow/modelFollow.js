import React, {Component} from 'react'

import M from "materialize-css";

import { connect } from 'react-redux'

import {getFollowerUser , getFollowingUser} from '../../../action/follow'
import Following from './following'
import Follower from './follower'

import './modalFollow.css'

class ModalFollow extends Component {
    constructor(props){
        super(props)
        this.state = {
            follow : true,
        }
        
    }
    
    componentDidMount(){
        const options = {
            onOpenStart: () => {
                
                if(this.props.type === null){
                    this.props.getFollowingUser(this.props.token,this.props.id)
                    this.props.getFollowerUser(this.props.token,this.props.id)
                }
              
            },
            onCloseEnd: () => {
                this.Modal.style.display = 'none'
            },
            
            inDuration: 250,
            outDuration: 250,
            opacity: 0.5,
            dismissible: true,
            startingTop: "10%",
            endingTop: "10%"
          };
          M.Modal.init(this.Modal, options);
        }
        
    render() {
        let {follower,following} = this.props
       
      
        return (
            <div id="modal_id_follow" ref={ Modal => { this.Modal = Modal }} className="modal">
                    {this.props.type === true ? (<h4>follower</h4>) : (<h4>following</h4>)}
                <div className="modal-content" style={{ height: 400, overflow: 'auto', padding:'30px' }} >
                    
                    {this.props.type === true ? (
                    
                    follower.map((e,i) => {
                        
                        return <Follower 
                                key={i}
                                modal ={this.Modal}
                                user = {e.user}
                                id_follower = {e}
                                />
                    })
                    ) : (
                    
                        following.map((e,i) => {
                        return <Following 
                                modal = {this.Modal}
                                key = {i}
                                user ={e.following_user}
                                id_following = {e}
                        />
                      
                    })
                    )}
                    
                   
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        following : state.follow.followingUser,
        follower  : state.follow.followers,
    }
}

export default connect(mapStateToProps,{getFollowerUser,getFollowingUser})(ModalFollow) ;