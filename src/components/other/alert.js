import React,{ useEffect } from 'react'

import { connect } from 'react-redux'

import Notify from 'handy-notification'

export const alert = ({massage}) => {

    
    useEffect(() => {
        massage.massage !=='' && Notify({ value: massage.massage })
    },[massage])

    return <div className='handy-notify'>
                <span></span>
            </div>
       
    
}

const mapStateToProps = (state) => ({
    massage: state.massage
})


export default connect(mapStateToProps)(alert)
