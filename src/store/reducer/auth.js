import {parseJwt} from '../../components/Navbar'
import Cookies from 'js-cookie'

const like_Post = (likePost,post) => {
    likePost.unshift(post) 
    return likePost
 }

 const unLike_Post = (likePost,post) => {
     likePost.filter(lp => lp.post.id,post)
     return likePost
 }

 const access = Cookies.get('access') === undefined ? null : parseJwt(Cookies.get('access'))
 
 const initialState ={
     is_auth :false,
     has_like:false,
     like_post : [],
     user : access,
     
    }
    
const auth = (state = initialState,action) => {

    let py = action.payload
    
    switch (action.type) {
        case 'GET_LIKE_POST':
            localStorage.setItem('like',py)
            return { ...state, 
                like_post: py,
                
            }
            
        case 'LOGIN_SUCCESS':
            console.log('login success',py)
            return {
                ...state,
                is_auth:true,
                user_id : py.user_id,
                username : py.username,
            }
            

        case 'LOGIN_FAIL' :
            return {...state,user_id:null,username:null,is_auth:false}
                
           
        case 'IS_HAS_LIKE':
            return {
                ...state,
                has_like:true,
            }
           
        case 'LIKE_POST':
            return {...state,
                like_post:like_Post(state.like_post,py)
            }
          
        case 'UNLIKE_POST':
            return {...state,
                like_post:unLike_Post(state.like_Post,py)
            }
          
        default:
            return state
        
    }       

}

export default auth ;