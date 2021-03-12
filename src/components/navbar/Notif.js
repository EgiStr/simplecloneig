import React , {useEffect,useState} from 'react'
import { Avatar } from '@material-ui/core'
import axios from 'axios'
import Cookies from 'js-cookie'
import { connect } from 'react-redux'

import '../../notif.css'

const Notif = ({user_id,post,sender,text,type}) => {
    
    const [state,setState] = useState({
        follow : 'follow back',
        unfollow: 'following',
        is_follow : false,
        redirect : false
   
    })


    useEffect(() => {
        if(type === 2) {
            const is_follow_user = check_is_follow(sender.id)
            if(is_follow_user) setState({...state,is_follow : true })
        }
    },[])

    const check_is_follow = (id) => {
        if(localStorage.getItem('follow') !== null){
            const target = localStorage.getItem('follow').split(",").map(Number)
            if(target.includes(id)){
                return true
            }
            return false 
        }else{
            window.location.reload()
        }
    }

    const handleFollow = () => {
        let formData = new FormData() ;
        formData.append('user', sender.id)
        formData.append('following_user',user_id)
        axios.post('http://127.0.0.1:8000/auth/following/',
        formData,{
            headers:{
                "Authorization": 'Bearer ' + Cookies.get('access')
            }})
            .then(res => {
                const prev = localStorage.getItem('follow').split(",").map(Number)
                res.data.id === undefined ? setState({follow:'follow back',unfollow:'follow back'}) : setState({follow:'Following',unfollow:'Following'})
                res.data.id === undefined ? localStorage.setItem('follow',[prev.filter(e => e !== sender.id)]) : localStorage.setItem('follow',[...prev,sender.id])
               
            })
            .catch(e => console.log(e.request))
        
    }
    
    return (
        <div className="notif">
            <div className="notif-profile">
                <Avatar
                            className="avatar"
                            alt="foto"
                            src={'http://127.0.0.1:8000'+sender.profil}
                            width={30}
                            height={30}
                           
                        />
                <div className="notif-txt" onClick={() => window.location = `/profile/${sender.nickname}`} ><b> {sender.nickname}</b>{text}</div>
            </div>
            {type === 2 ? (
                <button className="follow" onClick={() => handleFollow() } >{state.is_follow ? state.unfollow : state.follow}</button>
                        ) : (
                        <img
                            className="follow"
                            alt="foto"
                            src={'http://127.0.0.1:8000'+post.post}
                            width={40}
                            height={40}
                        />
            )}
        </div>
    )
}
const mapStateToProps = state => {
    return {
        user_id : state.auth.user.user_id,
    }
}
export default connect(mapStateToProps)(Notif)
