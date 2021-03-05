import { parseJwt } from '../components/method/parseJwt'

import axios from 'axios'
import Cookies from 'js-cookie'


axios.defaults.headers.common['Authorization'] = 'Bearer ' + Cookies.get('access')

export const loginUser = (access) => (dispatch) => {
    const user = parseJwt(access)
    return dispatch({
        type:'LOGIN_SUCCESS',
        payload : user
        
    })
} 

export const get_notif_user = () => dispatch => {
    axios.get(`http://127.0.0.1:8000/notif/user/`,{
        headers: 
                {
                    'Authorization' : 'Bearer ' + Cookies.get('access')
                }
    })
    .then(res => {
       
        dispatch({
            type:'GET_NOTIF',
            payload:res.data
        })
    })
    .catch(e => console.log(e.request))
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


// export const has_like = (mylike,post) => (dispatch) => {
  
//     if(mylike.includes(post)){
//         dispatch({
//             type:'IS_HAS_LIKE',
//         })
    
//     }else{
//         dispatch({type:'NOT_HAS_LIKE'})
//     }

// }

// export const unlike_post_with = (prev,post_id) => (dispatch) => {

//     dispatch({
//         type:'UNLIKE_POST',
//         payload:{
//             post_id : post_id,
//             prev   : prev,
//         }
//     })
// }