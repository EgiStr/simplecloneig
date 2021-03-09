import React, { Component } from 'react'

import M from "materialize-css";
import Avatar from "@material-ui/core/Avatar";

import axios from 'axios'

import Cookies from 'js-cookie'
import { MentionsInput, Mention } from 'react-mentions'
import { connect } from 'react-redux'

import { get_comment,
         add_comment,
         add_parent,
         add_username,
         
                        } from '../../../action/comment'

import CommentUser  from './comment'

import { protectAuth } from '../../auth/auth'

import './mentionStyle.css'
axios.defaults.headers.common['Authorization'] = 'Bearer ' + Cookies.get('access')

 

class Modal extends Component {
    constructor(props){
        super(props)
        this.state = {
            comment:'',
            
        }
        this.user_id = this.props.user.user_id

    }
    componentDidUpdate(prevProps){
        if(prevProps.parent !== this.props.parent){       
            this.setState(prevState => ({
                comment:`@${this.props.username} ` + prevState.comment
            }))
            if(this.props.parent === null){
                this.setState({comment:''})
            }
        }
        // console.log(this.state.comment === '')
    }
    
    componentDidMount(){
        

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

       
        handleChange = (event, newValue, newPlainTextValue, mentions) => {
            
            this.setState({
                comment:newValue,
            })
        }

        handleSearchMention = (query, callback) => {
            if(query === '') return 
                //  cancal untuk membuat cancel token 
                var cancel;
                axios.get(`http://127.0.0.1:8000/auth/search/?search=${query}`,
                    {
                        cancelToken :  new axios.CancelToken(c => cancel = c)
                    })
                    // membuat membuat promoise unutk memasukan kecallback
                    .then(res => {
                        return new Promise((resolve,reject) => {
                            resolve(res.data.results.map(user => ({display: user.nickname,id:user.id})))
                        })
                    })
                    .then(callback)
                return () => cancel()
          
        }
        
        handleCancel = ()=> {
            this.props.add_username(null)
            this.props.add_parent(null)
        }
        
        handleComment = (parent = this.props.parent) => {
            
            protectAuth(Cookies.get('access'),Cookies.get('refresh')).then(e => e ? '' : '')
            
            let { contentType,obj_id } = this.props
        
            let content = this.state.comment

            if(content !== ''){
                axios({
                    method:'POST',
                    url:'http://127.0.0.1:8000/comment/create/',
                    data:{
                        
                        user: this.user_id,
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

      
        const comments = this.props.comments
        const parent = this.props.parent
        
      
        return (
            <div ref={ Modal =>  this.Modal = Modal} id={`modal_id${this.props.id}`} className="modal bottom-sheet modal-fixed-footer">
                <div className="modal-content " ref={node => this.modalRef = node}>
                    <h4>Comment</h4>
                   

                    <div className="row post-row">
                        
                        {comments ? (
                                comments.map((item,i) => {
                                    
                                       return <CommentUser 
                                            key ={i}
                                            user = {this.user_id === item.user.id}
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
                            <Avatar  className="avatar" alt="foto" src={`http://127.0.0.1:8000${this.props.user.profil}`} height="45" width="45" />
                        </div>
                        <div className="col s6 l5 post-btn-container" >
                            {parent ? (<p onClick={() => this.handleCancel()}>your replies {this.props.username} click cancel  </p>) : (null)}
                            <MentionsInput
                                value={this.state.comment}
                                onChange={this.handleChange}
                                placeholder="Type anything, use the @ symbol to tag other users."
                                className="mentions"
                            >

                            <Mention
                                type="user"
                                trigger="@"
                                markup="@__display__ "
                                data={this.handleSearchMention}
                                className="mentions__mention"
                            />
                            </MentionsInput>
                        
                        </div>
                    <a className="modal-close waves-effect waves-green btn-flat" onClick={() => {this.handleComment(this.state.parentid)}}>
                    Send 
                    </a>
                    <a className="modal-close waves-effect waves-green btn-flat" onClick={() => this.handleCancel()}>
                    cancel 
                    </a>
                </div>
        </div>
        )
    }
    
}

const mapStateToProps = state => {
    return {
        user : state.auth.user,
        parent : state.comment.parent,
        username : state.comment.username,
        comments : state.comment.comments,
       
    }
}

export default connect(mapStateToProps,{get_comment,add_parent,add_comment,add_username  })(Modal) ;