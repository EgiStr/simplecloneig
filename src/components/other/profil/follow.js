import React,{ Fragment,useState } from 'react'
import { connect } from 'react-redux'
import { like_post_with,unlike_post_with } from '../../../action/auth'
import Cookies from 'js-cookie'
import axios from '../../../utils/axios'

export const likes = ({postId,user,likes,unlike_post_with,like_post_with}) => {
    const [state,setState] =useState({   
        buttonLikeClass:'small material-icons icon red-text',
        buttonNotClass:'small material-icons icon',
    })
    

    const handleLikeButton = postId => {
        const data = {
            post:postId,
            user:user.user_id
        }

        const config = {
            headers : {
            "Authorization": 'Bearer ' + Cookies.get('access')
            }}

        axios.post('api/like/',data, config)
            .then(res => {
                const prev = localStorage.getItem('like').split(",").map(Number)
                // jiga ga ada id berarti menghapus
                res.data.id === undefined ? setState(prev => ({
                                                    buttonLikeClass :'small material-icons icon',
                                                    buttonNotClass :'small material-icons icon',
                                                }))
                                                : setState(prev =>({
                                                        buttonLikeClass :'small material-icons icon red-text',
                                                        buttonNotClass : 'small material-icons icon red-text',}))  
                res.data.id === undefined ? unlike_post_with(prev,postId) : like_post_with(prev,postId)
                res.data.id === undefined ? likes(prev => ({...prev,likes:prev.likes - 1})) : likes(prev => ({...prev,likes:prev.likes + 1}))
                
            })
            .catch(e => {console.log(e.request)})
    }
    const has_like = localStorage.getItem('like').split(",").map(Number).includes(postId)

    return (
        <Fragment>
              <a onClick={()=>{handleLikeButton(postId)}}><i className={ has_like ? state.buttonLikeClass : state.buttonNotClass }>favorite</i></a>
        </Fragment>
    )
}

const mapStateToProps = state => ({
    user: state.auth.user
})

const mapDispatchToProps = {
    like_post_with,
    unlike_post_with,
}

export default connect(mapStateToProps, mapDispatchToProps)(likes)
