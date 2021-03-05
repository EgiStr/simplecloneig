import React ,{ useState,useEffect,lazy,Suspense,memo } from "react";

import { InView } from 'react-intersection-observer'
import { connect } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { parseJwt } from '../method/parseJwt'

import Avatar from "@material-ui/core/Avatar";
import axios from 'axios'
import Cookies from 'js-cookie'

import '../../content.css'

const Modal = lazy(()=> import('./comment/modal'))


// menganti react-intersection-observer dengan observer API non npm

const Content = memo((props) => {
    const user_id = parseJwt(Cookies.get('access')).user_id
    const history = useHistory()
    const [state,setState] = useState({
                                        redirect:false,
                                        redirectUrl:'',
                                        likes : props.like,
                                        buttonLikeClass:'small material-icons icon red-text',
                                        buttonNotClass:'small material-icons icon',
                                        })


    const handleProfilRedirect = Userid => history.push(`/profile/${Userid}`)
    
    useEffect(() => console.log('re-render'),[])
    // lazy loading
    const preloadingImg = img => {
        const src = img.getAttribute('data-src')
        if(!src) return
        img.src = src
    }
    
    const handleLikeButton = (postId) => {
        const data = {
            post:postId,
            user:user_id
        }

        axios.post('http://127.0.0.1:8000/api/like/',
        data,
        {headers : {
                    "Authorization": 'Bearer ' + Cookies.get('access')
                    }
        })
        
            .then(res => {
                // jiga ga ada id berarti menghapus
                res.data.id === undefined ? setState(prev => {
                                            return {...prev , 
                                                    buttonLikeClass :'small material-icons icon',
                                                    buttonNotClass :'small material-icons icon',
                                                    likes : prev.likes - 1
                                                }})
                                                : setState(prev => {
                                                    return {...prev , 
                                                        buttonLikeClass :'small material-icons icon red-text',
                                                        buttonNotClass :'small material-icons icon red-text',
                                                        likes : prev.likes + 1
                                                }})            
                
            })
            .catch(e => {console.log(e.request)})
    }

    const has_like = localStorage.getItem('like').split(",").map(Number).includes(props.postId)
    const urlProfil = `http://127.0.0.1:8000${props.avatar}`;

    return (

        <div className="box">
            <div className="head">             
                <Avatar 
                        className="avatar" 
                        alt="foto" 
                        src={urlProfil} 
                />        
                <h6 onClick={()=> {handleProfilRedirect(props.username)}}>{props.username}</h6>
            </div>

            {/* membuat post image menjadi loading lazy alias diloading jika post an dilayar */}
                <InView>
                    {/* daerah loading lazy */}
                {({ inView, ref, entry }) => (
                    <div ref={ref}>
                        {inView ? (preloadingImg(entry.target.firstChild)) : (null)}
                                                {/* placeholder burik  */}
                        <img src='data:image/jpeg;base64,/9j/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAJAA4DASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAABQT/xAAlEAABAgQEBwAAAAAAAAAAAAABAgMABAYRBRIhMRM0NXGBkbL/xAAVAQEBAAAAAAAAAAAAAAAAAAABA//EABoRAAICAwAAAAAAAAAAAAAAAAECABIDERP/2gAMAwEAAhEDEQA/AAaWpluWZM5OKYmV3HACX0hYJ1JIzaWNt/Rg+qMQcUzKsmWQXGhYvFGVat9DY7RHhvTF90fKoFq7nfAh57axkmKrjqBP/9k=' className="contentImage" data-src={props.imageUrl} alt="foto" />
                    </div>
                    )}
                </InView>

            <div className="icon__box">
                <p>{state.likes}</p> 
                    <a onClick={()=>{handleLikeButton(props.postId)}}><i className={ has_like ? state.buttonLikeClass : state.buttonNotClass }>favorite</i></a>
            <div>

                {/* comment  */}
                <a className="modal-trigger"  href={`#modal_id${props.id}`}><i className="small material-icons icon ">comment</i></a>
                    {/* lazy loading modal dengan react */}
                            
                    <Suspense fallback={<div></div>}>
                        <Modal 
                            key ={props.id}
                            id = {props.id}
                            postId= {props.postId}
                            username = {props.username}
                            profil = {urlProfil}
                            contentType={props.contentType}
                            obj_id = {props.postId}
                        />
                    </Suspense>
                
            </div>
                    {/* feature */}
                <i className="small material-icons icon ">near_me</i>
            </div>
                <h6 className="caption">
                 <b>{props.username}</b> {props.captions}
                </h6>
            
            </div>
        
    )
})

