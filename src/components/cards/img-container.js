import React from 'react'
import './img-container.css'

export default class ImgContainer extends React.Component {

  render() {
  	return (
  		<div className='img_container'>
  		  <img src={this.props.imgRes}/>
  		</div>
  		)
  }
}