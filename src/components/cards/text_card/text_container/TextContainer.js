import React from 'react'
import './TextContainer.css'

export default class TextContainer extends React.Component {
  constructor(props) {
    super(props)
  }

  getClassName() {
  	return this.props.isSingle ? 'text_container_outer text_container_single' : 'text_container_outer text_container_multiple'
  }

  render() {
  	return (
  		<div className={this.getClassName()}>
  		  <p className='code'>{this.props.data.code ? this.props.data.code : '未知'}</p>
  		  <p className='name'>{this.props.data.name ? this.props.data.name : '未知'}</p>
        <hr/>
  		  <p className='comment'>{this.props.data.comment ? this.props.data.comment : '未填写'}</p>
  		</div>)
  }
}