import React from 'react'

export default class SearchBar extends React.Component {
  constructor(props) {
    super(props)
    this.state = {inputGoods: '', checkBox: true}
    this.handleInputChange = this.handleInputChange.bind(this)
  }

  handleInputChange(event) {
  	let name = event.target.name
  	let value = event.target.value
  	let check = event.target.checked
  	let v = name === 'inputGoods' ? value : check
  	this.setState({[name]: v})
  }

  render() {
  	return (
  	  <div>
  	  	<input type='text' value={this.state.inputGoods} placeholder={this.props.hint} onChange={this.handleInputChange} name='inputGoods'/>
  	  	<div>
  	  	  <input type='checkbox' checked={this.state.checkBox} onChange={this.handleInputChange} name='checkBox'/> Only show products in stock
  	  	</div>
  	  </div>)
  }

}