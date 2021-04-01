import React,{ Fragment,useState } from 'react'
import { connect } from 'react-redux'
import { post_save,post_unsave } from '../../../action/auth'
import Cookies from 'js-cookie'
import axios from '../../../utils/axios'

export const saves = ({postId,user,post_save,post_unsave}) => {
    const [state,setState] = useState({   
        saveButton:'bookmark',
        unsaveButton:'bookmark_border',
    })
    

    const handleSaveButton = postId => {
        const data = {
            post:postId,
            user:user.user_id
        }

        const config = {
            headers : {
            "Authorization": 'Bearer ' + Cookies.get('access')
            }}

        axios.post('api/save/',data, config)
            .then(res => {
                const prev = localStorage.getItem('save').split(",").map(Number)
                // jiga ga ada id berarti menghapus
                res.data.id === undefined ? setState({
                                                    saveButton:'bookmark_border',
                                                    unsaveButton:'bookmark_border',
                                                })
                                                : setState({
                                                    saveButton:'bookmark',
                                                    unsaveButton:'bookmark',
                                                })  

                res.data.id === undefined ? post_unsave(prev,postId) : post_save(prev,postId)
                
            })
            .catch(e => {console.log(e.request)})
    }

    const has_save = localStorage.getItem('save').split(",").map(Number).includes(postId)


    return (
        <Fragment>
             <a onClick={()=> handleSaveButton(postId)}><i className="small material-icons icon " >{has_save ? state.saveButton : state.unsaveButton}</i></a>
        </Fragment>
    )
}

const mapStateToProps = state => ({
    user: state.auth.user
})

const mapDispatchToProps = {
    post_save,
    post_unsave,
}

export default connect(mapStateToProps, mapDispatchToProps)(saves)
