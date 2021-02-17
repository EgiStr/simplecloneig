import axios from 'axios'
import Cookies from 'js-cookie'


axios.defaults.headers.common['Authorization'] = 'Bearer ' + Cookies.get('access')


export const getFollower = (access) => (dispatch,getstate) => {
    
    axios.get('http://127.0.0.1:8000/auth/follower/detail/',
    {headers:{
        "Authorization": 'Bearer ' + access
    }})
    .then(res => {
        const following = res.data.map(e => e.id)
    
        dispatch({
            type:'GET_FOLLOWING',
            payload : following,
        })
    })
    .catch(e => console.log(e.request))
}

export const is_follow = (array) => (dispatch,getstate) => {
    const me = getstate().follow.followings
   
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