import React from 'react'
import ReactDOM from 'react-dom'
import './indicate.css'

export default class Indicator extends React.Component {
  constructor(props) {
    super(props)
    this.props = props
    this.myRef = React.createRef()
    console.log('indicator is build')
  }

  componentDidMount() {
  	this.doom = ReactDOM.findDOMNode(this)
  }

  handleClick(evt, index) {
  	console.log(`index is ${index}`)
  }

  render() {
  	const el = this.props.list.map((value, index) => {
      return (
      	<div key={index} className='indicate-unit' onClick={(evt) => this.handleClick(evt, index)}>
      	  <div className='text-unit'>{value}</div>
      	  <div className='under-line-unit under-line-unit-hide' ref={this.myRef}></div>
      	</div>)
  	})
  	return (<div className='indicate-outer'>{el}</div>)
  }
}