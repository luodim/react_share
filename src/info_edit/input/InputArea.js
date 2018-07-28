import React from 'react'
import './InputArea.css'

export default class InputArea extends React.Component {
  constructor(props) {
    super(props)
  }

  getHint() {
    if (this.props.textName === 'Description') {
      return `please enter your ${this.props.textName} for the girl`
    } else {
      return `please enter the ${this.props.textName} for the girl`
    }
  }

  getClassName() {
    return this.props.textName === 'Description' ? 'input_area input_multiple_line' : 'input_area input_single_line'
  }

  getElement() {
    return this.props.textName === 'Description' ?
    (<textarea className={this.getClassName()} cols='30' rows='5' name={this.props.textName} placeholder={this.props.textName}/>):
    (<input className={this.getClassName()} type='text' name={this.props.textName} placeholder={this.props.textName}/>)
  }

  render() {
  	return (<div className='input_outer'>{this.getElement()}</div>)
  }
}