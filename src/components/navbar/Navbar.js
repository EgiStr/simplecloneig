import React, { useEffect } from 'react'
import { Redirect } from 'react-router-dom'

import { connect } from 'react-redux'
import { Avatar } from '@material-ui/core'

function Navbar({ user }) {
    if (user === null) return <Redirect to={'/login'} />
    useEffect(() => {
        const M = window.M;
        var elems = document.querySelectorAll('.dropdown-trigger');
        M.Dropdown.init(elems, {});
    })

    return (
        <div className="navbar-fixed">
            <nav>
                <div className="container">
                    <div className="nav-wrapper">
                        <a href="/" className="brand-logo ">Logo</a>
                        <ul className="right hide-on-med-and-down">
                            <li><a href="/"><i className="material-icons">home</i></a></li>
                            <li><a href="/create"><i className="material-icons">control_point</i></a></li>
                            <li><a
                                href="#"
                                style={{ display: "flex", flexDirection: "row" }}
                            ><i className="material-icons">notifications</i><span
                                className="new badge"
                                style={{ position: "absolute", marginTop: "10px", marginLeft: "10px" }}
                            >25</span></a></li>
                            <li><a className='dropdown-trigger' data-target='dropdown1'><i className="material-icons">people</i></a></li>
                            <li style={{ position: "absolute", background: "white", marginTop: "65px", boxShadow:" 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)", width:"35 vw", right:"15px", color:"black", borderRadius:"5px"}}>
                                <h6>Notifikasi</h6>
                                <p>Hari ini</p>
                                <div>
                                    <Avatar />
                                    <p><b>username</b> started follow you. <span>2H</span></p>
                                    <button className="btn">Follow</button>
                                </div>
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