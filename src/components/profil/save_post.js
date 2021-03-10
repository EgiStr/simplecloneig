import React , {useEffect} from "react";
import Content from '../home/content'
import { get_post_save_data } from '../../action/auth'
import {connect} from 'react-redux'

const SavePosts = ({post_data,get_post_save_data}) => {
    useEffect(() => {
        get_post_save_data()
    },[])
    console.log(post_data)
    return (
        <div className="posts">
            <div className="posts_wrap">
          
            {post_data ? (post_data.map((item, index) => {

                return (
                    <Content
                        key={index}
                        id={index}
                        contentType={item.content_type_id}
                        postId={item.id}
                        userId={item.user.id}
                        username={item.user.nickname}
                        captions={item.caption}
                        imageUrl={item.post}
                        avatar={item.user.profil}
                        like={item.likes}
                    />

                )
            }))
                : (null)}

        </div>
    </div>
    )
}


const mapStateToProps = state => {
    return {
        post_data : state.auth.save_post
    }
}

export default connect(mapStateToProps,{get_post_save_data})(SavePosts) ; 
