import axios from 'axios'


// terbalik di apinya harusnya  following 
export const getFollower = access => dispatch => {
    const config = {
        headers:{
        "Authorization": 'Bearer ' + access
    }}
    axios.get('http://127.0.0.1:8000/auth/follower/detail/',config )
        .then(res => {
            
            localStorage.setItem('follow' , res.data.map(e => e.following_user.id))
            dispatch({
                type:'GET_FOLLOWING',
                payload : res.data,
            })
        })
        .catch(e => console.log(e.request))
}

export const getFollowerUser = (access,id) => dispatch => {
    const config = {
        headers: {
        "Authorization": 'Bearer ' + access
    }}
    
    axios.get(`http://127.0.0.1:8000/auth/following/detail/${id}/`,config)
        .then(res => { 
            dispatch({
                type:'GET_FOLLOWER',
                payload : res.data,
            })
        })
        .catch(e => console.log(e.request))
}

export const getFollowingUser = (access,id) => (dispatch,getstate) => {
    const config = {
        headers: {
        "Authorization": 'Bearer ' + access
    }}

    axios.get(`http://127.0.0.1:8000/auth/follower/detail/${id}/`, config )
        .then(res => {
            dispatch({
                type:'GET_FOLLOWING_USER',
                payload : res.data,
            })
        })
        .catch(e => console.log(e.request))
}

export const is_follow = array => (dispatch,getstate) => {
    const me = getstate().follow.followings.map(e => e.id)
    
    const target = array
    let trueorfalse = false
    
    for(let i =0 ; i < me.length ; i++){
        if(target.includes(me[i])){
            trueorfalse = true
        }

    } 
  
    return dispatch({
        type:'IS_FOLLOWING',
        payload : trueorfalse,
    })
} 