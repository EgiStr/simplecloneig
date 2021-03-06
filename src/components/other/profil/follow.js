import React,{ useState } from 'react'

import { connect } from 'react-redux'
import Cookies from 'js-cookie'
import axios from '../../../utils/axios'

import { useDispatch } from 'react-redux'

export const Follow = ({follow_id,user,className}) => {
    const dispatch = useDispatch()
    const [state,setState] = useState({   
        follow:'Following',
        unfollow:'Follow',
    })
    

    const handleFollow = () => {

        const config =  {
            headers: {
                "Authorization": 'Bearer ' + Cookies.get('access')
            }
        }

        let form = new FormData();
            form.append('user', follow_id)
            form.append('following_user', user.user_id)

        axios.post('auth/following/',form,config)
            .then(res =>{ 
                const prev = localStorage.getItem('follow').split(",").map(Number)
                res.data.id === undefined ? setState({ follow: 'Follow', unfollow: 'Follow' }) : setState({ follow: 'Following', unfollow: 'Following' })
                res.data.id === undefined ? localStorage.setItem('follow',[prev.filter(e => e !== follow_id)]) : localStorage.setItem('follow',[...prev,follow_id])
                
            })
            .catch(e =>  dispatch({ type:'GET_SUCCESS_MASSAGE', payload: `Failed Follow Try Again`}))

    }

    const data = localStorage.getItem('follow') ? localStorage.getItem('follow').split(',').map(Number).includes(follow_id) : false
    
    const is_follow = data
    

    return <a className={`${className || 'secondary-content'} `} style={{cursor:'pointer',color: state.follow ==='Following' || state.unfollow ==='Following' ? 'rgb(61, 143, 136)' : '#ef6e73'}} onClick={() => handleFollow()} >{is_follow ? state.follow : state.unfollow }</a>  
    
}


const mapStateToProps = state => ({
    user: state.auth.user
})



export default connect(mapStateToProps)(Follow)
