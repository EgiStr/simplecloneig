import React from 'react'
import '../Posts.css'

function Posts({imageUrl}) {
    return (
        <div className="Posts">
            <img 
                src={imageUrl}
                className="image_posts"
            />
        </div>
    )
}

export default Posts
