import React ,{ useState , useEffect} from 'react'


import M from "materialize-css";

import axios from 'axios'
import Cookies from 'js-cookie'
import { connect } from 'react-redux'

const Following = ({user_id,user,id_following,modal}) => {

    const [state,setState] = useState({
                                    follow : 'follow',
                                    unfollow: 'unfollow',
                                    is_follow : false,
                               
                                })

    useEffect(() => {

        
        const is_follow_user = check_is_follow(id_following)
        if(is_follow_user){
            setState({...state,is_follow : true })
        }

    },[])

    const check_is_follow = (id) => {
        
        const target = localStorage.getItem('follow').split(',').map(Number)
       
        if(target.includes(id.following_user.id)){
            return true
        }
        return false 
    }
    
    const handleFollow = () => {
        const config ={
            headers:{
                "Authorization": 'Bearer ' + Cookies.get('access')
            }}
    
        let formData = new FormData() ;
            formData.append('user', user.id)
            formData.append('following_user',user_id)
        axios.post('http://127.0.0.1:8000/auth/following/',formData,config)
            .then(res => {
                const prev = localStorage.getItem('follow').split(",").map(Number)
                res.data.id === undefined ? setState({follow:'follow',unfollow:'follow'}) : setState({follow:'Following',unfollow:'Following'})
                res.data.id === undefined ? localStorage.setItem('follow',[prev.filter(e => e !== user.id)]) : localStorage.setItem('follow',[...prev,user.id])
            })
            .catch(e => console.log(e))    
    }

    const redirect = () => {
        var instance = M.Modal.getInstance(modal);
        instance.close();
        window.location =`/profile/${user.nickname}`
    }

    return (
        <ul className="collection">
            <li  key={Math.floor(Math.random() * Math.floor(Math.random() * Date.now()))} className="collection-item avatar">                                       
                <img loading='lazy' src={`http://127.0.0.1:8000${user.profil}`} className="circle" alt="...."/>
                <span style={{cursor: "pointer"}} className="title" onClick={() => redirect() }>{user.nickname}</span>
                {user.id === user_id ? '' 
                : <a className="secondary-content btn" onClick={() => handleFollow()} >{state.is_follow ? state.unfollow : state.follow}</a>}
            </li>
        </ul>
    )
}

const mapStateToProps = state => {
    return {
      user_id : state.auth.user.user_id,
      following_user : state.follow.followings
    }
}

export default connect(mapStateToProps)(Following) ;