import React, { useEffect,useState } from 'react'

import { Redirect,Link } from 'react-router-dom'

import M from "materialize-css";

import { connect } from 'react-redux'
import { get_notif_user } from '../../action/notifikasi'
import { NotifDropdown } from './notifDropdown'
import { SearchDropdown } from './SearchDropdown'

import { AvatarProfil } from '../../utils/auth/profil';


function Navbar({ user,notif,read,get_notif_user }) {
    
    
    if(window.location.pathname === '/register') return <Redirect to={'/register'} />
    if(window.location.pathname === '/forget-password/comfirm/') return <p></p>        
    if (user === null && window.location.pathname !== '/forget-password/comfirm/') return <Redirect to={'/login'} />
   
    const [toggleN,setToggleN] = useState(false)
    const [toggleS,setToggleS] = useState(false)
    
    useEffect(() => {
        var elems = document.querySelectorAll('.dropdown-trigger');
        M.Dropdown.init(elems, {});
        
    },[notif,read]);
    
    const notifTrigger = () => {
        if(toggleS ) setToggleS(false)
        
        setToggleN(prev => !prev)
        get_notif_user()
        
    }
    const searchTrigger = () => {
        if(toggleN) setToggleN(false)
        
        setToggleS(prev => !prev)
        
    }
    const notifNum = localStorage.getItem('notif') ? Number(localStorage.getItem('notif')) : Number(read)
    
    return (
        <div className="navbar-fixed">
            <nav>
                <div className="container">                
                    <div className="nav-wrapper">
            
                            
                        <Link to={'/'} className="brand-logo left">SnapThin</Link>
                        <ul className="right">
                            
                            <li><Link to={'/'} ><i className="material-icons">home</i></Link></li>
                            <li><a onClick={() => searchTrigger()}><i className="material-icons">search</i></a></li>
                            <li><a
                                onClick={() => notifTrigger()}
                                style={{ display: "flex", flexDirection: "row" }}>
                                <i className="material-icons">notifications</i>
                                {notifNum > 0 ? (
                                    <span
                                        className={"new badge"}
                                        style={{ position: "absolute", marginTop: "10px", marginLeft: "10px" }}
                                        >{notifNum}
                                    </span>) 
                                            : (null)}
                                </a></li>
                            <li>
                                <img
                                    style={{marginTop:'10px',marginLeft:'10px'}} 
                                    className='dropdown-trigger circle'
                                    data-target='dropdown1'
                                    src = {AvatarProfil(user.profil)}
                                    alt={'profil mu.... jancoxx'}
                                    height={43}
                                    width = {43}
                                />
                            </li>

                            <NotifDropdown 
                                notif={notif}
                                toggle = {toggleN}
                            />
                            <SearchDropdown toggle={toggleS} />
                        </ul>
                     
                        <ul id='dropdown1' className='dropdown-content'>
                            <li><Link to={`/profile/${user.username === null ? 'login' : user.username}`}>Profile</Link></li>
                            <li className="divider" tabIndex="-1"></li>
                            <li><a  href={'/logout'}>Logout</a></li>
                        </ul>
                    </div>
                </div>
            </nav>
        </div >
    )
}

const mapStateToProps = state => {
    return {
        user: state.auth.user,
        notif:state.notifikasi.notifications,
        read:state.notifikasi.unreadNotifications,
    }
}
export default connect(mapStateToProps,{get_notif_user})(Navbar);