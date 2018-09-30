import React from 'react'
import './TextContainer.css'

export default class TextContainer extends React.Component {
  constructor(props) {
    super(props)
    console.log(`code:${this.props.data.code} name:${this.props.data.name} comment::${this.props.comment}`)
  }

  getClassName() {
  	return this.props.isSingle ? 'text_container_outer text_container_single' : 'text_container_outer text_container_multiple'
  }

  render() {
  	return (
  		<div className={this.getClassName()}>
  		  <p className='code'>{this.props.data.code}</p>
  		  <p className='name'>{this.props.data.name}</p>
        <hr/>
  		  <p className='comment'>{this.props.data.comment}</p>
  		</div>)
  }
}