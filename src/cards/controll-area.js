import React from 'react'
import * as selectIcon from '../asset/baseline_favorite_black_24dp.png'
import * as unselectIcon from '../asset/baseline_favorite_border_black_24dp.png'
import * as popmotion from 'popmotion'
import {tween, easing} from 'popmotion'

export default class ControllArea extends React.Component {
  constructor(props) {
    super(props)
    this.props = props
    this.handleClick = this.handleClick.bind(this)
    this.taskState = this.setTaskState()
    this.state = {name: this.setText(), icon: this.setIcon()}
  }

  setTaskState() {
    return this.props.isInTask === 'true' ? true : false
  }

  setText() {
    return this.taskState ? 'remove from task' : 'add to task'
  }

  setIcon() {
    return this.taskState ? selectIcon : unselectIcon
  }

  handleClick() {
    this.taskState = !this.taskState
    this.setState({name: this.setText(), icon: this.setIcon()})
  }

  doControllAnim() {
    // this.curElement.className = 'controll_area_show'
  }

  render() {
  	return (
  		<div className='controll_area' ref={div => {this.curElement = div}}>
		    <label onClick={this.handleClick}><span>{this.state.name}</span><img src={this.state.icon}/></label>
  		</div>
  		)
  }
}