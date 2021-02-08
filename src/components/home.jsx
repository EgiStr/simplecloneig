import React , {Component} from 'react'
import {Redirect} from 'react-router-dom'
import axios from 'axios';
import Content from './content'
class Home extends Component {
  constructor(props){
      super(props)
      this.state = {
        data : [],
        redirect: false,
      }
  }  

  componentDidMount(){
      if(localStorage.getItem('token') === null ){
          this.setState({redirect:true})
      }
      axios({
          method:'GET',
          url:'http://127.0.0.1:8000/api/',
          headers:{
            "Authorization": 'Bearer ' + localStorage.getItem('token')
          }

          
      })
      .then(res => {
          this.setState({data:res.data})
      })
      .catch( e => {
          this.setState({redirect:true})
      })
     }

 onSubmit(id){
    this.props.history.push(`/profil/${id}`);
    }


  render(){
    if(this.state.redirect){
        return <Redirect to='/login'/>
    }
    const data = this.state.data
    console.log(data)
    return (
        <div className="container">
            <div className="row">
                <div className="col s8">
                    {data.map( (item ,i) => {
                        return (
                        <Content
                                key      = {i}
                                postId   = {item.id}
                                userId   = {item.user.id}
                                username = {item.user.nickname}
                                captions = {item.caption}
                                imageUrl = {item.post}
                                avatar   = {item.user.profil}
                                like     = {item.likes}
                                />)
                    })}
                </div>
            </div>
        </div>
        
    )
  }
}; 

export default Home ;