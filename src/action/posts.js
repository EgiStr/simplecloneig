import axios from '../utils/axios'
import Cookies from 'js-cookie'

export const PrivePost = id => dispatch => {
    const data = {
        private:true,
    }
    const config = {
        headers: {
        "Authorization": 'Bearer ' + Cookies.get('access')
    }}

    axios.put(`api/${id}/edit/`,data,config)
        .then(res => {
            dispatch({
                type:'SUCCESS_NOTIFICATIONS'
            })
            console.log(res)
        })
        .catch(e =>console.log(e))
}

export const UnPrivePost = id => dispatch => {
    const data = {
        private:false,
    }
    const config = {
        headers: {
        "Authorization": 'Bearer ' + Cookies.get('access')
    }}

    axios.put(`api/${id}/edit/`,data,config)
        .then(res => {
            dispatch({
                type:'SUCCESS_NOTIFICATIONS'
            })
            console.log(res)
        })
        .catch(e =>console.log(e))
}
export const deletePost = id => dispatch => {

    const config = {
        headers: {
        "Authorization": 'Bearer ' + Cookies.get('access')
    }}
    const confirm = window.confirm('are you sure about that ? ')
    if(confirm){
        axios.delete(`api/${id}/edit/`,config)
            .then(res => {
                dispatch({
                    type:'SUCCESS_NOTIFICATIONS',
                })
            })
            .catch(e => console.log(e.request))
    }
}