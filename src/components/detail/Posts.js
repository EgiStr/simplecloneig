
import React ,{useState,useEffect} from 'react'

import { connect } from 'react-redux'

import {AvatarProfil} from '../../utils/auth/profil'
import axios from '../../utils/axios'

import Loading from '../other/loading'
import InputComment from './commentHandle'
import Comments from './comment/allComments'

import Likes from '../other/posts/likes'
import Saves from '../other/posts/saves'
import Follow from '../other/profil/follow'
import More from '../other/profil/postEdit'
import Pagenull from '../other/pageNull'

import '../../Posts.css'


export const DetailPosts = (props) => {
    const [data,setData] = useState({})
    const [loading,setLoading] = useState(true)
    const [error,setError] = useState(false)
    
    const [height,setHeight] = useState(0)


    useEffect(()=> {
        const query = props.id || props.match.params.id

        axios.get(`api/${query}/detail/`)   
            .then(res => {
                const images = new Image()
                images.src = res.data.post
                images.onload = function() {setHeight(this.height)}    
                setData(res.data)
                setLoading(false)
            })
            .catch(e => {
                setLoading(true)
                setError(true)
            }) 
    },[])
    

    const {user,likes,caption,comments,create_at,id,content_type_id,post} = data
    const HeightContainer = height > 800 ? 800 : height 
    return (

        <div>
            {loading ? <div><Loading /> {error ? <Pagenull page={'this page 404'}/> : null   }</div> :
                <div className="container all-content" style={{marginTop:'20px',marginBottom:'20px',height:HeightContainer >500 ? HeightContainer : "650px"}}>
                    <div className="row">
                        <div className="col s12 m7 images"  style={{padding:0,margin:0}}>
                            <img
                                src={post}
                                id='posting'
                                alt="gambar mu..."
                                className="posting-img"
                            />
                        </div>
                        <div className="col s12 m5 detail">
                            <div className="headers col s12">
                                <div className="col s2 m2">
                                    <img
                                        src={AvatarProfil(user.profil)}
                                        alt="profil muuu"
                                        width="45"
                                        height="45"
                                        style={{borderRadius:'50%'}}
                                    />
                                </div>
                                <div className="col s2 m2" >
                                    <p style={{ fontWeight: "350",fontSize:15 }}><b>{user.nickname}</b></p>
                                </div>
                                {props.user.user_id === user.id 
                                ?
                                    <div className="col s1 m1  offset-s7 offset-m7">
                                        <More id={id} private={data.private} />
                                    </div>
                                
                                :
                                    <div className="col s4 m4">
                                        <Follow follow_id={user.id} />
                                    </div> 
                                }
                                
                                
                        
                            </div>
                            <div className="comments col s12">
                                <ul>

                                {caption !== '' ?(
                                    <div className="caption">
                                    <li className="comment-user">
                                        <div className="col s3">
                                            <img
                                                    src={AvatarProfil(user.profil)}
                                                    alt="profil muuu"
                                                    width="45"
                                                    height="45"
                                                    style={{borderRadius:'50%'}}
                                            />
                                        </div>
                                        <div className="col s8">
                                        <b>{user.nickname}</b> {caption}
                                        </div>
                                    </li>
                                    
                                </div>
                                ):null}
                                <Comments comments={comments} user_id={props.user.user_id} />
                              
                                </ul>
                    
                            </div>
                            <div className="interaction col s12">
                                <div className="divider" style={{margin:"15px 0"}}/>
                                <div className="col s2">
                                    <Likes postId={id} likes={setData}/>
                                </div>
                                <div className="col s2">
                                    <a onClick={()=>null}><i className='small material-icons icon '>comment</i></a>
                                </div>
                                <div className="col s2 offset-s5">
                                    <Saves postId={id}/>
                                </div>

                                <div className="col s6">
                                    {likes} likes
                                </div>
                                <div className="col s12">
                                    {create_at}
                                </div>
                                
                            </div>
                    
                            <div className="user-auth-comment col s12">
                           
                                <InputComment 
                                    contentType = {content_type_id}
                                    obj_id = {id}
                                />
                            </div>
                        </div>
                    </div>
                </div>
        }
    </div>
            
    )
}

const mapStateToProps = (state) => ({
    user: state.auth.user,    
})


export default connect(mapStateToProps)(DetailPosts)
