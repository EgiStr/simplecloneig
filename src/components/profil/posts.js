import React ,{useEffect}from "react";
import Content from '../home/content'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
const Posts = ({post_data}) => {
    useEffect(()=>{
        console.log('testing')
    },[])

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
                        imageUrl={`http://127.0.0.1:8000${item.post}`}
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
        post_data : state.auth.post_data
    }
}

export default withRouter(connect(mapStateToProps)(Posts)) ; 