import React from 'react'

export default class Test7 extends React.Component {
  constructor(props) {
  	super(props)
  	this.state = { value : '' }
  	this.handleSubmit = this.handleSubmit.bind(this)
  	this.handleChange = this.handleChange.bind(this)
  }

  handleSubmit(event) {
    // alert(this.state.value)
    // event.preventDefault()
    window.location.href = '../p.js'
  }

  handleChange(event) {
    this.setState({ value : event.target.value})
  }

  render() {
  	return (
  		<div>
  		  <form onSubmit={this.handleSubmit}>
  		  	<label>
  		  	  Name:
  		  	  <input type='text' value={this.state.value} onChange={this.handleChange}/>
  		  	</label>
  		  	<input type='submit' value='Submit'/>
  		  </form>
  	    </div>
  	)
  }


}