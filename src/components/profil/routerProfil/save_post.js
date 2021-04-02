import React , { useEffect } from "react";

import Thumb from './tumbPost'

import { get_post_save_data } from '../../../action/auth'
import { connect } from 'react-redux'
import Loading from '../../other/loading'
import {withRouter, useHistory} from 'react-router-dom'

const SavePosts = ({user,param,post_data,get_post_save_data}) => {
    const history = useHistory()
    if(user !== param) history.push(`/profile/${param}`)
    
    useEffect(() => {
        get_post_save_data()
    },[])
    
    
    return (
        <div className="posts">
            <div className="posts_wrap row">
          
            { post_data ? post_data.map((item, index) => {

                return (
                    <Thumb 
                    key={index}
                    postId={item.id}
                    url={item.post}
                    />

                )
            }) : <Loading page={'YOUR SAVE'}/>}

        </div>
    </div>
    )
}


const mapStateToProps = state => {
    return {
        user : state.auth.user.username,
        post_data : state.auth.save_post_data
    }
}

export default withRouter(connect(mapStateToProps,{get_post_save_data})(SavePosts)) ; 
