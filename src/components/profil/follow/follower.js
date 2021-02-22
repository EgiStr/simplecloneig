import React , {useState} from 'react'

const Follower = ({user}) => {
    return (
        <ul className="collection">
            <li key={Math.floor(Math.random() * Math.floor(Math.random() * Date.now()))} className="collection-item avatar">                                       
                <img loading='lazy' src={`http://127.0.0.1:8000${user.profil}`} className="circle" alt="...."/>
                <span className="title">{user.nickname}</span>
                <a className="secondary-content btn" >follow</a>
            </li>
        </ul>
    )
}
export default Follower