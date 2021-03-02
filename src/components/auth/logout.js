import React from 'react'
import Cookies from 'js-cookie'
import { Redirect } from 'react-router-dom'
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