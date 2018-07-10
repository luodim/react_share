import React from 'react'

export default class TempInput extends React.Component {
  constructor(props) {
  	super(props)
  	this.props = props
  	// this.state = {value: 0}
  	this.handleChange = this.handleChange.bind(this)
  }

  handleChange(event) {
	// this.setState({value: event.target.value})
	this.props.onTempChange(event.target.value)
  }

  render() {
  	let unit = this.props.scalee === 'c' ? 'C' : 'F'
	return (
		<div>
		  <label>
		  	<input value={this.props.temp} type='number' onChange={this.handleChange}/>{unit}
		  </label>
		</div>
	)
  }
}