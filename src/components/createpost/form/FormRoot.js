import React,{ useState } from 'react'

import { connect } from 'react-redux'

import axios from '../../../utils/axios'
import { protectAuth } from '../../../utils/auth/auth'
import Cookies from 'js-cookie'

import Canvas from './canvasPost'
import Upload from './postUpload'
import Caption from './captionInput'

import { extractImageFileExtensionFromBase64, base64StringtoFile } from '../../method/base64'

export const FormRoot = (props) => {

    const [state,setState] = useState({
        step:1,
        caption:'',
        url:'',
    })
    
    const handleChange = event => {
        const { name,value } = event
        setState(prev =>  ({
            ...prev,
            [name]: value
        }))
    }

    const handleCancel = () => setState({
        step:1,
        caption:'',
        url:'',
    })
    

    const handleSubmit = () => {

        protectAuth(Cookies.get('access'), Cookies.get('refresh')).then(e => e ? '' : '')

        
        const { url, caption } = state

        if(url === '') return setState(prev => ({...prev,step: 4}))

        const exstensi = extractImageFileExtensionFromBase64(url)

        let filename = `image${props.user.username}${Math.floor(Math.random() * Math.floor(Math.random() * Date.now()))}.${exstensi}`

        // mengubah base64 mejadi file dan menyimpan ke state
        const file = base64StringtoFile(url, filename)
        
        let formData = new FormData()

        formData.append('post', file)
        formData.append('user',  props.user.user_id)
        formData.append('caption', caption)

        const config = {
            headers: {
                "Authorization": 'Bearer ' + Cookies.get('access'),
                'Content-Type': 'multipart/form-data'
            }
        }
        axios.post('api/create/',formData,config)
            .then((res) => {
                window.location = `/p/${res.data.id}`
                // jika succes redirect ke profil
            })
            .catch(e => setState(prev => ({...prev,step: 4})) )
    }

    const nextStep = () => setState(prev => ({...prev,step: prev.step + 1}))
    const prevStep = () => setState(prev => ({...prev,step: prev.step - 1}))

    switch(state.step){
        case 1:
            return <Upload
                        nextStep={nextStep}
                        handleChange={handleChange}
                        handleCancel={handleCancel}
                        value ={state} 
                    />
        case 2:
            return <Canvas
                        nextStep={nextStep}
                        prevStep={prevStep}
                        handleChange={handleChange}
                        value ={state} 
                    />
        case 3:
            return <Caption 
                        prevStep={prevStep}
                        handleChange={handleChange}
                        handleSubmit={handleSubmit}
                        value ={state}
                    />
        case 4:
            return <div className="center-align">Error upload Fail <br/>  <a style={{cursor:'pointer'}} onClick={() => setState(prev => ({...prev,step:1}))}>Back to upload</a></div>
        
        default :
            return <p></p>
    }

}

const mapStateToProps = (state) => ({
     user : state.auth.user,
})



export default connect( mapStateToProps )(FormRoot)
