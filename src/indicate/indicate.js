import React from 'react'
import ReactDOM from 'react-dom'
import './indicate.css'

export default class Indicator extends React.Component {
  constructor(props) {
    super(props)
    this.state = {active: 0}
    this.curIndex = 0
    this.count = 0
  }

  handleClick(evt, index) {
  	this.setState({active: index})
  }

  getClassName(index) {
  	this.count ++
  	let stateClass
    if (index === this.state.active) {
	    stateClass = 'under-line-unit-show'
    } else {
      if (index === this.curIndex) {
        if (index > this.state.active) {
		  stateClass = 'under-line-unit-hide-to-left'
        } else {
          stateClass = 'under-line-unit-hide-to-right'
        }
      } else {
        stateClass = 'under-line-unit-hide-to-left'
      }
    }
    if (this.count === this.props.list.length) {
      this.curIndex = this.state.active
      this.count = 0
    }
    return `under-line-unit ${stateClass}`
  }

  render() {
  	const { active } = this.state
  	const el = this.props.list.map((value, index) => {
      return (
      	<div key={index} className='indicate-unit' onClick={(evt) => this.handleClick(evt, index)}>
      	  <div className='text-unit'>{value}</div>
      	  <div className={this.getClassName(index)}></div>
      	</div>)
  	})
  	return (<div className='indicate-outer'>{el}</div>)
  }
}