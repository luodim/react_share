import React from 'react'
import TitleBar from '../info_edit/title_bar/TitleBar.js'
import './Detail.css'
import ImgPlaceholder from '../asset/share_placeholder.png'

export default class Detail extends React.Component {
  constructor(props) {
    super(props)
    this.testInfo = 'unfilled unfilled unfilled unfilled unfilled unfilled unfilled unfilled  unfilled unfilled unfilled unfilled unfilled unfilled unfilled unfilled unfilled unfilled unfilled unfilled unfilled unfilled unfilled unfilled unfilled unfilled unfilled unfilled unfilled unfilled unfilled unfilled'
  }

  render() {
  	return (
  		<div className='detail_outer'>
  		  <TitleBar title='Detail'/>
  	      <img className='detail_img' src={this.props.info ?  this.props.info.imgRes : ImgPlaceholder} alt='share'/>
  	      <p className='detail_name_number'>{this.props.info ? this.props.info.name : 'unfilled'}</p>
  	      <p className='detail_desc'>{this.props.desc || this.testInfo}</p>
  		</div>)
  }
}