import React, {Component} from 'react'
import M from "materialize-css";
import Avatar from "@material-ui/core/Avatar";
import axios from 'axios'
import {parseJwt} from './Navbar';

class Modal extends Component {
    constructor(props){
        super(props)
        this.state = {
            comment:'',
        }
        this.handleComment = this.handleComment.bind(this)
    }
    componentDidMount(){
        this.setState({comment:''})
        const options = {
            onOpenStart: () => {
              console.log("Open Start");
            },
            onOpenEnd: () => {
              console.log("Open End");
            },
            onCloseStart: () => {
              console.log("Close Start");
            },
            onCloseEnd: () => {
              console.log("Close End");
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

    handleCommentContent(event){
        this.setState({comment:event.target.value})
    }
    
    handleComment(parent = null){

        let user,content_type,obj_id

        user = parseJwt(localStorage.getItem('token')).user_id
        content_type = this.props.contentType
        obj_id = this.props.obj_id
        let content = this.state.comment

        if(content !== ''){
            axios({
                method:'POST',
                url:'http://127.0.0.1:8000/comment/create/',
                headers:{
                    "Authorization": 'Bearer ' + localStorage.getItem('token')
                  },
                data:{
                    user: user,
                    content_type:content_type,
                    obj_id:obj_id,
                    content:content,
                    parent : parent,
                }
    
            })
            .then(res => {
                this.setState({comment:''})
                console.log(res)
            })
            .catch(e => {console.log(e);})
        } 
        

    }

    render(){
        console.log(this.props.comments);
        console.log(this.props.comments.user);
        const comments = this.props.comments
        return (
            <div ref={ Modal => { this.Modal = Modal;}} id="modal_id" className="modal bottom-sheet">
                <div className="modal-content">
                    <h4>Comment</h4>

                    <div className="row post-row">
                    
                        <ul className="collection">
                            {comments ? (
                                comments.map((item) => {
                                    return (
                                    <li className="collection-item avatar">
                                        
                                        <img src={`http://127.0.0.1:8000${item.user.profil}`} className="circle" />
                                        <span className="title">{item.user.nickname}</span>
                                        <p>
                                            {item.content}
                                        </p>
                                        <a className="secondary-content btn" onClick={()=>{this.handleComment(item.id)}}><i className="material-icons">send</i></a>
                                    </li>
                                    )
                                })
                            ) : (null)}
                           
                        </ul>
                    </div>
                    <div className="row post-row">
                        <div className="col s3 l2 offset-l1">
                            <Avatar  className="avatar" alt="foto" src={this.props.profil} height="45" width="45" />
                        </div>
                        <div className="col s6 l5 post-btn-container">
                            <input
                                value={this.state.comment}
                                onChange={(event) => {this.handleCommentContent(event)}}
                                placeholder={`Add a comment To post. ${this.props.username}` }
                            />        
                        </div>
                    </div>
                </div>
                <div className="modal-footer">
                    <a className="modal-close waves-effect waves-green btn-flat" onClick={() => {this.handleComment()}}>
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

export default Modal