import React ,{ useState , useEffect} from 'react'

import axios from 'axios'
import Cookies from 'js-cookie'
import { is_follow } from '../../../action/follow'
import { connect } from 'react-redux'


const Following = ({user_id,user,is_follow,is_user_follow,id_following}) => {
    const [state,setState] = useState({
                                    follow : 'follow',
                                    unfollow: 'unfollow'
                                    })
    useEffect(() => {
        is_follow([id_following])
    },[user])
    
    const handleFollow = () => {
        let formData = new FormData ;
        formData.append('user', user.id)
        formData.append('following_user',user_id)
        axios.post('http://127.0.0.1:8000/auth/following/',
        formData,{
            headers:{
                "Authorization": 'Bearer ' + Cookies.get('access')
            }})
            .then(res => {
                res.data.id === undefined ? setState({follow:'follow',unfollow:'follow'}) : setState({follow:'Following',unfollow:'Following'})
            })
            .catch(e => console.log(e))
        
    }

    return (
        <ul className="collection">
            <li key={Math.floor(Math.random() * Math.floor(Math.random() * Date.now()))} className="collection-item avatar">                                       
                <img loading='lazy' src={`http://127.0.0.1:8000${user.profil}`} className="circle" alt="...."/>
                <span className="title">{user.nickname}</span>
                <a className="secondary-content btn" onClick={() => {handleFollow()}} >{is_user_follow ? state.unfollow : state.follow}</a>
            </li>
        </ul>
    )
}

const mapStateToProps = state => {
    return {
      is_user_follow:state.follow.is_following,
      user_id : state.auth.user.user_id,
    }
}

export default connect(mapStateToProps,{is_follow})(Following) ;