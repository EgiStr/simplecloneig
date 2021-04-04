import React,{ useEffect } from 'react'

import M from "materialize-css";
import Form from './form/FormRoot'

export const modalPost = (props) => {
  
    useEffect(() => {
        const Modal = document.getElementById('modalCreatePost')
        const options = {
            inDuration: 250,
            outDuration: 250,
            opacity: 0.5,
            dismissible: false,
            startingTop: "4%",
            endingTop: "10%"
        };
        M.Modal.init(Modal, options);
    },[])

    return (
        <div id="modalCreatePost" className="modal">
            <h5 align="center">Create Post</h5>
            <a className="modal-close close-modal"><i className="material-icons">close</i></a>
            <div className="divider" />
            <Form />
        </div>

    )
}



export default modalPost
