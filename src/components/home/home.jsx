import React , { useState,useEffect,useRef,useCallback } from 'react'

import axios from 'axios'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import Cookies from 'js-cookie'

import Content from './content'
import FecthData from './fetchData'
import CreatePost from '../createpost/createpost'
import { protectAuth } from '../../utils/auth/auth'
import PageNull from '../other/pageNull'
import Loading from '../other/loading'


export const home = ({ user }) => {
  const [page,setPage] = useState(1)
  
  // fetch data dari api
  // costume hooks 
  const [data,hasMore,loading] = FecthData(page,Cookies.get('access'))
  
  useEffect(() => {
    protectAuth(Cookies.get('access'),Cookies.get('refresh')).then(e => e ? '' : '' )
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
  
  
  if(user === null) return <Redirect to='/login'/>
  return (
    <div className="container">
            <div className="row">
                <div className="col s8">
                  {/* for post  */}
                  <CreatePost />

                  {/* data post homepage */}
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

                        } else {
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
                    }) : !loading && <PageNull page={'HOME PAGE'}/> }
             
                    {loading && <div className='center-align'><Loading /></div>}
                </div>
            </div>
        </div>
  )
}
const mapStateToProps = state => {
  return {
    user : state.auth.user,
  }
}
export default connect(mapStateToProps)(home) ;