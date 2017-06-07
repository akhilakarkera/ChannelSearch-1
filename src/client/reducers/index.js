import { combineReducers } from 'redux'
import { REQUEST_CHANNEL_DATA, RECEIVE_CHANNEL_DATA,ERROR_RESPONSE } from '../pages/search/actions/ActionTypes'


const channelDataState = (state = {
  isLoading: true,
  channelData: [],
  isEmpty: false,
  isError: false
}, action) => {
  switch (action.type) {
    case REQUEST_CHANNEL_DATA:
      return state;
    case RECEIVE_CHANNEL_DATA:
      return Object.assign({}, state, {
        isLoading: false,
        channelData: action.channelData || [],
        isEmpty : action.channelData.length==0,
        isError: false
      })
    case ERROR_RESPONSE:
      return Object.assign({}, state, {
        isLoading: true,
        channelData: action.channelData,
        isEmpty : false,
        isError: true
      })
    default:
      return state
  }
}




const rootReducer = combineReducers({
  channelDataState
})

export default rootReducer
