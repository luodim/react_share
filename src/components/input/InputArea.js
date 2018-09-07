import React from 'react'
import './InputArea.css'

export default class InputArea extends React.Component {
  constructor(props) {
    super(props)
  }

  getHint() {
    if (this.props.textName === 'comment') {
      return `please enter your ${this.props.textName} for the girl`
    } else {
      return `please enter the ${this.props.textName} for the girl`
    }
  }

  getClassName() {
    return this.props.textName === 'comment' ? 'input_area input_multiple_line' : 'input_area input_single_line'
  }

  handleChange(e) {
    this.props.iptChangeCB(e.target.value)
  }

  getElement() {
    return this.props.textName === 'comment' ?
    (<textarea className={this.getClassName()} name={this.props.textName} placeholder={this.props.textName} onChange={(e) => this.handleChange(e)}/>):
    (<input className={this.getClassName()} type='text' name={this.props.textName} placeholder={this.props.textName} onChange={(e) => this.handleChange(e)}/>)
  }

  render() {
  	return (<div className='input_outer'>{this.getElement()}</div>)
  }
}