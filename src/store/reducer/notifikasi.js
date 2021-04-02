
const initialState = {
    notifications : [],
    unreadNotifications : 0
}

const notifikasi = (state = initialState, action) => {
  let py = action.payload

  switch (action.type) {
    case 'GET_NOTIFICATIONS':
      return { 
        ...state,
        notifications: py 
      }
      

    case 'CLEAR_NOTIFICATIONS':
      return { 
        ...state,
        notifications: [] 
      }
      

    case 'GET_UNREAD_NOTIFICATIONS':
      localStorage.setItem('notif', py)
      return { 
        ...state,
        unreadNotifications: py 
      }
      

    case 'READ_NOTIFICATIONS':
        localStorage.setItem('notif', 0)
      return {
        ...state,
        unreadNotifications: 0 
      }
    case 'SUCCESS_NOTIFICATIONS':
      return state
    default:
      return state
      
  }

}
export default notifikasi