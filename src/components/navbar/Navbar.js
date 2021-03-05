import React, { useEffect } from 'react'
import { Redirect } from 'react-router-dom'

import { connect } from 'react-redux'
import Notif from './Notif'
import $ from 'jquery'


function Navbar({ user }) {
    if (user === null) return <Redirect to={'/login'} />
    useEffect(() => {
        const M = window.M;
        var elems = document.querySelectorAll('.dropdown-trigger');
        M.Dropdown.init(elems, {});
    });
    function notif() {
        $(".box-notif").fadeToggle();
    }
    return (
        <div className="navbar-fixed">
            <nav>
                <div className="container">
                    <div className="nav-wrapper">
                        <a href="/" className="brand-logo ">Logo</a>
                        <ul className="right hide-on-med-and-down">
                            <li><a href="/"><i className="material-icons">home</i></a></li>
                            <li><a href="/search"><i className="material-icons">search</i></a></li>
                            <li><a
                                onClick={notif}
                                style={{ display: "flex", flexDirection: "row" }}
                            ><i className="material-icons">notifications</i><span
                                className="new badge"
                                style={{ position: "absolute", marginTop: "10px", marginLeft: "10px" }}
                            >25</span></a></li>
                            <li><a className='dropdown-trigger' data-target='dropdown1'><i className="material-icons">people</i></a></li>
                            <li className="box-notif" style={{ position: "absolute", background: "white", display: "none", marginTop: "65px", boxShadow: " 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)", width: "35vw", height: "50vh", right: "15px", color: "black", borderRadius: "5px", overflow: "auto", padding: "15px" }}>
                                <p style={{ lineHeight: "1.6" }}>hari ini</p>
                                <Notif />
                                <Notif />
                                <Notif />
                                <Notif />
                                <div className="divider" style={{margin:"15px 0"}}/>
                                <p style={{ lineHeight: "1.6" }}>hari ini</p>
                                <Notif />
                                <Notif />
                                <Notif />
                            </li>
                        </ul>
                        <ul id='dropdown1' className='dropdown-content'>
                            <li><a href={`/profile/${user.username}`}>Profile</a></li>
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
        user: state.auth.user
    }
}
export default connect(mapStateToProps)(Navbar);