import fetch from 'isomorphic-fetch'
import _ from 'lodash'; 
import { REQUEST_CHANNEL_DATA, RECEIVE_CHANNEL_DATA,ERROR_RESPONSE } from './ActionTypes'
import config from '../../../config'


const mapChannelData = (channelData) => {
  return _.sortBy(_.map(channelData,(channel)=> {
    return{
      'Id':channel.uid,
      'Name':channel.name,
      'Satellite':channel.Satellite}
  }),(channel)=>{
    return channel.name; 
  })
}

const requestStatus = (searchText) => {
  return {
    type: REQUEST_CHANNEL_DATA,
    searchText
  }
}

const successStatus = (json) => {
  var channelData = []
  return {
    type: RECEIVE_CHANNEL_DATA,
    channelData: mapChannelData(json)
  }
}

const errorStatus = (err) => {
  return {
    type: ERROR_RESPONSE,
    channelData: []
  }
}

export const fetchData = (inputText) => {
  return (dispatch) => {
    dispatch(requestStatus(inputText))
    return fetch(`${config.proxyURL}${config.apiUrl}?t=${inputText}&sat=&r=json`)
      .then((response) => response.json())
      .then((json) => dispatch(successStatus(json)))
      .catch((err) => dispatch(errorStatus(err)))
  }
}

