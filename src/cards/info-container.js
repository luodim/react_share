import React from 'react'
import ControllArea from './controll-area.js'

export default class InfoContainer extends React.Component {

  render() {
  	return (
  		<div className='info_container'>
  		  <p>{this.props.name}</p>
  		  <ControllArea isInTask={this.props.isInTask}/>
  		</div>)
  }
}