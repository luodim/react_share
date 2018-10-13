import React from 'react'
import './CardB.css'
import { Link } from 'react-router-dom'
import ImgPlaceholder from '../../../asset/share_placeholder.png'

export default class CardB extends React.Component {
  constructor(props) {
    super(props)
  }

  getTitle() {
    let data = this.props.data
    if (data) {
      let code = data.code ? data.code : ''
      let name = data.name ? data.name : ''
      return `${code} ${name}`
    }
    return '未知'
  }

  getContent() {
  	let data = this.props.data
  	if (data) {
  	  return data.comment
  	}
  	return '未填写'
  }

  getImgRes() {
  	let data = this.props.data
  	return data.img_res_small || data.img_res || ImgPlaceholder
  }

  render() {
  	return (
  		<div className='card_b_outer'>
  		  <img className='card_b_img' src={this.getImgRes()} alt=''/>
  		  <div className='text_area'>
  		  	<p className='card_b_title'>{this.getTitle()}</p>
  		    <p className='card_b_content'>{this.getContent()}</p>
  		  </div>
  		  <div className='card_b_btn_area'>
  		    <Link to={{ pathname: '/detail', state: {data: this.props.data}}}>
            <button type='button' name='view'>View</button>
          </Link>
          <Link to={{ pathname: '/edit', state: {data: this.props.data}}}>
  		      <button type='button' name='edit'>Edit</button>
          </Link>
  		  </div>
  		</div>)
  }
}