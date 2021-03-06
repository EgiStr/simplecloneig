import React, { Component } from 'react'

import M from "materialize-css";

import ReactCrop from 'react-image-crop'

import { image64toCanvasRef, extractImageFileExtensionFromBase64, base64StringtoFile } from '../method/base64'

import { formatBytes } from '../method/convert'

import Cookies from 'js-cookie'
import { protectAuth } from '../auth/auth'
import { Redirect } from 'react-router-dom'
import { Avatar } from '@material-ui/core'
import { connect } from 'react-redux'

import axios from 'axios'

import '../../cp.css'
import 'react-image-crop/dist/ReactCrop.css';

axios.defaults.headers.common['Authorization'] = 'Bearer ' + Cookies.get('access')

// validate data yang diinginkan
const imageSize = 2520000 /* 2,4 mb */

const accepFileType = 'image/x-png,image/png,image/jpg,image/jpeg,image/gif'
const accepFileTypeArray = accepFileType.split(",").map((item) => { return item.trim() })

class CreatePost extends Component {
    constructor(props) {
        super(props)
        this.state = {
            redirectUrl: '',
            redirect: false,
            urlMentah: null,
            urlJadi: null,
            user: '',
            caption: '',
            crop: {
                unit: '%',
                width: 50,
                height: 50,
                x: 25,
                y: 25
              }
        }
        this.canvasRef = React.createRef()
    }

    componentDidMount() {


        const options = {
            inDuration: 250,
            outDuration: 250,
            opacity: 0.5,
            dismissible: false,
            startingTop: "4%",
            endingTop: "10%"
        };
        M.Modal.init(this.Modal, options);
    }

    // method validate foto
    verifyFile = (files) => {
        if (files && files.length > 0) {

            const currentFile = files[0]
            const currentFileType = currentFile.type
            const currentFileSize = currentFile.size
            if (currentFileSize > imageSize) {
                alert('this no allow To big  ' + formatBytes(currentFileSize) + ' please under 2mb')
                return false
            }

            if (!accepFileTypeArray.includes(currentFileType)) {
                alert('this files no allow please under 2mb')
                return false
            }
            return true
        }
    }

    handleOnDrop = (event) => {

        // validasi file
        if (event.target.files && event.target.files.length > 0) {
            if (this.verifyFile(event.target.files)) {

                const currentFile = event.target.files[0]
                // membuat fileReader untuk membuat base64
                const reader = new FileReader()

                // menyimpan data ke url agar bisa di load di preview                
                reader.addEventListener('load', () => {
                    this.setState({ urlMentah: reader.result })
                }, false)    
                
                // membuat base64
                reader.readAsDataURL(currentFile)
            }    
        }    
    }    
    
    Confirmfoto = () => this.setState({ urlMentah: null }) // membuat gambar crop jadi kosong 

    handleCaption = event => this.setState({ caption: event.target.value })

    handleOnChange = (crop) => this.setState({ crop: crop })

    handleImageLoaded = (image) => { }

    handleCrop = (crop, pixelCrop) => {

        // get canvas template
        let canvas = this.canvasRef.current
        const { urlMentah } = this.state

        // updata canvas with crop
        // menampilkan priview
        image64toCanvasRef(canvas, urlMentah, pixelCrop)

        const exstensi = extractImageFileExtensionFromBase64(urlMentah)

        let filename = `image${this.state.caption}${Math.floor(Math.random() * Math.floor(Math.random() * Date.now()))}.${exstensi}`

        // set databaru

        let dataBaru = this.canvasRef.current.toDataURL('image/' + exstensi)
        if (dataBaru === 'data:,') {

        } else {
            // mengubah base64 mejadi file dan menyimpan ke state
            const file = base64StringtoFile(dataBaru, filename)
            this.setState({ urlJadi: file })
        }    

    }    



    handleSubmit = () => {
        protectAuth(Cookies.get('access'), Cookies.get('refresh')).then(e => e ? '' : window.location.reload())

        const { urlJadi, caption } = this.state
        const user = this.props.user_id.user_id
        let formData = new FormData()

        formData.append('post', urlJadi)
        formData.append('user', user)
        formData.append('caption', caption)


        axios.post('http://127.0.0.1:8000/api/create/',
            formData, {
            headers: {
                "Authorization": 'Bearer ' + Cookies.get('access'),
                'Content-Type': 'multipart/form-data'
            }
        })

            .then((res) => {
                // jika succes redirect ke profil
                this.setState({ redirect: true, urlJadi: null, caption: '', })
                window.location.reload()
            })
            .catch(e =>  console.log(e.request.responseText) )
    }

    /* testing input file local */
    // handleUploadImage = (event) => {
    //     this.setState({urlMentah:event.target.files[0]})
    //     console.log(event.target.files[0])
    // }
    
    render() {
        if (this.state.redirect || this.props.user_id === null) return <Redirect to={this.state.redirectUrl} />
        
        return (
            <div style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
                <div style={{ border: "1px solid gray", borderRadius: "10px", padding: "20px" }}>
                    <div style={{ display: "flex", alignItems: "center" }}>
                        <Avatar 
                            src={`http://127.0.0.1:8000${this.props.user_id.profil}`}
                        />
                        <a className="caption modal-trigger" href="#modal1" style={{ flex: "1", borderRadius: "50px", padding: "10px", marginLeft: "5px" }}>What Do You mind?</a>
                    </div>
                    <div className="divider" style={{ margin: "10px 0" }}></div>
                    <div >
                        <a className="imageVid modal-trigger" href="#modal1" style={{ display: "flex", justifyContent: "center" }}>
                            <i className="material-icons" style={{ color: "#ee6e73" }}>image</i>
                            Foto/Video
                        </a>
                    </div>
                </div>

                <div ref={modal => this.Modal = modal} id="modal1" className="modal">
                    <h5 align="center">Create Post</h5>
                    <a className="modal-close"><i className="material-icons">close</i></a>
                    <div className="divider" />
                    <div className="profile-modal">
                        <Avatar 
                            src={`http://127.0.0.1:8000${this.props.user_id.profil}`}
                        />
                        <p>{this.props.user_id.username}</p>
                    </div>
                    <div className="insert-post">
                        <textarea
                            type="textarea"
                            onChange={this.handleCaption}
                            value={this.state.caption}
                            placeholder="caption mu apa"
                            className="caption-post"
                            autoFocus
                        />
                        {this.state.imageUrl !== null ? (
                            <div>
                                <ReactCrop
                                    src={this.state.urlMentah}
                                    crop={this.state.crop}
                                    onChange={this.handleOnChange}
                                    onImageLoaded={this.handleImageLoaded}
                                    onComplete={this.handleCrop}
                                />
                                <button className="btn" onClick={this.Confirmfoto}>Confirm</button>
                                <br />
                                <canvas ref={this.canvasRef} >

                                </canvas>
                            </div>
                        ) : (
                            <p></p>
                        )}
                    </div>
                    <label className="insert" htmlFor="files"  >
                        
                       
                        <label>Add to Your Post</label>
                        <input
                        onChange={this.handleOnDrop}
                        type="file"
                        style={{ visibility: "hidden" }}
                        accept={"image/*"}
                        multiple={false}
                        id="files"
                        />
                            {/* <i className="material-icons small">add_location</i>
                            <i className="material-icons small">person_pin</i> */}
                     
                    </label>

                    <a className="btn-send" onClick={this.handleSubmit}>Send</a>
                </div>







            </div>
        )
    }

}

const mapStateToProps = state => {
    return {
        user_id : state.auth.user,
    }
}

export default connect(mapStateToProps)(CreatePost);