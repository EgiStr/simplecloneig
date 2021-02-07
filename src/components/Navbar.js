import React, { Component } from 'react'

export class Navbar extends Component {
    render() {
        return (
            <div>
                <nav>
                    <div className="container">
                        <div class="nav-wrapper">
                         <a href="#" class="brand-logo ">Logo</a>
                            <ul class="right hide-on-med-and-down">
                                <li><a href="testing.html"><i class="material-icons">search</i></a></li>
                                <li><a href="badges.html"><i class="material-icons">view_module</i></a></li>
                                <li><a href="collapsible.html"><i class="material-icons">refresh</i></a></li>
                                <li><a href="mobile.html"><i class="material-icons">more_vert</i></a></li>
                            </ul>
                        </div>
                    </div>
                </nav>
            </div>
        )
    }
}

export default Navbar
