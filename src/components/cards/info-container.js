import React from 'react'
import ControllArea from './controll-area.js'
import './info-container.css'

export default class InfoContainer extends React.Component {

  handleTaskStateChange(state) {
    this.props.taskStateChange(state)
  }

  render() {
  	return (
  		<div className='info_container'>
  		  <p className='info_name_num'>{this.props.name}</p>
  		  <ControllArea isInTask={this.props.isInTask} taskStateChange={(state) => this.handleTaskStateChange(state)}/>
  		</div>)
  }
}