import {useEffect, useState} from 'react'
import axios from 'axios'

export default function FecthData(page,access) {

    
    const [loading, setLoading] = useState(true)
    const [data, setData] = useState({})
    const [hasMore, setHasMore] = useState(false)
    console.log('hitung')

    useEffect( () => {
        axios.get(`http://127.0.0.1:8000/api/?page=${page}`,
        {headers:{
            "Authorization": 'Bearer ' + access,
        }})
        .then( res => {
        
            setLoading(false)
            setHasMore(res.data.next === null )
            setData(prev => [...prev].concat(res.data.results))
            
        })
        .catch(e => setHasMore(false))
    },[page])

    
    return [data,hasMore,loading]
}


// export const useIntese = () => {
//     const [entries,updateEntries] = useState({})
//     const observer = useRef(
//         new window.IntersectionObserver(([entries])=> updateEntries(entries))
//       );

//     useEffect( () => {
//         observer.current.observe(node.current)
//         return () => observer.current.disconnect()
//     })
//     return entries
// }