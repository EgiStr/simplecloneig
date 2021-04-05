import React from 'react'


export const canvasPost = props => {
    return (
        <div className="row">
            <div className="insert-post col s12">
                
                <img src={props.value.url} alt="foto mu..." className="image-canvas"  style={{maxWidth:'80vw'}} />
            </div>
                <div className="col s12" style={{marginTop:30}}>
                 
                    <a className="col s6 btn-send" onClick={() => props.prevStep()}>Prev</a>
                 
                    <a className="col s6 btn-send" onClick={() => props.nextStep()}>Next</a>
                 
                </div>

        </div>
    )
}


export default canvasPost ;
