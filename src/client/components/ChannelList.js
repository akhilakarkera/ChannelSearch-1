import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import _ from 'lodash'

const ChannelList =({data})=>{
  
  const getTableHeaders=(row)=>{
    return <thead className="ChannelList-header">
              <tr className="ChannelList-subheader">
                {
                  Object.keys(row).map((key, i) => {
                    return <td key={'tableheader' + i} className="ChannelList-tableheader"> {key} </td>
                  })
                }
              </tr>
      </thead>
     }

  const getTableRows=(data)=> {
    return _.map(data,(row,index)=>{
        return (
          <tr key={'row-' + index} className="ChannelList-row">
              <td key={'id-'+row.Id}> {row.Id} </td>
              <td key={'name-'+row.Name}> {row.Name} </td>
              <td key={'satellite-'+row.Satellite}> {row.Satellite} </td>
          </tr>
        )
    })
  }
    
    return (
          <div className="ChannelList-content">
            <table>
                {getTableHeaders(data[0])}
              <tbody>
                {getTableRows(data)}
              </tbody>
            </table>
          </div>
    )
}


export default ChannelList
