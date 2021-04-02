import React  from 'react'

import axios from '../axios'
import Cookies from 'js-cookie'
import {parseJwt} from '../../components/method/parseJwt'
import { Redirect } from 'react-router-dom'

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
    
    
    const accesToken = access
    const refreshToken = refresh

    // mengecek apa token kadaluarsa atau tidak pernah login
    let AccessToken = await LoginAuth(accesToken,refreshToken)
    
    // tidak pernah login maka AccessToken akan null dan mengaktifkan if 
    if(!AccessToken){
        return <Redirect to="/login" />
    }else{
        // jika pernah login maka akan mengambil pecahan dan di refresh
        const accessToken2 = AccessToken.access
        const refreshToken2 = AccessToken.refresh

        // mengetest apa token valid atau ga jika valid maka bernilai true jika tidak false
        return await requestLogin(accessToken2,refreshToken2)
        
    }
}

export const resfeshLogin = resfreshToken => {
   
    if(!resfreshToken){
        return false
    }
    // membuat Promise karna tidak bisa memakai UseState
    return new Promise((resolve,reject) => {
        // membuat post request untuk membuat token baru mengunakan resfresh token
        const data = {
            grant_type : 'refresh_token',
            client_id: 'qDqQ2k5cz2HNaHsuyZC4JPwRRHxPOm2PJUoSXeTJ',
            client_secret : '6Xb1TvCPLJRmKsrQ4XhGg0uPnwLSvwmJ96DZiUKyG1pB87I6YfkJYhyDycl4vX6EBWCG4lFeDcuHecSGboz6gckgo3RWwSSj0xaBdnvwUwLWUYZOO1HBVdLSOsBrIcVe',
            refresh_token : resfreshToken,
        }
        axios.post('auth/token/',data)
        .then( res => {
            
            // jika gagal maka false / null
            if(res.statusText === "OK"){
                // memakai resolve karna ini adalah promise
                const {access,refresh} = res.data
                Cookies.set('access',access)
                Cookies.set('refresh',refresh)
                window.location.reload()
                // mengirim access dan refresh
                resolve(res.data)
            }else{
                // jika valid dan berhasil maka akan membuat cookies baru
                resolve(false)
            }
            // gagal berarti salah dan terpaksa login ulang
        }).catch(e => resolve(false))
    })

}

export const requestLogin = async (accessToken ,refreshToken) => {
    let exp_token = parseJwt(Cookies.get('ud')).exp
    
    
    // membuat promise agar bisa mengunakan resolve // seperti return ajax
    const promise = new Promise((resolve,reject) => {
        if (Date.now() <= exp_token * 1000) {
            resolve(true)
        }else{
            if (Date.now() >= exp_token * 1000) {
                const new_token = resfeshLogin(refreshToken)
                new_token.then(res =>{
                    if(!res){
                        resolve(false)
                    }else{
                        resolve(true)
                    }
                })
            }else{
                resolve(true)
            }
        }
        // // mengunakan home page agar dapat mengetest token
        // axios.get('api/',{headers:{"Authorization": 'Bearer ' + token  }})
        // // jika berhasil maka hasilnya true / dan user sudah auth
        // .then(e => {
        //     resolve(true)
        //     return false 
        // })
        // .catch( e => {
        //     // jika unauthor
        //     if(e.request.status === 401){
        //         // kalau emang kadaluarsa maka akan refresh dan test ulang
        //         if(e.request.response === '{"detail":"Given token not valid for any token type","code":"token_not_valid","messages":[{"token_class":"AccessToken","token_type":"access","message":"Token is invalid or expired"}]}'){

        //                 const token = resfeshLogin(refresh)
        //                 token.then(e => {
        //                     if(!e){
        //                         resolve(false)
        //                     }else{
        //                         return requestLogin(e.access,e.refresh) 
        //                     }
        //                 })
                        
                    
        //         }else{
        //             // jika bukan kadaluarsa maka login ulang
        //             resolve(false)
        //         }
        //     }else{
        //         resolve(true)
        //     }
        // })
    })
    return promise
}