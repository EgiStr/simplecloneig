import React , { useState,useEffect,useRef,useCallback } from 'react'

import Content from './content'


import FecthData from './fetchData'
import { protectAuth } from '../auth/auth'

import { Redirect } from 'react-router-dom'
import Cookies from 'js-cookie'
import axios from 'axios'

axios.defaults.headers.common['Authorization'] = 'Bearer ' + Cookies.get('access')


export const home = () => {
  const [state,setState] = useState({redirect:false,})
  const [page,setPage] = useState(1)

  // fetch data dari api

  const [data,hasMore,loading] = FecthData(page,Cookies.get('access'))

  useEffect(() => {
    // window.location.reload()
    protectAuth(Cookies.get('access'),Cookies.get('refresh')).then(e => e ? '' : setState({redirect:true}))

  },[])
  
  
  // infinite scroll
  // ref element terakhir
  const observer = useRef(null)
  const lastBookElementRef = useCallback ( node => {   
    // loading tidak di exe
    if (loading) return
    // kalau udh pernah ada yang terakhir disconnect 
    if (observer.current) observer.current.disconnect()
    // bikin baru observer baru
    observer.current = new IntersectionObserver(entries => {
      // kalau ada observer terlihat maka fecth baru 
      if (entries[0].isIntersecting && !hasMore) {
        setPage(prevPageNumber => prevPageNumber + 1)}
      })
      // kalo ada node inisialisasi dengan observer

    if (node) observer.current.observe(node)
  }, [loading,hasMore])
  
  if(state.redirect) return <Redirect to='/login'/>
  
  return (
    <div className="container">
            <div className="row">
                <div className="col s8">
                  
                    {data.length > 0 ? data.map( (item ,i) => {
                        if(data.length === i + 1){
                          return ( 
                            // membuat terakhir terobserve
                          <div ref={lastBookElementRef} key={i}>
                            <Content 
                                  key         = {i}
                                              // membuat uniq key untuk modal
                                  id          = {Math.floor(Math.random() * Math.floor(Math.random() * Date.now()))}
                                  contentType = {item.content_type_id}
                                  postId      = {item.id}
                                  userId      = {item.user.id}
                                  username    = {item.user.nickname}
                                  captions    = {item.caption}
                                  imageUrl    = {item.post}
                                  avatar      = {item.user.profil}
                                  like        = {item.likes}
                                  comment     = {item.comments}
                                  />
                          </div>

                                                   
                          )

                        }else{

                          return ( 
                          <Content 
                                  key        = {i}
                                              // membuat uniq key untuk modal
                                  id         = {Math.floor(Math.random() * Math.floor(Math.random() * Date.now()))}
                                  contentType= {item.content_type_id}
                                  postId     = {item.id}
                                  userId     = {item.user.id}
                                  username   = {item.user.nickname}
                                  captions   = {item.caption}
                                  imageUrl   = {item.post}
                                  avatar     = {item.user.profil}
                                  like       = {item.likes}
                                  comment    = {item.comments}
                                  />)
                        }
                    }) : null}
             
                    {loading ? (
                      <div className="preloader-wrapper active">
                        <div className="spinner-layer spinner-red">
                          <div className="circle-clipper left">
                            <div className="circle"></div>
                          </div><div className="gap-patch">
                            <div className="circle"></div>
                          </div>
                          <div className="circle-clipper right">
                            <div className="circle"></div>
                          </div>
                        </div>
                      </div>
                    ) : (null) }
                    {loading && <p>relog if take to long</p>}
                </div>
            </div>
        </div>
        
  )
}

// class Home extends Component {
//   constructor(props){
//       super(props)
//       this.state = {
//         access : Cookies.get('access'),
//         refresh : Cookies.get('refresh'),
//         data : [],
//         redirect: false,
//       }
//   }  

//   componentDidMount(){
//     const page = 1
//     const [data,hasPage] = FecthData(page)
//     if(!protectAuth(this.state.access,this.state.refresh)) this.setState({redirect:true})
//     if(this.state.access !== undefined){
//         axios({
//             method:'GET',
//             url:'http://127.0.0.1:8000/api/',
//             headers:{
//               "Authorization": 'Bearer ' + this.state.access
//             }            
//         })
//         .then(res => {this.setState({data:res.data})
//         console.log(res)
//       })
//         .catch( e => {
//             console.log(e.request)
//             this.setState({redirect:true})
//         })
//     }     
// }
     
     
//   render(){
    
    
//     if(this.state.redirect) return <Redirect to='/login'/>
    
//     const data = this.state.data
//     return (
//         <div className="container">
//             <div className="row">
//                 <div className="col s8">
//                     {/* data postingan */}
//                     {data.map( (item ,i) => {
//                         return ( 
//                         <Content 
//                                 key        = {i}
//                                             // membuat uniq key untuk modal
//                                 id         = {Math.floor(Math.random() * Math.floor(Math.random() * Date.now()))}
//                                 contentType= {item.content_type_id}
//                                 postId     = {item.id}
//                                 userId     = {item.user.id}
//                                 username   = {item.user.nickname}
//                                 captions   = {item.caption}
//                                 imageUrl   = {item.post}
//                                 avatar     = {item.user.profil}
//                                 like       = {item.likes}
//                                 comment    = {item.comments}
//                                 />)
//                     })}
//                 </div>
//             </div>
//         </div>
        
//     )
//   }
// }; 

export default home ;