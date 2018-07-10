import React from 'react'

export default class Test8 extends React.Component {
  constructor(props) {
	super(props)
	this.state = { value : 'please enter info' }
	this.handleChange = this.handleChange.bind(this)
	this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit(event) {
    alert(this.state.value)
    event.preventDefault()
  }

  handleChange(event) {
    this.setState({ value : event.target.value})
  }

  render() {
  	return (
  		<div>
  		  <form onSubmit={this.handleSubmit}>
  		  	Name:
  		  	<textarea value={this.state.value} onChange={this.handleChange}/>
  		  	<input type='submit' value='Submit'/>
  		  </form>
  		</div>
  	)
  }
}