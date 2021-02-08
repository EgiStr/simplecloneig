import React from 'react'

function Navbar() {
    return (
        <div className="navbar-fixed">
            <nav>
                <div className="container">
                    <div className="nav-wrapper">
                        <a href="/" className="brand-logo ">Logo</a>
                        <ul className="right hide-on-med-and-down">
                            <li><a href="/"><i className="material-icons">home  </i></a></li>
                            <li><a href="/message"><i className="material-icons">message</i></a></li>
                            <li><a href="/profile/:id"><i className="material-icons">people</i></a></li>
                        </ul>
                    </div>                                                                                                  
                </div>
            </nav>
        </div>
    )
}

export default Navbar
