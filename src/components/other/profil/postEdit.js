

import React, {useEffect} from 'react'
import { connect } from 'react-redux'

import M from "materialize-css";


import {PrivePost,UnPrivePost,deletePost} from '../../../action/posts'

export const dropDown = (props) => {
    useEffect(() => {
        var elems = document.getElementById('trigger')
        M.Dropdown.init(elems, {coverTrigger:true});
    },[])

    return (
        <div>
            <a id='trigger'className='dropdown-trigger'data-target='dropdown2'><i className="material-icons ">more_horiz</i></a>
                                <ul id='dropdown2' className='dropdown-content'>

                                    <li>{props.private ? <a onClick={()=> props.UnPrivePost(props.id)}>UnArchive</a> : <a onClick={()=> props.PrivePost(props.id)}>Archive</a>}</li>
                                    <li><a onClick={()=>props.deletePost(props.id)}>Delete</a></li>
                                    <li className="divider" tabIndex="-1"></li>
                                    
                                </ul>
        </div>
    )
}

const mapStateToProps = (state) => ({
    
})

const mapDispatchToProps = {
    PrivePost,
    UnPrivePost,
    deletePost,
}

export default connect(mapStateToProps, mapDispatchToProps)(dropDown)
