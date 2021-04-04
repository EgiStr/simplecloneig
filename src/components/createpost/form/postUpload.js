import React from 'react'

import { formatBytes } from '../../method/convert'

const imageSize = 2520000 /* 2,4 mb */
const accepFileType = 'image/x-png,image/png,image/jpg,image/jpeg,image/gif'
const accepFileTypeArray = accepFileType.split(",").map((item) => { return item.trim() })

export const postUpload = props => {

    const verifyFile = files => {
        if (files && files.length > 0) {

            const currentFile = files[0]
            const currentFileType = currentFile.type
            const currentFileSize = currentFile.size
            if (currentFileSize > imageSize) {
                alert('this no allow To big  ' + formatBytes(currentFileSize) + ' please under 2mb')
                return false
            }

            if (!accepFileTypeArray.includes(currentFileType)) {
                alert('this files no allow or please under 2mb')
                return false
            }
            return true
        }
    }
    const handleOnDrop = (event) => {
        // validasi file
        if (event.target.files && event.target.files.length > 0) {
            if (verifyFile(event.target.files)) {

                const currentFile = event.target.files[0]
                // membuat fileReader untuk membuat base64
                const reader = new FileReader()

                // menyimpan data ke url agar bisa di load di preview                
                reader.addEventListener('load', () => props.handleChange({name:'url',value: reader.result}), false)    
                // membuat base64
                reader.readAsDataURL(currentFile)
                props.nextStep()
            }    
        }    
    }    
    
    return (
        <div className="row">
            <div className="col s12">
                <label className="insert" htmlFor="files"  >      
                    <label htmlFor="files" >Add to Your Post</label>
                        <input
                            onChange={event => handleOnDrop(event)}
                            type="file"
                            style={{ visibility: "hidden" }}
                            accept={"image/*"}
                            multiple={false}
                            id="files"
                        />
                </label>
            </div>

            { props.value.url !== '' && 
                <div className="col s12">
                    <a className="col s4 btn-send modal-close" onClick={() => props.handleCancel()}>Cancel</a>
                    <a className="col s8 btn-send" onClick={() => props.nextStep()}>Next</a>
                </div>
            }
            

        </div>
    )
}

export default postUpload;
