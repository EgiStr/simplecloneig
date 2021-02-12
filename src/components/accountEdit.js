import React ,{Component,Fragment} from 'react'
import M from 'materialize-css/dist/js/materialize.min.js'
import axios from 'axios'
import {parseJwt} from './Navbar'
import {protectAuth} from './auth'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'

class AccountEdit extends Component {
    constructor(props){
        super(props)
        this.state = {
            redirectUrl:'',
            redirect:false,
            bio : '',
            username: '',
            email:'',
            phone:null,
            gender:'',
            profil:null,
        }
    }

    componentDidMount(){
        if(!protectAuth){
            this.setState({redirect:true,redirectUrl:'/login'})
        }
        const userId = parseJwt(Cookies.get('access')).user_id
        axios.get(`http://127.0.0.1:8000/auth/profil/${userId}/edit/`,{
            headers : {
                "Authorization": 'Bearer ' + Cookies.get('access'),
            }
        })
        .then( res => {
            this.setState({
                username:res.data.nickname,
                email:res.data.email,
                phone:res.data.nomorHp,
                gender:res.data.gender,
                profil:res.data.profil,
                bio:res.data.bio,
                
            })
            console.log(res.data)
        })
        .catch( e => console.log(e) )
        M.AutoInit();

    }

    handleGender = (event) => this.setState({gender: event.target.value})
    handleUsername = (event) => this.setState({username: event.target.value})
    handlePhone = (event) => this.setState({phone: event.target.value})
    handleEmail = (event) => this.setState({email: event.target.value})
    handleBio = (event) => this.setState({bio: event.target.value})
    handleProfil = (event) => {
        if(event.target.files[0].size > 2097152 ){
            alert('this file to big low 2mb please')
        }else{
            this.setState({profil:event.target.files[0]})
        }
    }
    handleSubmit = () => {
        
        const userId = parseJwt(Cookies.get('access')).user_id
        const {email,phone,bio,username,gender,profil} = this.state
        let formdata = new FormData() ;
        formdata.append('bio',bio)
        formdata.append('gender',gender)
        formdata.append('nickname',username)
        formdata.append('nomorHp',phone)
        formdata.append('email',email)
        if(profil.size === undefined){

        }else{
            formdata.append('profil',profil)
        } 
    
        axios.put(`http://127.0.0.1:8000/auth/profil/${userId}/edit/`,
            formdata,{
            headers : {
                "Authorization": 'Bearer ' + Cookies.get('access'),
                'Content-Type': 'multipart/form-data',
            }
        })
        .then( res => console.log(res))
        .catch( e => {console.error(e)})
    }

    render() {
        if(this.state.redirect) return <Redirect to={this.state.redirectUrl}></Redirect>
        const {username,email,phone,gender,bio} = this.state
        return (
            <Fragment>
            <div className="row">
                <div className="col s12">
                    <div className="row">
                        <div className="input-field col s12">
                            <input placeholder="username" id="username" onChange={this.handleUsername} value={username === null ? '' : username} type="text" className="validate" />
                            <label htmlFor="username">UserName</label>
                        </div>
                    </div>
                    <div className="row">
                        <div className="input-field col s12">
                            <input placeholder="email" id="email" type="email" onChange={this.handleEmail} value={email === null ? '' : email } className="validate" />
                            <label htmlFor="email">Email</label>
                        </div>
                    </div>
                    <div className="row">
                        <div className="input-field col s12">
                            <textarea id="textarea1" className="materialize-textarea" onChange={this.handleBio} value={bio === null ? '' : bio } placeholder="Bio" ref={node => this.textareRef = node}></textarea>
                            <label htmlFor="textarea1">Bio</label>

                        </div>
                    </div>
                    <div className="row">
                        <div className="input-field col s12">
                            <input placeholder="Phone Number" id="Phone_Number" onChange={this.handlePhone} value={phone === null ? '' : phone } type="tel" className="validate"  />
                            <label htmlFor="Phone_Number">Phone Number</label>
                        </div>
                    </div>
                    <div className="row">
                        <div className="input-field col s12">
                            <select onChange={this.handleGender} defaultValue={gender === '' ? 'DEFAULT' : gender }>
                                <option value="DEFAULT" disabled>Choose a Your Gender</option>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                            </select>
                            <label>Gender Select</label>
                        </div>
                    </div>
                    <div className="row">
                       <div className="file-field input-field col s12">
                            <div className="btn">
                                <span>File</span>
                                <input onChange={this.handleProfil} type='file' accept={'image/*'}></input>
                            </div>
                        </div>
                    </div>
                    <button className='btn' onClick={this.handleSubmit}>send</button>
                </div> 
            </div>
            </Fragment>
        )
    }
}

export default AccountEdit ;