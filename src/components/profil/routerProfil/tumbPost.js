import React,{Fragment} from 'react'

import Modal from '../../other/posts/modalDetail'

import '../../../assert/css/tumbPost.css'

export const tumbPost = props => {
    return (
        <Fragment>
            <div className='col s12 m4'>
              
                    <img
                        src={props.url}
                        alt={'post....'}
                        className='modal-trigger post-image'
                        href={`#modal_id${props.postId}`}
                        width={300}
                        height={290}
                    />
            </div>
            <Modal 
                id={props.postId}
                key={props.id}
                postId={props.postId}
            />            

        </Fragment>
    )
}


export default tumbPost ;
