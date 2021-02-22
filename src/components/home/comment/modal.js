import React, {Component} from 'react'
import M from "materialize-css";

import Avatar from "@material-ui/core/Avatar";
import axios from 'axios'

import Cookies from 'js-cookie'
import { connect } from 'react-redux'

import { get_comment,
         add_comment,
         add_parent
                        } from '../../../action/comment'

import CommentUser  from './comment'


import { protectAuth } from '../../auth/auth'
import { parseJwt } from '../../navbar/Navbar'
axios.defaults.headers.common['Authorization'] = 'Bearer ' + Cookies.get('access')

const user_id = parseJwt(Cookies.get('access')).user_id

class Modal extends Component {
    state = {
        comment:'',
        getusername:'',
    }

    componentDidMount(){
        protectAuth(Cookies.get('access'),Cookies.get('refresh')).then(e => e ? '' : window.location.reload())
        const options = {
            onOpenStart: () => {
                this.props.get_comment(this.props.postId)
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

    handleCommentContent = (event) => this.setState({comment:event.target.value})
    handlecancle = () =>  this.props.add_parent(null)
    
    handleComment = (parent = this.props.parent) => {

        let {contentType,obj_id} = this.props
        let content = this.state.comment

        if(content !== ''){
            axios({
                method:'POST',
                url:'http://127.0.0.1:8000/comment/create/',
                data:{
                    
                    user: user_id,
                    content_type:contentType,
                    obj_id:obj_id,
                    content:content,
                    parent : parent,
                },
                headers: {
                    "Authorization": 'Bearer ' + Cookies.get('access')
                        },
                
            })
            .then(res => {
             
                this.props.add_comment(res.data,parent)
                this.props.add_parent(null)
                this.setState({comment:''})
                
        
            })
            .catch(e => {console.log(e);})
        } 
        
        

    }

    render(){

        // console.log(this.props.comments.user);
        const comments = this.props.comments
        const parent = this.props.parent
      
        return (
            <div ref={ Modal => { this.Modal = Modal;}} id={`modal_id${this.props.id}`} className="modal bottom-sheet modal-fixed-footer">
                <div className="modal-content " ref={node => this.modalRef = node}>
                    <h4>Comment</h4>

                    <div className="row post-row">
                        {comments ? (
                                comments.map((item,i) => {
                                       return <CommentUser 
                                            key ={i}
                                            user = {user_id === item.user.id}
                                            id = {item.id}
                                            profil = {item.user.profil}
                                            nickname = {item.user.nickname}
                                            content = {item.content}
                                            replies = {item.replies}
                                        />
                                })
                            ) : (null)}
                           
                        
                    </div>
                    {/* style={{position:'fixed',bottom:0,left:0,}} need fix position */}
                </div>
                <div className="modal-footer" style={{height:'110px'}}>
                <div className="col s3 l2 offset-l1">
                            <Avatar  className="avatar" alt="foto" src={this.props.profil} height="45" width="45" />
                        </div>
                        <div className="col s6 l5 post-btn-container" >
                            {parent ? (<p onClick={() => {this.handlecancle()}}>your replies click cancel </p>) : (null)}
                        
                            <input
                                value={this.state.comment}
                                onChange={(event) => {this.handleCommentContent(event)}}
                                placeholder={`Add a comment To post. ${this.props.username}` }
                            />        
                        </div>
                    <a className="modal-close waves-effect waves-green btn-flat" onClick={() => {this.handleComment(this.state.parentid)}}>
                    Send 
                    </a>
                    <a className="modal-close waves-effect waves-green btn-flat" >
                    cancel 
                    </a>
                </div>
        </div>
        )
    }
    
}

const mapStateToProps = state => {
    return {
        parent : state.comment.parent,
        comments : state.comment.comments,
       
    }
}

export default connect(mapStateToProps,{get_comment,add_parent,add_comment})(Modal) ;