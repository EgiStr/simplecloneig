import React, { useEffect } from 'react'
import { Redirect,useHistory } from 'react-router-dom'

import { connect } from 'react-redux'
import { get_notif_user,clear_notif_user } from '../../action/notifikasi'
import { NotifDropdown } from './notifDropdown'
import $ from 'jquery'


function Navbar({ user,notif,read,get_notif_user,clear_notif_user }) {
    if(window.location.pathname === '/register') {
        if (user === null) return <Redirect to={'/register'} />
    }
    
    if (user === null) return <Redirect to={'/login'} />
    const history = useHistory()
    useEffect(() => {
        const M = window.M;
        var elems = document.querySelectorAll('.dropdown-trigger');
        M.Dropdown.init(elems, {});

    },[notif]);
    
    const notifTrigger = () => {
        $(".box-notif").fadeToggle()
        get_notif_user()
    
    }
  
    return (
        <div className="navbar-fixed">
            <nav>
                <div className="container">
                    <div className="nav-wrapper">
                        <a onClick={() => history.push('/')} className="brand-logo ">Logo</a>
                        <ul className="right hide-on-med-and-down">
                            <li><a onClick={() => history.push('/')} ><i className="material-icons">home</i></a></li>
                            <li><a href="/search"><i className="material-icons">search</i></a></li>
                            <li><a
                                onClick={() => notifTrigger()}
                                style={{ display: "flex", flexDirection: "row" }}
                                >
                                <i className="material-icons">notifications</i>
                                <span
                                className="new badge"
                                style={{ position: "absolute", marginTop: "10px", marginLeft: "10px" }}
                                >
                                {localStorage.getItem('notif') ? localStorage.getItem('notif') : read}
                                </span></a></li>
                            <li><a className='dropdown-trigger' data-target='dropdown1'><i className="material-icons">people</i></a></li>
                            <NotifDropdown 
                                notif={notif}
                            />
                        </ul>
                     
                        <ul id='dropdown1' className='dropdown-content'>
                            <li><a href={`/profile/${user.username === null ? 'login' : user.username}`}>Profile</a></li>
                            <li className="divider" tabIndex="-1"></li>
                            <li><a href='/logout'>Logout</a></li>
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
export default connect(mapStateToProps,{get_notif_user,clear_notif_user})(Navbar);