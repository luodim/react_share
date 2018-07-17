import React from 'react'

export default class Item extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
    	<div>
    	  <p><span>{this.props.goodsName}</span><span>{this.props.goodsPrice}</span></p>
    	</div>)
  }
}