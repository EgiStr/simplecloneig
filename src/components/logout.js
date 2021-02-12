import React from 'react'
import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'

class Logout extends React.Component {
    render(){
        Cookies.remove('access');
        Cookies.remove('refresh');
        return <Redirect to='/login' />
        
    }
}

export default Logout ; 