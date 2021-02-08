import React from 'react'
import '../Posts.css'

function Posts({ imageUrl }) {
    return (
        <img
            src={imageUrl}
            loading = 'lazy'
            className="image_posts"
            alt='gagal'
        />
    )
}

export default Posts
