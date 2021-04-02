import { useEffect, useState } from 'react'

import axios from '../../utils/axios'

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
        axios.get(`api/?page=${page}`,config)
        .then( res => {
            setLoading(false)
            setHasMore(res.data.next === null )
            setData(prev => [...prev].concat(res.data.results))
            
        })
        .catch(e => setHasMore(false))
    },[page])

    
    return [data,hasMore,loading]
}

 