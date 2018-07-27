import React from 'react'
import icon from '../asset/border-color.png'

export default class FloatButton extends React.Component {

  handleClick() {
	  console.log('float button is click')
  }

  shouldComponentUpdate(newProps, newState) {
    return Object.keys(newProps).length > 0
  }

  render() {
  	return (<div className='float_btn' onClick={() => this.handleClick()}><img className='float_icon' src={icon}/></div>)
  }
}