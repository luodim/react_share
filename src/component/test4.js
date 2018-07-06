import React from 'react'

export default class Test4 extends React.Component {
  constructor(props) {
  	super(props)
  	this.state = {isON : true}
  	// bind is very important
  	this.handlerClick = this.handlerClick.bind(this)
  }

  render() {
	return (
	  <button onClick={this.handlerClick}>
	    {this.state.isON ? 'ON' : 'OFF'}
	  </button>
	)
  }

  handlerClick() {
  	this.setState({isON : !(this.state.isON)})
  }
}