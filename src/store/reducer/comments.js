const add_comment = (prev,comment) => {
    prev.push(comment)
    return prev
}

const delete_comment = (prev,comment) => {
    const newcomment = prev.filter(pv => pv.id !== comment)
    return newcomment
}

const delete_comment_replies = (prev,comment) => {
    const newcomment = prev.filter(pv => pv.id !== comment)
    return newcomment
}



const initialState = {
    comments : [],
    replies : [],
    parent : null,
    username : null,
    
}

const comment = (state =initialState, action) => {
    let py = action.payload
    switch(action.type){
        case 'GET_COMMENT':
            return {
                ...state,
                comments:py
            }
        
        case 'GET_REPLIES':
            return {
                ...state,
                replies:py
            }
        
        case 'ADD_COMMENTS':
            return {
                ...state,
                comments:add_comment(state.comments,py)
            }
        
        case 'DELETE_COMMENTS':
            return {
                ...state,
                comments:delete_comment(state.comments,py)
            }

        case 'DELETE_COMMENTS_REPLIES':
            return {
                ...state,
                replies:delete_comment_replies(state.replies,py)
            }
        case 'RESET_REPLIES':
            return {
                ...state,
                replies:[],
            }

        case 'UPDATE_PARENT' :
            return {
                ...state,
                parent:py,
            }
        case 'UPDATE_USERNAME' :
            return {
                ...state,
                username:py,
            }
        

            

        default :
            return state
    }
}

export default comment ;