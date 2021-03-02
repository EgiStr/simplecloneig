import React, {Component} from 'react'

import M from "materialize-css";


import { connect } from 'react-redux'

import {getFollowerUser , getFollowingUser} from '../../../action/follow'
import Following from './following'
import Follower from './follower'

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
            
            inDuration: 250,
            outDuration: 250,
            opacity: 0.5,
            dismissible: false,
            startingTop: "4%",
            endingTop: "10%"
          };
          M.Modal.init(this.Modal, options);
        }
        
    render() {
        let {follower,following} = this.props
       
      
        return (
            <div id="modal_id_follow" ref={ Modal => { this.Modal = Modal }} className="modal">
                <div className="modal-content">
                    
                    {this.props.type === true ? (<h4>follower</h4>) : (<h4>following</h4>)}
                    {this.props.type === true ? (
                    follower.map((e,i) => {
                        
                        return <Follower 
                                key={i}
                                user = {e.user}
                                id_follower = {e}
                                />
                    })
                    ) : (
                    following.map((e,i) => {
                        console.log(e)
                        return <Following 
                                key = {i}
                                user ={e.following_user}
                                id_following = {e.id}
                        />
                      
                    })
                    )}
                    
                   
                </div>
                <div className="modal-footer">

                    <a className="modal-close waves-effect waves-green btn-flat" >cancel</a> 
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