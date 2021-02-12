import React from 'react'

import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'
import axios from 'axios'


export const LoginAuth = async (AccessToken , RefresToken) => {
    if(!RefresToken) return null
    if(AccessToken === undefined){
        const accessToken = await resfeshLogin(RefresToken)
        return accessToken
    }
    return AccessToken
}

export const protectAuth = async () => {
    
    let accesToken = Cookies.get("access")
    let refreshToken = Cookies.get('refresh')
    
    let AccessToken = await LoginAuth(accesToken,refreshToken)

    if(!AccessToken){
        return <Redirect to="/login" />
    }else{
        let accessToken = AccessToken.access
        let refreshToken = AccessToken.refresh
        return await requestLogin(accessToken,refreshToken)
    }
}

export const resfeshLogin = async resfreshToken => {

    return new Promise((resolve,reject) => {
        let formData = new FormData() ;
        formData.append('refresh',resfreshToken) 
        axios.post('http://127.0.0.1:8000/auth/login/refresh/',formData)
        .then( res => {
            if(res.status < 300){
                resolve(false)
            }else{
                const {access,refresh} = res.data
                Cookies.set('access',access)
                resolve(res.data)
            }
        })
    })
    // axios.post('http://127.0.0.1:8000/auth/login/refresh/',
    // formData
    // )
    // .then( res =>{
         
    // })
    // .catch(e => console.log(e))
    // Cookies.set('access',token.access)
    // Cookies.set('refresh',token.refresh)
    // return token
}

export const requestLogin = async (accessToken ,refreshToken) => {
    const promise = new Promise((resolve,reject) => {
        axios.get('http://127.0.0.1:8000/api/',{headers:{"Authorization": 'Bearer ' + accessToken}})
        .then(e => resolve(true))
        .catch( e => {
            if(e.request.status === 401){
                if(e.request.response === '{"detail":"Given token not valid for any token type","code":"token_not_valid","messages":[{"token_class":"AccessToken","token_type":"access","message":"Token is invalid or expired"}]}'){
                    const token = resfeshLogin(refreshToken)
                    return requestLogin(token.access,token.refresh) 
                }else{
                    resolve(false)
                }
            }else{
                resolve(true)
            }
        })
    })
    return promise
}