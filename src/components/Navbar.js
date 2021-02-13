import React from 'react'
import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'

function parseJwt(token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
};

function Navbar() {


   if(Cookies.get('access') === undefined) return <Redirect to='/login'/>
    const token = parseJwt(Cookies.get('access'))

    document.addEventListener('DOMContentLoaded', function () {
            const M = window.M;
            var elems = document.querySelectorAll('.dropdown-trigger');
            M.Dropdown.init(elems, {});
    });

    return (
        <div className="navbar-fixed">
            <nav>
                <div className="container">
                    <div className="nav-wrapper">
                        <a href="/" className="brand-logo ">Logo</a>
                        <ul className="right hide-on-med-and-down">
                            <li><a href="/"><i className="material-icons">home</i></a></li>
                            <li><a href="/create"><i className="material-icons">control_point</i></a></li>
                            <li><a className='dropdown-trigger' data-target='dropdown1'><i className="material-icons">people</i></a></li>
                        </ul>
                        <ul id='dropdown1' className='dropdown-content'>
                            <li><a href={`/profile/${token.user_id}`}>Profile</a></li>
                            <li className="divider" tabIndex="-1"></li>
                            <li><a href='/logout'>Logout</a></li>
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    )
}

export { Navbar, parseJwt }