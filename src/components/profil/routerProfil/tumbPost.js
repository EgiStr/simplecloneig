import React,{ Fragment,useRef,useCallback } from 'react'

import Modal from '../../other/posts/modalDetail'

import '../../../assert/css/tumbPost.css'

export const tumbPost = props => {
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
    return (
        <Fragment>
            <div className='col s12 m4' ref={post}>
              
                    <img
                        data-src={props.url}
                        src={'data:image/jpeg;base64,/9j/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAJAA4DASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAABQT/xAAlEAABAgQEBwAAAAAAAAAAAAABAgMABAYRBRIhMRM0NXGBkbL/xAAVAQEBAAAAAAAAAAAAAAAAAAABA//EABoRAAICAwAAAAAAAAAAAAAAAAECABIDERP/2gAMAwEAAhEDEQA/AAaWpluWZM5OKYmV3HACX0hYJ1JIzaWNt/Rg+qMQcUzKsmWQXGhYvFGVat9DY7RHhvTF90fKoFq7nfAh57axkmKrjqBP/9k='}
                        alt={'post....'}
                        className='modal-trigger post-image'
                        href={`#modal_id${props.postId}`}
                        width={300}
                        height={290}
                    />
            </div>
            <Modal 
                id={props.postId}
                key={props.id}
                postId={props.postId}
            />            

        </Fragment>
    )
}


export default tumbPost ;
