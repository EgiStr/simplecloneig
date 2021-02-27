// const follower = (followers, n) => {
//     followers.unshift(n)
//     return followers
// }
// const unfollower = (followers, n) =>
//   followers.filter(ff => ff.id !== parseInt(n))

const following = (followings, n) => {
  followings.unshift(n)
  return followings
}

const unfollowing = (followings, n) => {
    followings.filter(ff => ff.id !== parseInt(n,10))
//   followings.filter(ff => ff.id !== parseInt(n))
  return followings 
}




const initialState = {
    is_following : false,
    followers : [],
    followings : [],
    followingUser : [],

}

const follow = (state = initialState,action) => {
    let py = action.payload
   
    switch (action.type) {
        case 'IS_FOLLOWING':
            return { ...state, is_following: py }
           
        case 'GET_FOLLOWER':
            return {...state,followers:py}
            
        case 'GET_FOLLOWING_USER':
            return {...state,followingUser:py}
            
        case 'GET_FOLLOWING':
            return {...state,followings:py}
                
        case 'FOLLOWING':
            return {...state,followings:following(state.followings,py)}
           
        case 'UNFOLLOWING':
            return {...state,followings:unfollowing(state.followings,py)}
           
        default:
            return state
        
    }       

}
export default follow ;