import React from 'react'

export default class Test10 extends React.Component {
  constructor(props) {
  	super(props)
  	this.state = {aaa: '', gender: '', age: ''}
  	this.handleSubmit = this.handleSubmit.bind(this)
  	this.handleChange = this.handleChange.bind(this)
  }

  handleChange(event) {
  	let name = event.target.name
  	let value = event.target.value
  	this.curName = name
  	console.log(name)
    this.setState({[name]: value})
  }

  handleSubmit(event) {
  	console.log(this.curName)
	alert(this.state[this.curName])
	event.preventDefault()
  }

  render() {
  	return (
  		<div>
  		  <form onSubmit={this.handleSubmit}>
  		  	<label>Name: <input type='text' onChange={this.handleChange} name='aaa' value={this.state.aaa}></input></label>
  		  	<label>Gender: <input type='text' onChange={this.handleChange} name='gender' value={this.state.gender}></input></label>
  		  	<label>Age: <input type='text' onChange={this.handleChange} name='age' value={this.state.age}></input></label>
  		  	<input type='submit' value='Submit'/>
  		  </form>
  		</div>
  	)
  }
}