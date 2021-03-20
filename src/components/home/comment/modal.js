import React, { Component,lazy,Suspense } from 'react'

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

import { protectAuth } from '../../../utils/auth/auth'

import './comment.css'

const CommentUser = lazy(() => import('./comment'))
class Modal extends Component {
    constructor(props){
        super(props)
        this.state = {
            comment:'',
            
        }
        this.user_id = this.props.user.user_id
       

    }

    componentDidUpdate(prevProps){
        // jiga user ingin mereplies seseorang
        if(prevProps.parent !== this.props.parent || prevProps.username !== this.props.username){  
            // membuat si commet user ada @ diawal
            this.setState(prevState => ({
                comment:`@${this.props.username} ` + prevState.comment
            }))
            // kalau ga ubahnya mengancel replies maka akan menhapus mention @
            if(this.props.parent === null){
                this.setState({comment:''})
            }
        }
    }
    
    componentDidMount(){

        const options = {
            onOpenStart: () => {
                this.props.get_comment(this.props.postId)        
            },
            onCloseEnd: () => {
                this.handleCancel() 
            },
            inDuration: 250,
            outDuration: 250,
            opacity: 0.5,
            dismissible: true,
            startingTop: "4%",
            endingTop: "10%"
        };
          M.Modal.init(this.Modal, options);
        }

       
        handleChange = (event, newValue, newPlainTextValue, mentions) => this.setState({comment:newValue})
        
        // liveSearch buat data mentoin recommend
        handleSearchMention = (query, callback) => {
            delete axios.defaults.headers.common["Authorization"];
            if(query === '') return 
                //  cancal untuk membuat cancel token
                var cancel;

                const config = { cancelToken :  new axios.CancelToken(c => cancel = c ) }
                
                axios.get(`http://127.0.0.1:8000/auth/search/?search=${query}`,config)
                    // membuat membuat promoise unutk memasukan kecallback
                    .then(res => {
                        return new Promise( (resolve,reject) => resolve(res.data.results.map(user => ({display: user.nickname,id:user.id}))))
                    })
                    .then(callback)
                    // return untuk mengancel token
                return () => cancel()
        }
        
        handleCancel = () => {
            this.props.add_username(null)
            this.props.add_parent(null)
            
        }
        
        handleComment = (parent = this.props.parent) => {
            // memastukan user login
            protectAuth(Cookies.get('access'),Cookies.get('refresh')).then(e => e ? '' : '')
            
            let { contentType, obj_id } = this.props
        
            let content = this.state.comment

            const data = {           
                user: this.user_id,
                content_type: contentType,
                obj_id: obj_id,
                content: content,
                parent : parent,
            }
            if(content !== ''){
                axios({
                    method:'POST',
                    url:'http://127.0.0.1:8000/comment/create/',
                    data:data,
                    headers: {
                        "Authorization": 'Bearer ' + Cookies.get('access')
                    },
                })
                    .then(res => {              
                        this.props.add_comment(res.data,parent)
                        this.props.add_parent(null)
                        this.setState({comment:''})
                    })
                    .catch(e => console.log(e) )
            } 
        
    }

    render(){

      
        const comments = this.props.comments
        const parent = this.props.parent
        
      
        return (
            <div ref={ Modal =>  this.Modal = Modal} id={`modal_id${this.props.id}`} className="modal bottom-sheet modal-fixed-footer" style={{width:'100%', height:'40%'}}>
                <div className="modal-content "  >
                    <h4>Comment</h4>

                    <div className="row post-row">
 
                        {comments ? (
                            comments.map((item,i) => {                    
                                    return <Suspense key={i} fallback={<div>loading..</div>}>
                                                <CommentUser 
                                                    key ={i}
                                                    user = {this.user_id === item.user.id}
                                                    id = {item.id}
                                                    profil = {item.user.profil}
                                                    nickname = {item.user.nickname}
                                                    content = {item.content}
                                                    replies = {item.replies}
                                                />
                                            </Suspense>
                                })
                            ) : (null)}       
                    </div>    
                </div>

                <div className="modal-footer row" >
                            {parent ? (<p className="col s12 center-align" onClick={() => this.handleCancel()}> your replies {this.props.username}, click to cancel     </p>) : (null)}
                            <MentionsInput
                                value={this.state.comment}
                                onChange={this.handleChange}
                                placeholder={`add comment as ${this.props.user.username}, @ to mention`}
                                className="mentions col s11 "
                            >
                                <Mention
                                    type="user"
                                    trigger="@"
                                    markup="@__display__ "
                                    data={this.handleSearchMention}
                                    className="mentions__mention"
                                />
                            </MentionsInput>
                            
                            <a className="modal-close waves-effect waves-green btn-flat s1 right" onClick={() => {this.handleComment(this.state.parentid)}}>Send</a>      
                        
                    
                   
                             
 
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