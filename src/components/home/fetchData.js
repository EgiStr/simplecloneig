import { useEffect, useState } from 'react'

import axios from 'axios'

export default function FecthData(page,access) {
    
    const [loading, setLoading] = useState(true)
    const [data, setData] = useState({})
    const [hasMore, setHasMore] = useState(false)
    

    useEffect( () => {
        const config = {
            headers:{
            "Authorization": 'Bearer ' + access,
        }}
        setLoading(true)
        axios.get(`http://127.0.0.1:8000/api/?page=${page}`,config)
        .then( res => {
            setLoading(false)
            setHasMore(res.data.next === null )
            setData(prev => [...prev].concat(res.data.results))
            
        })
        .catch(e => setHasMore(false))
    },[page])

    
    return [data,hasMore,loading]
}

 