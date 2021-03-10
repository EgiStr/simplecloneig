import { parseJwt } from '../components/method/parseJwt'

import axios from 'axios'
import Cookies from 'js-cookie'



export const loginUser = (access) => (dispatch) => {
    const user = parseJwt(access)
    return dispatch({
        type:'LOGIN_SUCCESS',
        payload : user
        
    })
} 

export const LogoutAuth = () => dispatch => {
    return dispatch({
        type:'LOGOUT_SUCCESS',
    })
}


export const get_post_like = () => (dispatch) => {
    
    axios.get('http://127.0.0.1:8000/api/post/like/',{
        headers:
        {
            "Authorization": 'Bearer ' + Cookies.get('access'),
        }
    })
    .then(res => {
        
        const post = res.data.map(e => e.post)
        dispatch({
            type:'GET_LIKE_POST',
            payload : post
        })
    })
    .catch(e => console.log(e.request))
}

export const get_post_save = () => dispatch => {
    axios.get('http://127.0.0.1:8000/api/post/save/',{
        headers:
        {
            "Authorization": 'Bearer ' + Cookies.get('access'),
        }
    })
    .then(res => {
        const post = res.data.map(e => e.post)
        dispatch({
            type:'GET_SAVE_POST',
            payload : post
        })
    })
    .catch(e => console.log(e.request))
}

export const post_save = (prev,post_id) => dispatch => {
    dispatch({
        type:'SAVE_POST',
        payload : {
            post_id : post_id,
            prev:prev
        },
    })
}

export const post_unsave = (prev,post_id) => dispatch => {
    dispatch({
        type: 'UNSAVE_POST',
        payload:{
            post_id : post_id,
            prev:prev
        }
    })
}

export const like_post_with = (prev,post_id) => (dispatch) => {

   dispatch({
       type:'LIKE_POST',
       payload:{
           post_id : post_id,
           prev:prev
       }
   })
}
export const unlike_post_with = (prev,post_id) => (dispatch) => {

   dispatch({
       type:'UNLIKE_POST',
       payload:{
           post_id : post_id,
           prev:prev
       }
   })
}
export const get_post_data = (data) => dispatch => {
    dispatch({
        type:'GET_POST_DATA',
        payload: data
    })
}

export const get_post_save_data = () => dispatch => {
    axios.get('http://127.0.0.1:8000/api/save/post/',{
        headers:
        {
            "Authorization": 'Bearer ' + Cookies.get('access'),
        }
    })
    .then(res => {
        dispatch({
            type:'GET_POST_SAVE_DATA',
            payload: res.data
        })
    })
    
}