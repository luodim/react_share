import React from 'react'

export default class Test6 extends React.Component {
  constructor(props) {
  	super(props)
  	this.array = ['a', 'b', 'c', 'd']
  }

  render() {
  	let items = this.array.map(el => <li key={el}>{el}</li>)
  	return (<ul>{items}</ul>)
  }
}