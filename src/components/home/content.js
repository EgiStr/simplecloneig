import React ,{ useState,lazy,Suspense,useCallback,useRef } from "react";

import { connect } from 'react-redux'
import { useHistory } from 'react-router-dom'

import {AvatarProfil} from '../../utils/auth/profil'

import Saves from '../other/posts/saves'
import Likes from '../other/posts/likes'
import RedirectUser from '../other/profil/redirectUrl'


import Avatar from "../other/profil/avatarProfil";
import CommentHandle from "../other/comment/commentHandle";

const Modal = lazy(()=> import('./modalDetail'))


const Content = props => {
    
    const history = useHistory()
   
    if(props.user === null) history.push('/login')
    
    const [state,setState] = useState({ likes : props.like })

    // lazy loading
    const preloadingImg = img => {
        const src = img.getAttribute('data-src')
        if(!src) return
        img.src = src
    }
     
    // lazy loading
    const observer = useRef(null)
    const post = useCallback ( node => {   
        // kalau udh pernah ada yang terakhir disconnect 
        if (observer.current) observer.current.disconnect()
        // bikin baru observer baru
        observer.current = new IntersectionObserver(entries => {  
            // kalau ada observer terlihat maka fecth baru 
            if (entries[0].isIntersecting ) {
                preloadingImg(entries[0].target.firstChild)
        }})
        // kalo ada node, inisialisasi dengan observer

        if (node) observer.current.observe(node)
  },[])

    const urlProfil = AvatarProfil(props.avatar);
    
    return (
        <div className="box ">
            <div className="head">             
                <Avatar 
                        className="avatar" 
                        width={50}
                        height={50}
                        src={urlProfil} 
                />        
                <RedirectUser nickname={props.username} />
            </div>

            {/* membuat post image menjadi loading lazy alias diloading jika post an dilayar */}
            <div ref={post}>
                <img style={{maxHeight:'600px'}} src="data:image/jpeg;base64,/9j/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAJAA4DASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAABQT/xAAlEAABAgQEBwAAAAAAAAAAAAABAgMABAYRBRIhMRM0NXGBkbL/xAAVAQEBAAAAAAAAAAAAAAAAAAABA//EABoRAAICAwAAAAAAAAAAAAAAAAECABIDERP/2gAMAwEAAhEDEQA/AAaWpluWZM5OKYmV3HACX0hYJ1JIzaWNt/Rg+qMQcUzKsmWQXGhYvFGVat9DY7RHhvTF90fKoFq7nfAh57axkmKrjqBP/9k=" className="contentImage" data-src={props.imageUrl} alt="foto" />
            </div>

            <div className="icon__box row">
                {/* like */}
                <div className="col s2">
                    <Likes postId={props.postId} likes={setState} />
                </div>
                {/* comment  */}
                <div className="col s2">
                    <a onClick={() => history.push(`/p/${props.postId}`)}><i className="small material-icons icon ">comment</i></a>
                </div>
                {/* save */}
                <div className="col s2 offset-s5">
                    <Saves postId={props.postId} />
                </div>
                    {/* lazy loading modal dengan react */}            
                    <Suspense key={props.id} fallback={<div></div>}>
                        <Modal 
                            key ={props.id}
                            id = {props.id}
                            postId= {props.postId}
                        />
                    </Suspense>
                 </div>
            <div>
                    {/* feature */}
            </div>
                <div className="row caption-area">
                    <p className="col s12">{state.likes} Likes</p> 
                    {props.captions && <p className="col s12"><b><span style={{cursor:'pointer'}} onClick={() => history.push(`/profile/${props.username}`)}>{props.username}</span></b> {props.captions}</p>}
                    {props.count > 0 && 
                    <div>
                             <a className="modal-trigger col s12"  href={`#modal_id${props.id}`} style={{cursor:'pointer',margin:'3px 0'}} > views all {props.count} comments </a>
                             {props.comment.map((item,i) => <p key={i} className="col s12 "><b><span style={{cursor:'pointer'}}  onClick={() => history.push(`/profile/${item.user.nickname}`)}>{item.user.nickname}</span></b> {item.content}</p>)}
                    </div>
                    }
                    <p className="col s12" style={{fontStyle:'italic',fontSize:12,color:'rgb(138, 130, 129)'}}>{props.timestamp} </p>
                    <div className="col s12" style={{margin:0,marginTop:20}}>
                        <CommentHandle 
                            contentType = {props.contentType}
                            obj_id = {props.postId}
                        />
                    </div>
                </div>
            
            </div>
        
    )
}

const mapStateToProps = state => {
    return {
        user:state.auth.user,
    }
}
export default connect(mapStateToProps)(Content);