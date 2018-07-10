import React from 'react'
import TempInput from './temp_input.js'

export default class Test11 extends React.Component {
  constructor(props) {
	super(props)
	this.state = {scalee: 'c', value: 0}
	this.handleTempChangeC = this.handleTempChangeC.bind(this)
	this.handleTempChangeF = this.handleTempChangeF.bind(this)
  }

  toCelsius(f) {
	return (f - 32) * 5 / 9
  }

  toFahrenheit(c) {
	return (c * 9 / 5) + 32
  }

  handleTempChangeC(v) {
	this.setState({scalee: 'c', value: v})
  }

  handleTempChangeF(v) {
	this.setState({scalee: 'f', value: v})
  }

  render() {
  	let c = this.state.scalee === 'c' ? this.state.value : this.toCelsius(this.state.value)
  	let f = this.state.scalee === 'f' ? this.state.value : this.toFahrenheit(this.state.value)
  	return (
  		<div>
  		  <fieldset>
  		  	<legend>Enter the temperature value</legend>
  		  	<TempInput scalee='c' onTempChange={this.handleTempChangeC} temp={c}/>
  		  	<TempInput scalee='f' onTempChange={this.handleTempChangeF} temp={f}/>
  		  </fieldset>
  		</div>
  	)
  }
}