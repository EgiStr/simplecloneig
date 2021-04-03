import React from 'react'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'

const navProfil = ({user,idUser,url}) => {
    return (
             <div className="post_nav">
             
                 <NavLink
                    to={`${url}`}
                    exact
                    activeClassName="post__nav active"
                    className="post__nav"
                >
                    <i className="material-icons tiny" >grid_on</i>POSTS
                </NavLink>
                
                {idUser === user.username 
                    ? (<NavLink
                            to={`${url}/saved`}
                            activeClassName="post__nav active"
                            className="post__nav"
                        >
                            <i className="material-icons tiny" >turned_in_not</i>SAVES
                        </NavLink>)
                    : null }
                </div>
    )
}

const mapStateToProps = (state) => {
    return {
        user : state.auth.user
    }
}



export default connect(mapStateToProps)(navProfil)
