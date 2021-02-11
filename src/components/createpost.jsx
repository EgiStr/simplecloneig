import React, { Component } from 'react'

import Dropzone from 'react-dropzone'
import ReactCrop from 'react-image-crop'
 
import { image64toCanvasRef, extractImageFileExtensionFromBase64,base64StringtoFile } from './method/base64'
import {formatBytes} from './method/convert'
import {parseJwt} from './Navbar'

import axios from 'axios'

import 'react-image-crop/dist/ReactCrop.css'

// validate data yang diinginkan
const imageSize = 2520000
const accepFileType = 'image/x-png,image/png,image/jpg,image/jpeg,image/gif'
const accepFileTypeArray = accepFileType.split(",").map( (item) => {return item.trim()})

class CreatePost extends Component {
    constructor(props){
        super(props)
        this.state ={
            redirect : false,
            urlMentah : null,
            urlJadi : null,
            user:'',
            caption : '',
            crop : {
                aspect:1/1,
                // x:20,
                // y:10,
                // width:300,
                // height:300,
            }
        }
        this.canvasRef = React.createRef()
    }

    // method validate foto
    verifyFile = (files) => {
        if(files && files.length > 0){
            
            const currentFile = files[0]
            const currentFileType = currentFile.type
            const currentFileSize = currentFile.size
            if(currentFileSize > imageSize){
                alert('this no allow To big  ' + formatBytes(currentFileSize) + ' please under 2mb' )
                return false
            }
            
            if(!accepFileTypeArray.includes(currentFileType)){
                alert('this files no allow please under 2mb' )
                return false
            }
            return true
        }
    }

    handleOnDrop = (files,rejectedFiles) => {

        if(rejectedFiles && rejectedFiles.length > 0){
            this.verifyFile(rejectedFiles)
        }
        // validasi file
        if(files && files.length > 0){
            if(this.verifyFile(files)){
                const currentFile = files[0]
                
                const reader = new FileReader()
                
                reader.addEventListener('load', () => {
                    this.setState({urlMentah : reader.result})
                },false)

                reader.readAsDataURL(currentFile)
            }
        }
    }

    handleOnChange = (crop) => {
        this.setState({crop : crop})
    }

    handleImageLoaded = (image) => {
        console.log(image)
    }

    handleCrop = (crop,pixelCrop) => {
        // get canvas template
        let canvas = this.canvasRef.current
        const {urlMentah} =this.state
        
        // updata canvas with crop
        // menampilkan priview
        image64toCanvasRef(canvas,urlMentah,pixelCrop)
        const exstensi = extractImageFileExtensionFromBase64(urlMentah)
        let filename = `image${this.state.caption}${Math.floor(Math.random() * Math.floor(Math.random() * Date.now()))}.${exstensi}`
        // set databaru
        
        let dataBaru = this.canvasRef.current.toDataURL('image/'+exstensi)
        if(dataBaru === 'data:,'){
            
        }else{
            // mengubah base64 mejadi file dan menyimpan ke state
            const file = base64StringtoFile(dataBaru,filename)          
            this.setState({urlJadi:file})
        }
    }

    Confirmfoto = () =>{
        this.setState({
            // buat jadi ga ada
            urlMentah:null,
        })
    }

    handleCaption = (event) => {
        this.setState({caption:event.target.value})
    }

    handleSubmit = () => {
        const {urlJadi,caption} = this.state
        const user = parseJwt(localStorage.getItem('token')).user_id
        var formData = new FormData()
        
        formData.append('post',urlJadi)      
        formData.append('user',user)
        formData.append('caption',caption)
         

        axios.post('http://127.0.0.1:8000/api/create/',
            formData,{
                headers: {
                    "Authorization": 'Bearer ' + localStorage.getItem('token'),
                    'Content-Type': 'multipart/form-data'
                  }
            })
        
        .then((res)=> {
            console.log(res.data)
            this.setState({redirect : true, urlJadi:null,caption:'',})
        })
        .catch(e=>{console.log(e.request.responseText)})
    }

        /* testing input file local */
    // handleUploadImage = (event) => {
    //     this.setState({urlMentah:event.target.files[0]})
    //     console.log(event.target.files[0])
    // }

    render(){
       
        return (
            <div>
                <h1>masukan gambar</h1>
                <Dropzone onDrop={this.handleOnDrop} accept={'image/*'} maxSize={imageSize} multiple={false}>
                {({getRootProps, getInputProps}) => (
                    <section>
                    <div {...getRootProps()}>
                        <input {...getInputProps()} />
                        <p>Drag 'n' drop some files here, or click to select files</p>
                    </div>
                    </section>
                )}
                </Dropzone>

                <br/>
                {this.state.imageUrl !== null ? (
                    <div>
                    {/* <p>priview image</p>
                    <img src={this.state.imageUrl} alt="foto" /> */}
                    <ReactCrop 
                        src={this.state.urlMentah} 
                        crop={this.state.crop} 
                        onChange={this.handleOnChange}
                        onImageLoaded={this.handleImageLoaded}
                        onComplete={this.handleCrop}
                        />
                    <button className="btn" onClick={this.Confirmfoto}>Confirm</button>
                        <br/>
                        <h5>priview</h5>
                        <canvas ref={this.canvasRef} >

                        </canvas>
                    </div>
                ) : (
                    <p></p>
                )}
                <input 
                    type="text"
                    onChange={this.handleCaption}
                    value={this.state.caption}
                    placeholder="caption mu apa"/>
                
                {/* <input type="file" name="name" id="1" onChange={this.handleUploadImage} /> */}
                <button className="btn" onClick={this.handleSubmit}>send</button>
                
            </div>
        )
    }

}


export default CreatePost ;