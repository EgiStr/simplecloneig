import React, {Component} from 'react'

import M from "materialize-css";

import { connect } from 'react-redux'

import {getFollowerUser , getFollowingUser} from '../../../action/follow'
import Follows from './follows'

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
            dismissible: true,
            startingTop: "10%",
            endingTop: "10%"
          };
          M.Modal.init(this.Modal, options);
        }
        
    render() {
        let { follower,following } = this.props
       
      
        return (
            <div id="modal_id_follow" style={{width:'fit-content',padding:'50px',borderRadius:'10px',overflow:'hidden'}} ref={ Modal => { this.Modal = Modal }} className="modal">
                    {this.props.type === true ? (<h4>Follower</h4>) : (<h4>Following</h4>)}
                <div className="modal-content" style={{ height: 400, overflow: 'scroll', padding:'30px' }} >
                <ul className="collection" style={{width:'100%',padding:'-10px 0'}}>
                    { this.props.type === true 
                    ? (
                    
                        follower.map((e,i) => {
                            return <Follows 
                                    key={i}
                                    modal ={this.Modal}
                                    user = {e.user}
                                    />
                        })
                    ) : (
                    
                        following.map((e,i) => {

                        return <Follows 
                                modal = {this.Modal}
                                key = {i}
                                user ={e.following_user}
 
                        />
                      
                    })) 
                    }
                </ul>
                   
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