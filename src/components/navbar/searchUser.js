import React,{useState,useEffect} from 'react'
import {useHistory} from 'react-router-dom'
import axios from 'axios'
import Loading from '../other/loading'
import PageNull from '../other/pageNull'


export const SearchUser = () => {
    const history = useHistory()
            
    const [search,setSearch] = useState('')
    const [data,setData] = useState({})
    const [loading,setLoading] = useState(false)

    // send api went search change
    useEffect(() => {
        delete axios.defaults.headers.common["Authorization"];
        var cancel;
        setLoading(true)
        axios.get(`http://127.0.0.1:8000/auth/search/?search=${search}`,
        {
            cancelToken :  new axios.CancelToken(c => cancel = c)
        })
        .then(res => {
            setLoading(false)
            setData(res.data.results)
        })
        .catch(e => axios.isCancel(e) ? console.log('im cancel') : '')
     return () => cancel()
    },[search])


    const redirect = (Userid) => history.push(`/profile/${Userid}`)
    return (
       
        <div className='box-notif-search'>  

            <input onChange={(event)=>{setSearch(event.target.value)}} placeholder="search User...."></input>        
            {loading ? <Loading /> : null}
            <div className="divider" style={{margin:"15px 0"}}/>
                <ul className="collection row">
                    {data.length > 0 ? data.map((item) => {
                        return (
                        <li key={Math.floor(Math.random() * Math.floor(Math.random() * Date.now()))} onClick={() => {redirect(item.nickname)}} className="collection-item avatar hoverable col s12" style={{cursor:'pointer',margin:3}}>                                       
                                  
                                        <img loading='lazy' src={item.profil} className="circle" alt="...."/>
                                        <span className="title"><b>{item.nickname}</b></span>
                                        <p>{item.name}</p>
                                  
           
                        </li>
                        )
                    }) : <PageNull page={`not Name ${search}`} />}

                </ul>
        
        </div>
       )
       
    
    
}

export default SearchUser