// class Content extends Component {
//     constructor(props){
//         super(props)
//         this.state = {
//             redirect:false,
//             redirectUrl:'',
//             likes : this.props.like,
//             buttonLikeClass:'small material-icons icon red-text',
//             buttonNotClass:'small material-icons icon',
            
//         }
//         this.user_id = parseJwt(Cookies.get('access')).user_id 
//     }
//     componentDidMount(){
//         console.log('mount')
//     }
    
    
   
    
//     render(){
        
//         if(this.state.redirect) return <Redirect to={this.state.redirectUrl} />
       
//         const has_like = localStorage.getItem('like').split(",").map(Number).includes(this.props.postId)
//         const urlProfil = `http://127.0.0.1:8000${this.props.avatar}`;
        
        
        
//         return (
//         <div className="box">
//             <div className="head">             
//                 <Avatar 
//                         className="avatar" 
//                         alt="foto" 
//                         src={urlProfil} 
//                 />        
//                 <h6 onClick={()=> {this.handleProfilRedirect(this.props.userId)}}>{this.props.username}</h6>
//             </div>

//         {/* membuat post image menjadi loading lazy alias diloading jika post an dilayar */}
//             <InView>
//                 {/* daerah loading lazy */}
//             {({ inView, ref, entry }) => (
//                 <div ref={ref}>
//                     {inView ? (this.preloadingImg(entry.target.firstChild)) : (null)}
//                                             {/* placeholder burik  */}
//                     <img src='data:image/jpeg;base64,/9j/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAJAA4DASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAABQT/xAAlEAABAgQEBwAAAAAAAAAAAAABAgMABAYRBRIhMRM0NXGBkbL/xAAVAQEBAAAAAAAAAAAAAAAAAAABA//EABoRAAICAwAAAAAAAAAAAAAAAAECABIDERP/2gAMAwEAAhEDEQA/AAaWpluWZM5OKYmV3HACX0hYJ1JIzaWNt/Rg+qMQcUzKsmWQXGhYvFGVat9DY7RHhvTF90fKoFq7nfAh57axkmKrjqBP/9k=' className="contentImage" data-src={this.props.imageUrl} alt="foto" />
//                 </div>
//                 )}
//             </InView>

//             <div className="icon__box">
//                 <p>{this.state.likes}</p> 
//                 {has_like ? (
//                     <a onClick={()=>{this.handleLikeButton(this.props.postId)}}><i className={this.state.buttonLikeClass}>favorite</i></a>
//                     ) : (
//                     <a onClick={()=>{this.handleLikeButton(this.props.postId)}}><i className={this.state.buttonNotClass}>favorite</i></a>
//                 )}
//             <div>
//                 {/* comment  */}
//                 <a className="modal-trigger"  href={`#modal_id${this.props.id}`}><i className="small material-icons icon ">comment</i></a>
//                     {/* lazy loading modal dengan react */}
                            
//                     <Suspense fallback={<div></div>}>
//                         <Modal 
//                             key ={this.props.id}
//                             id = {this.props.id}
//                             postId= {this.props.postId}
//                             username = {this.props.username}
//                             profil = {urlProfil}
//                             contentType={this.props.contentType}
//                             obj_id = {this.props.postId}
//                         />
//                     </Suspense>
                
//             </div>
//                         {/* feature */}
//           <i className="small material-icons icon ">near_me</i>
//         </div>
//         <h6 className="caption">
//           <b>{this.props.username}</b> {this.props.captions}
//         </h6>
//       </div>
//     )}
// }


// function Content({ username, captions, imageUrl, avatar }) {
//   return (
      
//   );
// }

const mapStateToProps = state => {
   return { 
    state   
    //    user_id :state.auth.user.user_id,
}}

export default connect(mapStateToProps)(Content);