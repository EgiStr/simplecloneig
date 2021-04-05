import React, {useState,useEffect} from 'react'

import axios from 'axios'

import Cookies from 'js-cookie'
import { MentionsInput, Mention } from 'react-mentions'
import { connect } from 'react-redux'

import { get_comment,
         add_comment,
         add_parent,
         add_username,
         
                        } from '../../../action/comment'


import { useDispatch } from 'react-redux'

import '../../detail/comment/comment.css'


const commentHandle = (props) => {
    const dispatch = useDispatch()
    const [content,setContent] = useState('')
    useEffect(() => {
        setContent(prevState => `@${props.username} ` + prevState)   

        if(props.parent === null) setContent('')
        
    },[props.parent])

    const handleSearchMention = (query, callback) => {
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
    const handleComment = () => {
        // memastukan user login
        
        let { contentType, obj_id } = props


        const data = {           
            user: props.user.user_id,
            content_type: contentType,
            obj_id: obj_id,
            content: content,
            parent : props.parent,
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
                    dispatch({ type:'GET_SUCCESS_MASSAGE', payload: `Comment Success Created`})     
                    props.add_comment(res.data,props.parent)
                    props.add_parent(null)
                    setContent('')
                })
                .catch(e => dispatch({ type:'GET_SUCCESS_MASSAGE', payload: `Comment Failed Created Try Again`}))
        } 
    }
    const handleChange = (event, newValue, newPlainTextValue, mentions) => setContent(newValue)
        
    const handleCancel = () => {
        props.add_username(null)
        props.add_parent(null)
        
    }
    return (
        <div>
               {props.parent && <p className="col s12 center-align" onClick={() => handleCancel()}> your replies {props.username}, click to cancel </p> }
                            <MentionsInput
                                value={content}
                                onChange={handleChange}
                                placeholder={`add comment as ${props.user.username}, @ to mention`}
                                className="mentions col s10"
                            >
                                <Mention
                                    type="user"
                                    trigger="@"
                                    markup="@__display__ "   
                                    data={handleSearchMention}
                                    className="mentions__mention"
                                />
                            </MentionsInput>
                            <button className="btn btn-flat col s2"  onClick={() => {handleComment()}}>
                                    Post
                            </button>
        </div>
    )
}

const mapStateToProps = (state) => ({
    user : state.auth.user,
    parent : state.comment.parent,
    username : state.comment.username,
})

const mapDispatchToProps = { 
    get_comment,
    add_comment,
    add_parent,
    add_username,
                   }

export default connect(mapStateToProps, mapDispatchToProps)(commentHandle)
