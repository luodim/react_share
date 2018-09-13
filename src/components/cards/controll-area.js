import React from 'react'
import * as selectIcon from '../../asset/baseline_favorite_black_24dp.png'
import * as unselectIcon from '../../asset/baseline_favorite_border_black_24dp.png'
import './controll-area.css'

export default class ControllArea extends React.Component {
  constructor(props) {
    super(props)
    this.handleClick = this.handleClick.bind(this)
    this.taskState = this.props.isInTask
    this.state = {name: this.setText(), icon: this.setIcon()}
  }

  setTaskState() {
    return this.props.isInTask === true ? true : false
  }

  setText() {
    return this.taskState ? 'remove from task' : 'add to task'
  }

  setIcon() {
    return this.taskState ? selectIcon : unselectIcon
  }

  handleClick(e) {
    this.taskState = !this.taskState
    this.setState({name: this.setText(), icon: this.setIcon()})
    this.props.taskStateChange(this.taskState)
    e.stopPropagation()
  }

  render() {
  	return (
  		<div className='controll_area'>
		    <label onClick={this.handleClick}><span>{this.state.name}</span><img src={this.state.icon}/></label>
  		</div>
  		)
  }
}