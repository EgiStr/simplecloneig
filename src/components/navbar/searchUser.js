import React,{useState,useEffect} from 'react'
import {useHistory} from 'react-router-dom'
import axios from 'axios'

export const SearchUser = () => {
    const [search,setSearch] = useState('')
    const [data,setData] = useState({})
    const history = useHistory()
    // send api went search change
    useEffect(() => {
    setData({})
    }, [search])
    // dengan kata lain live seacrh
    useEffect(() => {
      
        var cancel;

        axios.get(`http://127.0.0.1:8000/auth/search/?search=${search}`,
        {
            cancelToken :  new axios.CancelToken(c => cancel = c)
        })
        .then(res => {
            setData(res.data.results)
        })
        .catch(e => axios.isCancel(e) ? console.log('im cancel') : console.log(e.request))
     return () => cancel()
    },[search])

    
    
    const redirect = (Userid) => history.push(`/profile/${Userid}`)
    return (
       
       <div className='box-notif-search'>  

            <input onChange={(event)=>{setSearch(event.target.value)}}></input>        

                <ul className="collection">
            
                    {data.length > 0 ? data.map((item) => {
                        return (<li key={Math.floor(Math.random() * Math.floor(Math.random() * Date.now()))} onClick={() => {redirect(item.nickname)}} className="collection-item avatar">                                       
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

