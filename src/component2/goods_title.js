import React from 'react'

export default class Title extends React.Component {
  constructor(props) {
    super(props)
	this.props = props
  }

  render() {
  	return (
  		<div>
  		  <h4>{this.props.name}</h4>
  		</div>)
  }
}