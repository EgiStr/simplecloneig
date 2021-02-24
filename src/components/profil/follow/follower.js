import React ,{ useState , useEffect} from 'react'
import axios from 'axios'
import Cookies from 'js-cookie'
import { is_follow } from '../../../action/follow'
import { connect } from 'react-redux'

const Follower = ({user_id,user,following_user,id_follower}) => {
    const [state,setState] = useState({
                                    follow : 'follow',
                                    unfollow: 'Following',
                                    is_follow : false,
                                    })
    
    useEffect(() => {
        const is_follow_user = check_is_follow(id_follower)
        if(is_follow_user){
            setState({...state,is_follow : true })
        }

    },[])

    const check_is_follow = (id) => {
        const target = following_user
        let trueorfalse = false
        if(target.includes(id)){
            trueorfalse = true
        }
        return trueorfalse 
    }
    
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
                <a className="secondary-content btn" onClick={() => handleFollow()} >{state.is_follow ? state.unfollow : state.follow}</a>
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


export default connect(mapStateToProps)(Follower) ;