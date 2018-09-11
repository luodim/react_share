import React from 'react'
import ControllArea from './controll-area.js'

export default class InfoContainer extends React.Component {

  handleTaskStateChange(state) {
    this.props.taskStateChange(state)
  }

  render() {
  	return (
  		<div className='info_container'>
  		  <p>{this.props.name}</p>
  		  <ControllArea isInTask={this.props.isInTask} taskStateChange={(state) => this.handleTaskStateChange(state)}/>
  		</div>)
  }
}