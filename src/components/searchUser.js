import React,{useState,useEffect} from 'react'
import {useHistory} from 'react-router-dom'
import axios from 'axios'

export const SearchUser = () => {
    const [search,setSearch] = useState('')
    const [data,setData] = useState({})
    const history = useHistory()
    // send api went search change
    // dengan kata lain live seacrh
    useEffect(() => {
        axios.get(`http://127.0.0.1:8000/auth/search/?search=${search}`)
        .then(res => {
            setData(res.data.results)
        })
        .catch(e => console.log(e))
    },[search])
    
    const redirect = (id) => history.push(`/profile/${id}`)
    return (
        <div>  

            <input onChange={(event)=>{setSearch(event.target.value)}}></input>        

             <ul className="collection">
            {console.log(data)}
            {data.length > 0 ? data.map((item) => {
                return (<li key={Math.floor(Math.random() * Math.floor(Math.random() * Date.now()))} onClick={() => {redirect(item.id)}} className="collection-item avatar">                                       
                <img loading='lazy' src={item.profil} className="circle" alt="...."/>
                <span className="title">{item.nickname}</span>
                <p>{item.id}</p>
               
            </li>
                )
            }) : null}
            </ul>
        
        </div>
    )
    
}

export default SearchUser

