import React , {useState,useEffect,useRef,useCallback} from 'react'
import {Redirect} from 'react-router-dom'

import Content from './content'
import {protectAuth} from './auth'
import Cookies from 'js-cookie'
import FecthData from './fetchData'









export const home = () => {
  
  const [access] = useState(Cookies.get('access'))
  const [refresh] = useState(Cookies.get('refresh'))

  const [redirect,setRedirect] = useState(false)
  const [page,setPage] = useState(1)
  const [data,hasMore,loading] = FecthData(page,access)

  useEffect(() => {
      
      protectAuth(access,refresh).then(e => !e ? setRedirect(true) : setRedirect(false))    
  },[])
  
  const observer = useRef(null)
 
  const lastBookElementRef = useCallback ( node => {   
    if (loading) return
    if (observer.current) observer.current.disconnect()
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && !hasMore) {
        setPage(prevPageNumber => prevPageNumber + 1)}
      })
    if (node) observer.current.observe(node)
  }, [loading,hasMore])
  
  if(redirect) return <Redirect to='/login'/>
  
  return (
    <div className="container">
            <div className="row">
                <div className="col s8">
                  
                    {data.length > 0 ? data.map( (item ,i) => {
                        if(data.length === i + 1){
                          return ( 
                          <div ref={lastBookElementRef} key={i}>
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
                    {loading && 'loading'}
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