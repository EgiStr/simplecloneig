import {parseJwt} from '../../components/navbar/Navbar'
import Cookies from 'js-cookie'

const like_Post = (prev,post) => {
    
    prev.push(Number(post))

    localStorage.setItem('like',prev)
    return prev
}

const unLike_Post = (prev,post) => {
    
    
    const newlike = prev.filter(v => v !== post)
    
    localStorage.setItem('like',newlike)
    return prev
 }

 const access = Cookies.get('access') === undefined ? null : parseJwt(Cookies.get('access'))
 
 const initialState ={

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
           
            return {
                ...state,
                is_auth:true,
                user_id : py.user_id,
                username : py.username,
            }
            

        case 'LOGIN_FAIL' :
            return {...state,user_id:null,username:null,is_auth:false}
        
           
        case 'LIKE_POST':
        
            return {...state,
                like_post:like_Post(py.prev,py.post_id)
            }
            
        case 'UNLIKE_POST':
        
            return {
                ...state,
                like_post: unLike_Post(py.prev,py.post_id)
            }
            
        default:
            return state
        
    }       

}

export default auth ;