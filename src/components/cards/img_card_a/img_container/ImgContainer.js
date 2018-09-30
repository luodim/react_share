import React from 'react'
import './ImgContainer.css'

export default class ImgContainer extends React.Component {
  constructor(props) {
    super(props)
  }

  getClassName() {
    return this.props.isSingle ? 'img_container card_img_single' : 'img_container card_img_multiple'
  }

  render() {
  	return (
  		<div className='img_container'>
  		  <img className={this.getClassName()} src={this.props.imgRes} alt='img'/>
  		</div>
  		)
  }
}