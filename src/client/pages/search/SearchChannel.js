import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import ChannelList from '../../components/ChannelList'
import ErrorPage from '../../components/ErrorPage'
import {fetchData } from './actions/Actions'

class SearchChannel extends Component {
  constructor(props) {
    super(props);
    this.updateSearchText = this.updateSearchText.bind(this);
    this.searchChannel = this.searchChannel.bind(this);
    this.state = {
      searchText : ' '
    }
  }

  updateSearchText(e) {
    this.setState({ searchText: e.target.value });
  }

  searchChannel() {
    (this.state.searchText).trim()!='' ? this.props.fetchData(this.state.searchText)  : this.setState({ searchText: '' });
  }

  render() {
    const { data, isLoading, isEmpty,isError } = this.props
    const { handleChange, onClick } = this

    return (
      <div className="Search-channel">
        <input className="Search-channel-text" type="text" onChange={ this.updateSearchText } placeholder="Search Channel"/>
        <button className='Search-channel-button' onClick={this.searchChannel}>Search</button>
        <div className={this.state.searchText=='' ? 'errortext' : 'hidediv'}>Please enter valid search criteria</div>
        <div className="container">
          { isEmpty || isError 
            ? <ErrorPage errortext={isEmpty ? 'No Search Results': 'Oops Something Went Wrong...'} /> : null } 
          { !isEmpty && !isLoading && <ChannelList data={data} /> }
         </div>
      </div>
    )
  }
}

SearchChannel.propTypes = {
  data: PropTypes.array.isRequired,
  isLoading: PropTypes.bool,
  isEmpty : PropTypes.bool,
  isError : PropTypes.bool
}

const mapStateToProps = (state) => {
  return {
    data : state.channelDataState.channelData,
    isLoading : state.channelDataState.isLoading,
    isEmpty :state.channelDataState.isEmpty,
    isError :state.channelDataState.isError
  }
}


const mapDispatchToProps = (dispatch) => {
  return {
    fetchData: (inputText) => {
      dispatch(fetchData(inputText))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchChannel)
