import React ,{ useState,lazy,Suspense,useCallback,useRef } from "react";

import { connect } from 'react-redux'
import { useHistory } from 'react-router-dom'
import Avatar from "@material-ui/core/Avatar";

import {AvatarProfil} from '../../utils/auth/profil'

import Saves from '../other/posts/saves'
import Likes from '../other/posts/likes'
import RedirectUser from '../other/profil/redirectUrl'

import '../../content.css'

const Modal = lazy(()=> import('./modalDetail'))


// menganti react-intersection-observer dengan observer API non npm

const Content =(props) => {
    
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
                        alt="foto" 
                        src={urlProfil} 
                />        
                <RedirectUser nickname={props.username} />
            </div>

            {/* membuat post image menjadi loading lazy alias diloading jika post an dilayar */}
            <div ref={post}>
                <img src="data:image/jpeg;base64,/9j/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAJAA4DASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAABQT/xAAlEAABAgQEBwAAAAAAAAAAAAABAgMABAYRBRIhMRM0NXGBkbL/xAAVAQEBAAAAAAAAAAAAAAAAAAABA//EABoRAAICAwAAAAAAAAAAAAAAAAECABIDERP/2gAMAwEAAhEDEQA/AAaWpluWZM5OKYmV3HACX0hYJ1JIzaWNt/Rg+qMQcUzKsmWQXGhYvFGVat9DY7RHhvTF90fKoFq7nfAh57axkmKrjqBP/9k=" className="contentImage" data-src={props.imageUrl} alt="foto" />
            </div>

            <div className="icon__box row">
                {/* like */}
                <div className="col s2">
                    <Likes postId={props.postId} likes={setState} />
                </div>
                {/* comment  */}
                <div className="col s2">
                    <a className="modal-trigger"  href={`#modal_id${props.id}`}><i className="small material-icons icon ">comment</i></a>
                </div>
                {/* save */}
                <div className="col s2 offset-s6">
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
                    <p className="col s12"><b><span onClick={() => history.push(`profile/${props.nickname}`)}>{props.username}</span></b> {props.captions}</p>

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