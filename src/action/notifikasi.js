
import axios from '../utils/axios'
import Cookies from 'js-cookie'


export const get_notif_user = () => (dispatch,getState) => {
    const config = {
        headers: {
        "Authorization": 'Bearer ' + Cookies.get('access')
    }}
    
    if(Number(localStorage.getItem('notif')) > 0){
        axios.put(`notif/update/`, null, config)
            .then(res => dispatch({ type:'READ_NOTIFICATIONS' }))
            .catch(e => console.log(e.request))
    }
    
    if(getState().notifikasi.notifications.length === 0){
        axios.get(`notif/user/`, config )
            .then(res => {
                dispatch({
                    type:'GET_NOTIFICATIONS',
                    payload: res.data
                })
            })
            .catch(e => console.log(e.request))
    }
}

export const get_notif_login = () => dispatch => {
    const config = {
        headers: {
        "Authorization": 'Bearer ' + Cookies.get('access')
    }}

    axios.get(`notif/user/`,config )
        .then(res => {
            dispatch({
                type:'GET_NOTIFICATIONS',
                payload: res.data
            })
        
            dispatch({
                type:'GET_UNREAD_NOTIFICATIONS',
                payload: res.data.filter(e => e.is_seen !== true).length
            }) 
            
        })
        .catch(e => console.log(e.request))
}


