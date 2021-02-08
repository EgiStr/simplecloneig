import React from 'react'
import {Redirect} from 'react-router-dom'


function parseJwt (token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
};

function Navbar() {

   
    if(localStorage.getItem('token') === null ){
        return <Redirect to={'/login'}/>
    }
    const token = parseJwt( localStorage.getItem('token'))

    return (
        <div className="navbar-fixed">
            <nav>
                <div className="container">
                    <div className="nav-wrapper">
                        <a href="/" className="brand-logo ">Logo</a>
                        <ul className="right hide-on-med-and-down">
                            <li><a href="/"><i className="material-icons">home  </i></a></li>
                            <li><a href="/message"><i className="material-icons">message</i></a></li>
                            <li><a href={`/profile/${token.user_id}`}><i className="material-icons">people</i></a></li>
                        </ul>
                    </div>                                                                                                  
                </div>
            </nav>
        </div>
    )
}

export default Navbar
