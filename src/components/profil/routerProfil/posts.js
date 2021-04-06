import React from "react";

import PageNull from '../../other/pageNull'
import Thumb from './tumbPost'

import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { AvatarProfil } from '../../../utils/auth/profil'

const Posts = ({post_data}) => {

    return (
        <div className="posts">
            <div className="posts_wrap row">
            {post_data.length > 0 ? (post_data.map((item, index) => {
                return (
                    <Thumb 
                        key={index}
                        postId={item.id}
                        url={AvatarProfil(item.post)}

                    />
                )
            })): <PageNull page=" THIS PROFIL PAGE"/>}
       
        </div>
    </div>
    )
}


const mapStateToProps = state => {
    return {
        post_data : state.auth.post_data
    }
}

export default withRouter(connect(mapStateToProps)(Posts)) ; 