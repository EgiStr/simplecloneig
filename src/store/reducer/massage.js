const initialState = {
    massage :'',
}

export default (state =initialState, action) => {
    
    let py = action.payload
    
    switch(action.type){
    
        case 'GET_SUCCESS_MASSAGE':
            return {
                ...state,
                massage: py,

            }
        
        case 'GET_FAIL_MASSAGE':
            return {
                ...state,
                massage: py,

            }
        
      
        default :
            return state
    }
} ;