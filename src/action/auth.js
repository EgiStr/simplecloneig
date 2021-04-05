import { parseJwt } from '../components/method/parseJwt'

import axios from '../utils/axios'
import Cookies from 'js-cookie'


export const loginUser = access => dispatch => {
    const config = {
        headers: {
            "Authorization": 'Bearer ' + access,
        }
    }

    axios.get(`auth/me/`,config)
        .then(res => {
            const rawUser = res.data
            const user = parseJwt(rawUser)

            Cookies.set('ud',rawUser)
            dispatch({
                type:'GET_SUCCESS_MASSAGE',
                payload: `Hello ${user.username},Welcome..`
            })
            dispatch({
                type:'LOGIN_SUCCESS',
                payload :user,
            })
        })
} 

export const LogoutAuth = () => dispatch => {
    dispatch({
        type:'GET_SUCCESS_MASSAGE',
        payload: `Logout Success, goodbyee`
    })
    return dispatch({
        type:'LOGOUT_SUCCESS',
    })
}


export const get_post_like = () => dispatch => {
    const config = {
        headers: {
            "Authorization": 'Bearer ' + Cookies.get('access'),
        }
    }
    axios.get('api/post/like/',config)
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
    const config = {
        headers: {
            "Authorization": 'Bearer ' + Cookies.get('access'),
        }
    }
    axios.get('api/post/save/', config)
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
            prev: prev
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

export const like_post_with = (prev,post_id) => dispatch => {

   dispatch({
       type:'LIKE_POST',
       payload: {
           post_id : post_id,
           prev:prev
        }
   })
}
export const unlike_post_with = (prev,post_id) => dispatch => {

   dispatch({
       type:'UNLIKE_POST',
       payload: {
           post_id : post_id,
           prev:prev
       }
   })
}

export const get_post_data = data => dispatch => {
    dispatch({
        type:'GET_POST_DATA',
        payload: data
    })
}

export const get_post_save_data = () => (dispatch,getState) => {
    const config = {
        headers: {
            "Authorization": 'Bearer ' + Cookies.get('access'),
        }
    }
    if(getState().auth.save_post_data.length === 0){
        axios.get('api/save/post/', config )
            .then(res => {
                dispatch({
                    type:'GET_POST_SAVE_DATA',
                    payload: res.data
                })
            })
            .catch(e => console.log(e.request))
    }
    
}

