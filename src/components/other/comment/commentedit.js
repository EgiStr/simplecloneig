

import React, {useEffect} from 'react'
import { connect } from 'react-redux'

import { protectAuth } from '../../../utils/auth/auth'

import Cookies from 'js-cookie'
import M from "materialize-css";
import { 
    delete_comment_replies,
    delete_comment,
    } from '../../../action/comment'

export const dropDown = ({id,delete_comment,delete_comment_replies,type}) => {
    useEffect(() => {
        var elems = document.getElementsByClassName('dropdown-trigger')
        if(elems){
            for (let index = 0; index < elems.length; index++) {
                const element = elems[index];
                M.Dropdown.init(element, {})
                
            }
        }
    },[])

    const handleRemove = id => {
        protectAuth(Cookies.get('access'),Cookies.get('refresh')).then(e => e ? '' : '')
        if(type){
            delete_comment(id,Cookies.get('access'))
        }else{
            delete_comment_replies(id,Cookies.get('access'))
        }

    }

    return (
        <div>
            <a className='dropdown-trigger' data-target='dropdown3'><i className="material-icons ">more_vert</i></a>
                                <ul id='dropdown3' className='dropdown-content'>
                                    <li><a >edit</a></li>
                                    
                                    <li><a onClick={()=> handleRemove(id)}>delete</a></li>
                                    
                                </ul>
        </div>
    )
}

const mapStateToProps = (state) => ({
    
})

const mapDispatchToProps = {
    delete_comment,
    delete_comment_replies,
}

export default connect(mapStateToProps, mapDispatchToProps)(dropDown)
