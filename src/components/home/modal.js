import React, {Component} from 'react'
import M from "materialize-css";
import Avatar from "@material-ui/core/Avatar";
import axios from 'axios'

import Cookies from 'js-cookie'
import {connect} from 'react-redux'

import {get_comment,add_comment,delete_comment,get_replies} from '../../action/comment'

import {protectAuth} from '../auth/auth'

axios.defaults.headers.common['Authorization'] = 'Bearer ' + Cookies.get('access')

class Modal extends Component {
    
    constructor(props){
        super(props)
        this.state = {
            comment:'',
            parentid : null,
            reply : false,
            getusername:'',
        }
       
    }

    componentDidMount(){
        protectAuth(Cookies.get('access'),Cookies.get('refresh')).then(e => e ? '' : window.location.reload())
        const options = {
            onOpenStart: () => {
                this.props.get_comment(this.props.postId)
            },
            // onOpenEnd: () => {
            //   console.log("Open End");
            // },
            // onCloseStart: () => {
            //   console.log("Close Start");
            // },
            // onCloseEnd: () => {
            //   console.log("Close End");
            // },
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
    
    
    handleComment = (parent = null) => {

        let {contentType,obj_id,user_id} = this.props
        let content = this.state.comment
      
      
        if(content !== ''){
            axios({
                method:'POST',
                url:'http://127.0.0.1:8000/comment/create/',
                headers:{
                    "Authorization": 'Bearer ' + Cookies.get('access')
                  },
                data:{
                    user: user_id,
                    content_type:contentType,
                    obj_id:obj_id,
                    content:content,
                    parent : parent,
                }
    
            })
            .then(res => {
                this.props.add_comment(res.data)
                
                this.setState({comment:'',parentid:null,getusername:'',reply:false})
        
            })
            .catch(e => {console.log(e.request);})
        } 
        
        

    }
    handleRemove = (id) => {
        this.props.delete_comment(id,Cookies.get('access'))
    }
    handleReplies = (parent_id,username) => this.setState({parentid:parent_id,getusername:username,reply:true})

    handlecancle = ()=> this.setState({parentid:null,getusername:'',reply:false})

    hadleGetreplies = (id) => {
        this.props.get_replies(id)
    }

    render(){

        // console.log(this.props.comments.user);
        const comments = this.props.comments
        return (
            <div ref={ Modal => { this.Modal = Modal;}} id={`modal_id${this.props.id}`} className="modal bottom-sheet modal-fixed-footer">
                <div className="modal-content " ref={node => this.modalRef = node}>
                    <h4>Comment</h4>

                    <div className="row post-row">
                    
                        <ul className="collection">
                            {comments ? (
                                comments.map((item) => {
                                    if(this.props.user_id === item.user.id) {
                                        return (<li key={Math.floor(Math.random() * Math.floor(Math.random() * Date.now()))} className="collection-item avatar">                                       
                                        <img loading='lazy' src={`http://127.0.0.1:8000${item.user.profil}`} className="circle" alt="...."/>
                                        <span className="title">{item.user.nickname}</span>
                                        <p>{item.content}</p>
                                        <a className="btn" onClick={()=>{this.handleRemove(item.id)}}><i className="material-icons">send</i></a>
                                        <a className="secondary-content btn" onClick={()=>{this.handleReplies(item.id,item.user.nickname)}}><i className="material-icons">send</i></a>
                                        {item.replies.length > 0 ? (<p onClick={() => this.hadleGetreplies(item.id)}>view replies {item.replies.length} </p>) : ( null)}
                                        </li>) }
   
                                    else{
                                        return( 
                                                <li key={Math.floor(Math.random() * Math.floor(Math.random() * Date.now()))} className="collection-item avatar">                                       
                                                    <img loading='lazy' src={`http://127.0.0.1:8000${item.user.profil}`} className="circle" alt="...."/>
                                                    <span className="title">{item.user.nickname}</span>
                                                    <p>{item.content}</p>
                                                    <a className="secondary-content btn" onClick={()=>{this.handleReplies(item.id,item.user.nickname)}}><i className="material-icons">send</i></a>
                                                    {item.replies.length > 0 ? (<p>view replies {item.replies.length} </p>) : ( null)}
                                                </li>                    
                                        
                                )}})
                            ) : (null)}
                           
                        </ul>
                    </div>
                    {/* style={{position:'fixed',bottom:0,left:0,}} need fix position */}
                </div>
                <div className="modal-footer" style={{height:'110px'}}>
                <div className="col s3 l2 offset-l1">
                            <Avatar  className="avatar" alt="foto" src={this.props.profil} height="45" width="45" />
                        </div>
                        <div className="col s6 l5 post-btn-container" >
                            {this.state.reply ? (<p onClick={() => {this.handlecancle()}}>your replies {this.state.getusername} click to cancle</p>) : (null)}
                        
                            <input
                                ref={node => {this.refComment = node}}
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
        user_id : state.auth.user.user_id,
        comments : state.comment.comments,
        replies : state.comment.replies,

    }
}

export default connect(mapStateToProps,{get_comment,add_comment,delete_comment,get_replies})(Modal) ;