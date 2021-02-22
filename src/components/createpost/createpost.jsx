import React, { Component } from 'react'

import Dropzone from 'react-dropzone'
import ReactCrop from 'react-image-crop'

import { image64toCanvasRef, extractImageFileExtensionFromBase64, base64StringtoFile } from '../method/base64'
import { formatBytes } from '../method/convert'
import { parseJwt } from '../navbar/Navbar'
import Cookies from 'js-cookie'
import { protectAuth } from '../auth/auth'
import '../../cp.css'


import axios from 'axios'

import 'react-image-crop/dist/ReactCrop.css'
import { Redirect } from 'react-router-dom'
import { Avatar } from '@material-ui/core'

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
                aspect: 1 / 1,
                // x:20,
                // y:10,
                // width:300,
                // height:300,
            }
        }
        this.canvasRef = React.createRef()
    }

    componentDidMount() {
        if (!protectAuth()) {
            this.setState({ redirect: true, redirectUrl: '/login' })
        }
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

    handleOnDrop = (files, rejectedFiles) => {

        if (rejectedFiles && rejectedFiles.length > 0) {
            this.verifyFile(rejectedFiles)
        }
        // validasi file
        if (files && files.length > 0) {
            if (this.verifyFile(files)) {

                const currentFile = files[0]
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

    Confirmfoto = () => this.setState({ urlMentah: null }) // membuat gambar crop jadi kosong 


    handleCaption = event => this.setState({ caption: event.target.value })


    handleSubmit = () => {

        const { urlJadi, caption } = this.state
        const user = parseJwt(Cookies.get('access')).user_id
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
            })
            .catch(e => { console.log(e.request.responseText) })
    }

    /* testing input file local */
    // handleUploadImage = (event) => {
    //     this.setState({urlMentah:event.target.files[0]})
    //     console.log(event.target.files[0])
    // }

    render() {
        document.addEventListener('DOMContentLoaded', function () {
            const M = window.M;
            var elems = document.querySelectorAll('.modal');
            M.Modal.init(elems, {});
        });
        if (this.state.redirect) return <Redirect to={this.state.redirectUrl} />
        return (
            <div className="container" style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
                <div style={{ border: "1px solid gray", borderRadius: "10px", padding: "20px" }}>
                    <div style={{ display: "flex", alignItems: "center" }}>
                        <Avatar />
                        <a className="caption modal-trigger" href="#modal1" style={{ flex: "1", borderRadius: "50px", padding: "10px", marginLeft: "5px" }}>What Do You mind?</a>
                    </div>
                    <div className="divider" style={{ margin: "10px 0" }}></div>
                    <div >
                        <a className="imageVid modal-trigger" href="#modal1" style={{ display: "flex", justifyContent: "center" }}>
                            <i className="material-icons" style={{color:"#ee6e73"}}>image</i>
                            Foto/Video
                        </a>
                    </div>
                </div>
                <div id="modal1" class="modal">
                    <div class="modal-content">
                        <h4>Modal Header</h4>
                        <Dropzone onDrop={this.handleOnDrop} accept={'image/*'} multiple={false}>
                            {({ getRootProps, getInputProps }) => (
                                <section>
                                    {/* method drop zone untuk mendapatkan input */}
                                    <div {...getRootProps()}>
                                        <input {...getInputProps()} />
                                        <p>Drag 'n' drop some files here, or click to select files</p>
                                    </div>
                                </section>
                            )}
                        </Dropzone>

                        <br />

                        {this.state.imageUrl !== null ? (
                            <div>
                                {/* <p>priview image</p>
                    <img src={this.state.imageUrl} alt="foto" /> */}
                                {/* handle crop file */}
                                <ReactCrop
                                    src={this.state.urlMentah}
                                    crop={this.state.crop}
                                    onChange={this.handleOnChange}
                                    onImageLoaded={this.handleImageLoaded}
                                    onComplete={this.handleCrop}
                                />
                                <button className="btn" onClick={this.Confirmfoto}>Confirm</button>
                                <br />
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
                            placeholder="caption mu apa" />

                        {/* <input type="file" name="name" id="1" onChange={this.handleUploadImage} /> */}
                        <button className="btn" onClick={this.handleSubmit}>send</button>
                    </div>
                    <div class="modal-footer">
                        <a href="#!" class="modal-close">Agree</a>
                    </div>
                </div>







            </div>
        )
    }

}


export default CreatePost;