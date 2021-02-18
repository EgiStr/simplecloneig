import axios from 'axios'


export const get_comment = (post_id) => (dispatch,getstate) => {
    axios.get(`http://127.0.0.1:8000/comment/detail/${post_id}/`)
    .then(res => {
        let py = res.data
      
        dispatch({
            type:'GET_COMMENT',
            payload:py
        })
    })
    .catch(e => console.log(e))
}

export const get_replies = (parent_id) => (dispatch,getstate) => {
    axios.get(`http://127.0.0.1:8000/comment/detail/${parent_id}/replies/`)
    .then(res => {
        let py = res.data
      
        dispatch({
            type:'GET_REPLIES',
            payload:py,
        })
    })
    .catch(e => console.log(e))
}

export const add_comment = (payload,parent) => (dispatch,getstate) => {
    
    if(parent === null){
        dispatch({
            type:'ADD_COMMENTS',
            payload:payload,
        })
    }
}

export const delete_comment = (id,access) => (dispatch,getstate) => {
    axios.delete(`http://127.0.0.1:8000/comment/edit/${id}/`,
    {headers : {
        'Authorization' : 'Bearer ' + access
    }})
    .then(res => {
        console.log(res)
        dispatch({
            type:'DELETE_COMMENTS',
            payload:id,
        })
    })
    .catch(e => console.log(e))
}

export const add_parent = (parent) => (dispatch) => {
    dispatch({
        type:'UPDATE_PARENT',
        payload : parent,
    })
}