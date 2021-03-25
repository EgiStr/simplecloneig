import { parseJwt } from '../../components/method/parseJwt'
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

const save_Post = (prev,post) => {
    
    prev.push(Number(post))
    localStorage.setItem('save',prev)
    return prev
}

const unsave_Post = (prev,post) => {
    
    const newlike = prev.filter(v => v !== post)
    localStorage.setItem('save',newlike)
    return prev
}

// problem saat beda token 
const access = Cookies.get('access') === undefined ? null : parseJwt(Cookies.get('ud')) 
const initialState ={

     like_post : [],
     save_post : [],
     save_post_data : [],
     post_data : [],
     user : access,
     
    }
    
const auth = (state = initialState,action) => {
    
    let py = action.payload
    
    switch (action.type) {
        
        case 'LOGIN_SUCCESS':
           
            return {
                ...state,
                user:py
            }
        case 'LOGOUT_SUCCESS':
            return {
                ...state,
                user:null,
            }
           
        case 'GET_LIKE_POST':
            localStorage.setItem('like',py)
            return { ...state, 
                like_post: py,
                
            }
        case 'GET_SAVE_POST':
            localStorage.setItem('save',py)
            return {
                ...state,
                save_post:py
            }

        case 'SAVE_POST':
            return {
                ...state,
                save_post : save_Post(py.prev,py.post_id)
            }

        case 'UNSAVE_POST':
            return {
                ...state,
                save_post : unsave_Post(py.prev,py.post_id)
            }

        case 'LIKE_POST':
        
            return {
                ...state,
                like_post:like_Post(py.prev,py.post_id)
            }
            
        case 'UNLIKE_POST':
        
            return {
                ...state,
                like_post: unLike_Post(py.prev,py.post_id)
            }

        case 'GET_POST_DATA':
            return {
                ...state,
                post_data: py
            }
        case 'GET_POST_SAVE_DATA':
            return {
                ...state,
                save_post_data : py
            }
            
        default:
            return state

    }       

}


export default auth ;