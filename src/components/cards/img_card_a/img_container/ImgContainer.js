import React from 'react'
import './ImgContainer.css'

export default class ImgContainer extends React.Component {
  constructor(props) {
    super(props)
  }

  getClassName() {
    return this.props.isSingle ? 'card_img card_img_single' : 'card_img card_img_multiple'
  }

  render() {
  	return (
  		<div className='img_container'>
  		  <img className={this.getClassName()} src={this.props.imgRes} alt='img'/>
  		</div>
  		)
  }
}