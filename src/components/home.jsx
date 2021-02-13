import React , {Component} from 'react'
import {Redirect} from 'react-router-dom'
import axios from 'axios';
import Content from './content'
import {protectAuth} from './auth'
import Cookies from 'js-cookie'


class Home extends Component {
  constructor(props){
      super(props)
      this.state = {
        access : Cookies.get('access'),
        refresh : Cookies.get('refresh'),
        data : [],
        redirect: false,
      }
  }  

  componentDidMount(){
    if(!protectAuth(this.state.access,this.state.refresh)) this.setState({redirect:true})
    if(this.state.access !== undefined){
        axios({
            method:'GET',
            url:'http://127.0.0.1:8000/api/',
            headers:{
              "Authorization": 'Bearer ' + this.state.access
            }            
        })
        .then(res => {this.setState({data:res.data})
        console.log(res)
      })
        .catch( e => {
            console.log(e.request)
            this.setState({redirect:true})
        })
    }     
}
     
     
  render(){
    
    
    if(this.state.redirect) return <Redirect to='/login'/>
    
    const data = this.state.data
    return (
        <div className="container">
            <div className="row">
                <div className="col s8">
                    {/* data postingan */}
                    {data.map( (item ,i) => {
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
                    })}
                </div>
            </div>
        </div>
        
    )
  }
}; 

export default Home ;