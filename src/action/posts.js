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
                type:'GET_SUCCESS_MASSAGE',
                payload: `Your Post Success Archived`
            })
            dispatch({
                type:'SUCCESS_NOTIFICATIONS'
            })
        
        })
        .catch(e => dispatch({ type:'GET_SUCCESS_MASSAGE', payload: `Your Post Failed Archived Try Again` }))
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
            dispatch({
                type:'GET_SUCCESS_MASSAGE',
                payload: `Your Post Success UnArchived`
            })
        })
        .catch(e => dispatch({ type:'GET_SUCCESS_MASSAGE', payload: `Your Post Failed UnArchived Try Again` }))
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
                return window.location = '/'
            })
            .catch(e => dispatch({ type:'GET_SUCCESS_MASSAGE', payload: `Your Post Failed Delete Try Again` }))
    }
}