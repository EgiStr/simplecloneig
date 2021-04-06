import React, { useState,useEffect,lazy,Suspense } from 'react'

import M from "materialize-css";
import { connect } from 'react-redux'

import Loading from '../loading'


const PostDetail = lazy(() => import('../../detail/Posts'))

const Modal = props => {
    const [open,setOpen] =useState (false)
    useEffect(() => {
        const elems = document.getElementById(`modal_id${props.id}`)
        const options = {
            onOpenStart: () => {
                window.history.replaceState(null, null, `/p/${props.postId}`)
                setOpen(true)
            },
            // onCloseEnd: () => {
            //     this.handleCancel() 
            // },
            inDuration: 250,
            outDuration: 250,
            opacity: 0.5,
            dismissible: true,
            startingTop: "4%",
            endingTop: "10%"
        };
          M.Modal.init(elems, options);
    },[])

    

        
    return(
              <div id={`modal_id${props.id}`} className="modal " style={{width:'100%',backgroundColor:'rgba(0,0,0,0.1)'}}>
                  {open ?
                      <Suspense fallback={<Loading/>}>
                          <PostDetail id={props.postId} />
                      </Suspense>
                   : null}
                  
              </div>
            )
        
}
    


const mapStateToProps = state => {
    return {
        user : state.auth.user,
     
       
    }
}

export default connect(mapStateToProps)(Modal) ;