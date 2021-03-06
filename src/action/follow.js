import axios from '../utils/axios'

// terbalik di apinya harusnya  following 
export const getFollower = access => dispatch => {
    const config = {
        headers:{
        "Authorization": 'Bearer ' + access
    }}
    axios.get('auth/follower/detail/',config )
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
    
    axios.get(`auth/following/detail/${id}/`,config)
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

    axios.get(`auth/follower/detail/${id}/`, config )
        .then(res => {
            dispatch({
                type:'GET_FOLLOWING_USER',
                payload : res.data,
            })
        })
        .catch(e => console.log(e.request))
}

