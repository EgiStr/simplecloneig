import React, { Suspense,lazy } from 'react'

import Loading from '../../other/loading'

const CommentUser = lazy(() => import('./comment'))

export const allComments = ({comments,user_id}) => {
   
    return (
        <div className="comments-user">
            {comments ? (
                            comments.map((item,i) => {   
                                    return <Suspense key={i} fallback={<Loading />}>
                                                <CommentUser 
                                                    key ={i}
                                                    user = {user_id === item.user.id}
                                                    id = {item.id}
                                                    profil = {item.user.profil}
                                                    nickname = {item.user.nickname}
                                                    content = {item.content}
                                                    time={item.timestamp}
                                                    replies = {item.replies}
                                                />
                                            </Suspense>
                                })
                            ) : <div>no comment :3</div>}  
        </div>
    )
}



export default allComments;
