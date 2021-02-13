import React  from 'react'

import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'
import axios from 'axios'


export const LoginAuth = async (AccessToken , RefresToken) => {
    // jika tidak pernah login akan null yang membuat dia akan redirect
    if(!RefresToken) return null

    // jika ga ada access token dalam arti udh kadaluarsa maka akan refrestoken
    if(AccessToken === undefined){
        const accessToken = await resfeshLogin(RefresToken)
        return accessToken
    }
    // jika benar semua maka return yang dikembalikan
    return {access:AccessToken,refresh:RefresToken}
}

export const protectAuth = async (access,refresh) => {
    // memanggil cookies
    let accesToken = access
    let refreshToken = refresh

    // mengecek apa token kadaluarsa atau tidak pernah login
    let AccessToken = await LoginAuth(accesToken,refreshToken)
    
    // tidak pernah login maka AccessToken akan null dan mengaktifkan if 
    if(!AccessToken){
        return <Redirect to="/login" />
    }else{
        // jika pernah login maka akan mengambil pecahan dan di refresh
        let accessToken = AccessToken.access
        let refreshToken = AccessToken.refresh

        // mengetest apa token valid atau ga jika valid maka bernilai true jika tidak false
        return await requestLogin(accessToken,refreshToken)
        
    }
}

export const resfeshLogin = async resfreshToken => {
    console.log('refresh token')
    // membuat Promise karna tidak bisa memakai UseState
    return new Promise((resolve,reject) => {
        // membuat post request untuk membuat token baru mengunakan resfresh token
        axios.post('http://127.0.0.1:8000/auth/login/refresh/',{refresh:resfreshToken})
        .then( res => {
            // jika gagal maka false / null
            if(res.statusText !== "OK"){
                // memakai resolve karna ini adalah promise
                resolve(false)
            }else{
                // jika valid dan berhasil maka akan membuat cookies baru
                const {access,refresh} = res.data
                Cookies.set('access',access)
                Cookies.set('refresh',refresh)
                // mengirim access dan refresh
                resolve(res.data)
            }
            // gagal berarti salah dan terpaksa login ulang
        }).catch(e => resolve(false))
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
    const token = accessToken
    let change = 1
    // membuat promise agar bisa mengunakan resolve // seperti return ajax
    const promise = new Promise((resolve,reject) => {
        // mengunakan home page agar dapat mengetest token
        axios.get('http://127.0.0.1:8000/api/',{headers:{"Authorization": 'Bearer ' + token  }})
        // jika berhasil maka hasilnya true / dan user sudah auth
        .then(e => resolve(true))
        .catch( e => {
            // jika unauthor
            if(e.request.status === 401){
                // kalau emang kadaluarsa maka akan refresh dan test ulang
                if(e.request.response === '{"detail":"Given token not valid for any token type","code":"token_not_valid","messages":[{"token_class":"AccessToken","token_type":"access","message":"Token is invalid or expired"}]}'){
                    if(change === 0) {resolve(false)}
                    else{
                        // change -= 1
                        // const token = resfeshLogin(refresh)
                        // console.log(token)
                        // if(!token){
                        resolve(false)
                        // }else{
                        //     return requestLogin(token.access,token.refresh) 
                        // }
                    }
                }else{
                    // jika bukan kadaluarsa maka login ulang
                    resolve(false)
                }
            }else{
                resolve(true)
            }
        })
    })
    return promise
}