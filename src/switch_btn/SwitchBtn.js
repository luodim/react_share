import React from 'react'
import './SwitchBtn.css'

export default class SwitchBtn extends React.Component {
  constructor(props) {
    super(props)
    this.state = {type: this.props.iconType === undefined ? 'multiple' : this.props.iconType}
  }

  handleClick() {
    this.setState ({type: this.state.type === 'multiple' ? 'single' : 'multiple'})
  }

  render() {
  	return (<div className={`switch_btn ${this.props.className || ''}`}><img className={this.state.type} onClick={() => this.handleClick()}/></div>)
  }
}