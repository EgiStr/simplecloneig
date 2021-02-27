import React from 'react'
import { Redirect } from 'react-router-dom'
import Cookies from 'js-cookie'
import { connect } from 'react-redux'
import { LogoutAuth } from '../../action/auth'

const Logout = ({LogoutAuth}) => {
    Cookies.remove('access');
    Cookies.remove('refresh');
    LogoutAuth()
    return <Redirect to='/login' />
}

const mapStateToProps = state => {
    return {
        state
    }
}

export default connect(mapStateToProps,{LogoutAuth})(Logout) ; 