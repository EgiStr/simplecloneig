import axios from '../utils/axios'


export const get_comment = post_id => dispatch => {
    axios.get(`comment/detail/${post_id}/`)
        .then(res => {
            let py = res.data
        
            dispatch({
                type:'GET_COMMENT',
                payload:py
            })
        })
        .catch(e => console.log(e.request))
}

export const get_replies = parent_id => dispatch => {
    axios.get(`comment/detail/${parent_id}/replies/`)
        .then(res => {
            let py = res.data
        
            dispatch({
                type:'GET_REPLIES',
                payload:py,
            })
        })
        .catch(e => console.log(e.request))
}

export const add_comment = (payload,parent) => dispatch => {
    
    if(parent === null){
        dispatch({
            type:'ADD_COMMENTS',
            payload:payload,
        })
    }
}

export const delete_comment = (id,access) => dispatch => {
    const config = {
        headers : {
        'Authorization' : 'Bearer ' + access
    }}

    const confirm = window.confirm('are you sure about that ? ')
    if(confirm){
        axios.delete(`comment/${id}/edit/`,config)
            .then(res => {
                dispatch({
                    type:'DELETE_COMMENTS',
                    payload:id,
                })
            })
            .catch(e => console.log(e.request))
    }
}

export const delete_comment_replies = (id,access) => dispatch => {
    const config = {
        headers : {
            'Authorization' : 'Bearer ' + access
    }}

    const confirm = window.confirm('are you sure about that ? ')
    
    if(confirm){
        axios.delete(`comment/${id}/edit/`,config)
        .then(res => {
           
            dispatch({
                type:'DELETE_COMMENTS_REPLIES',
                payload:id,
            })
        })
        .catch(e => console.log(e.request))
    }
}

export const add_parent = parent => dispatch => {
    dispatch({
        type:'UPDATE_PARENT',
        payload : parent,
    })
}
export const add_username = username => dispatch => {
    dispatch({
        type:'UPDATE_USERNAME',
        payload : username,
    })
}
export const reset_replies = () => dispatch => {
    dispatch({
        type:'RESET_REPLIES'
    })
}