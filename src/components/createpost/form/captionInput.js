import React from 'react'

export const captionInput = (props) => {
    return (
        <div className="row" style={{padding:10,marginTop:20}}>
            <div className="col s8">
                <textarea
                                type="textarea"
                                onChange={event => props.handleChange({name:'caption',value:event.target.value})}
                                value={props.value.caption}
                                placeholder="caption mu apa"
                                className="caption-post"
                                autoFocus
                />
            </div>
            <div className="col s4">
                <img src={props.value.url} alt="postingan" width={50} height={50} />
            </div>
            <div className="col s12">
                <a className="col s6 btn-send" onClick={() => props.prevStep()}>prev</a>
                <a className="col s6 btn-send" onClick={() => props.handleSubmit()}>Send</a>
            </div>
        </div>
    )
}



export default captionInput;
