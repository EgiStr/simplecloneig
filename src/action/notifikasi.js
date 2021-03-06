
import axios from 'axios'
import Cookies from 'js-cookie'


axios.defaults.headers.common['Authorization'] = 'Bearer ' + Cookies.get('access')

export const get_notif_user = () => (dispatch,getState) => {
    axios.get(`http://127.0.0.1:8000/notif/user/`,{
        headers: 
        {
            'Authorization' : 'Bearer ' + Cookies.get('access')
        }
    })
    .then(res => {
        dispatch({
            type:'GET_NOTIFICATIONS',
            payload: res.data
        })
        dispatch({type:'READ_NOTIFICATIONS'})
        
    })
    .catch(e => console.log(e.request))
}

export const get_notif_login = () => (dispatch,getState) => {
    axios.get(`http://127.0.0.1:8000/notif/user/`,{
        headers: 
        {
            'Authorization' : 'Bearer ' + Cookies.get('access')
        }
    })
    .then(res => {
        dispatch({
            type:'GET_NOTIFICATIONS',
            payload: res.data
        })
        dispatch({
            type:'GET_UNREAD_NOTIFICATIONS',
            payload: getState().notifikasi.notifications.length
        }) 
        
    })
    .catch(e => console.log(e.request))
}

export const clear_notif_user = () => dispatch => {
    dispatch({
        type:'CLEAR_NOTIFICATIONS',
    })
}