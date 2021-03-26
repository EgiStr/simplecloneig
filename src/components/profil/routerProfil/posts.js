import React ,{useEffect}from "react";

import Content from '../../home/content'

import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import PageNull from '../../other/pageNull'

const Posts = ({post_data}) => {

    return (
        <div className="posts">
            <div className="posts_wrap">
            {post_data.length > 0 ? (post_data.map((item, index) => {

                return (
                    <Content
                        key={index}
                        id={index}
                        contentType={item.content_type_id}
                        postId={item.id}
                        userId={item.user.id}
                        username={item.user.nickname}
                        captions={item.caption}
                        imageUrl={`http://127.0.0.1:8000${item.post}`}
                        avatar={item.user.profil}
                        like={item.likes}
                    />

                )
            })): <PageNull page=" THIS PROFIL"/>}
       
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