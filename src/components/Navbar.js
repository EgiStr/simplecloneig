import React from 'react'

function Navbar() {
    return (
        <div>
            <nav>
                <div className="container">
                    <div class="nav-wrapper">
                        <a href="/" class="brand-logo ">Logo</a>
                        <ul class="right hide-on-med-and-down">
                            <li><a href="/"><i class="material-icons">home  </i></a></li>
                            <li><a href="/username"><i class="material-icons">message</i></a></li>
                            <li><a href="/message"><i class="material-icons">people</i></a></li>
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default Navbar
