import React from 'react'
import icon from '../asset/border-color.png'

export default class FloatButton extends React.Component {
  constructor(props) {
    super(props)
    this.props = props
  }

  handleClick() {
	  console.log('float button is click')
    this.props.clickHandle()
  }

  render() {
  	return (<div className='float_btn' onClick={() => this.handleClick()}><img className='float_icon' src={icon}/></div>)
  }
}