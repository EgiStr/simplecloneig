
import React ,{useState,useEffect} from 'react'

import { connect } from 'react-redux'


import {AvatarProfil} from '../../utils/auth/profilPicture'
import axios from '../../utils/axios'

import Loading from '../other/loading'
import InputComment from './commentHandle'
import Comments from './comment/allComments'
import Likes from '../other/posts/likes'
import Saves from '../other/posts/saves'

import '../../Posts.css'

export const DetailPosts = (props) => {
    const [data,setData] = useState({})
    const [loading,setLoading] = useState(true)

    const [height,setHeight] = useState(0)

    useEffect(()=> {
        axios.get(`api/${props.match.params.id}/detail/`)   
            .then(res => {
                const images = new Image()
                images.src = res.data.post
                images.onload = function() {setHeight(this.height)}    
                console.log(res.data)
                setData(res.data)
                setLoading(false)
            })
            .catch(e => console.log(e)) 
    },[])

    const {user,likes,caption,comments,create_at,id,content_type_id,post} = data
    const HeightContainer = height > 800 ? 800 : height 
    return (

        <div>
            {loading ? <Loading /> :
                <div className="container all-content" style={{marginTop:'20px',marginBottom:'20px',height:HeightContainer >500 ? HeightContainer : "500px"}}>
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
                            <div className="headers col s12 hide-on-small-only">
                                <div className="col s1 m3">
                                    <img
                                        src={AvatarProfil(user.profil)}
                                        alt="profil muuu"
                                        width="45"
                                        height="45"
                                        style={{borderRadius:'50%'}}
                                    />
                                </div>
                                <div className="col s8 m5">
                                    {user.nickname}
                                </div>
                            
                            <div className="divider" />
                        
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
