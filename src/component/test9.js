import React from 'react'

export default class Test9 extends React.Component {
  constructor(props) {
	super(props)
	this.state = {value: 'ccc'}
	this.handleSelect = this.handleSelect.bind(this)
  }

  handleSelect(event) {
  	this.setState({value: event.target.value})
  }

  render() {
  	return (
  		<div>
  		  <select value={this.state.value} onChange={this.handleSelect}>
  		  	<option value='aaa'>AAA</option>
  		  	<option value='bbb'>BBB</option>
  		  	<option value='ccc'>CCC</option>
  		  	<option value='ddd'>DDD</option>
  		  	<option value='eee'>EEE</option>
  		  </select>
  	    </div>)
  }
}