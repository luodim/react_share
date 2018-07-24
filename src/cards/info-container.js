import React from 'react'
import ControllArea from './controll-area.js'

export default class InfoContainer extends React.Component {
  constructor(props) {
    super(props)
    this.props = props
  }

  doInfoAnim() {
    this.cEl.doControllAnim()
  }

  render() {
  	return (
  		<div className='info_container'>
  		  <p ref={p => {this.pEl = p}}>{this.props.name}</p>
  		  <ControllArea isInTask={this.props.isInTask} ref={ControllArea => {this.cEl = ControllArea}}/>
  		</div>)
  }
}