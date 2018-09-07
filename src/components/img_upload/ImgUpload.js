import React from 'react'
import addIcon from '../../asset/baseline_add_circle_outline_black_48dp.png'
import closeIcon from '../../asset/baseline_close_black_48dp.png'
import './ImgUpload.css'
import {onLoadImg} from '../../helper/ImgHelper.js'

export default class ImgUpload extends React.Component {
  constructor(props) {
    super(props)
    this.state = {displayImg: false, src:''}
  }

  getClassName(type) {
    if (type === 'tips') {
      return this.state.displayImg ? 'add_tip add_tip_hidden' : 'add_tip add_tip_show'
    } else {
      return this.state.displayImg ? 'display_img_container display_img_container_show' : 'display_img_container display_img_container_hidden'
    }
  }

  handleLoad(url) {
  	this.setState({displayImg: !this.state.displayImg, src: url})
    this.props.handleImgCB(url)
    console.log(`///////---------url is ${url}`)
  }

  handleUploadChange(e) {
  	let file = document.querySelector('input[type=file]').files[0];
  	onLoadImg(file, (img) => this.handleLoad(img))
  }

  handleClose() {
    this.setState({displayImg: !this.state.displayImg})
    this.props.handleImgCB('')
  }

  render() {
  	return (
  		<div className='img_upload_outer'>
  		  <label className={this.getClassName('tips')} htmlFor="file_upload">
  		    <img className='choose_img_icon' src={addIcon}/>
  		  	choose photo from your device
  		  </label>
  		  <input type='file' className='file_input' accept="image/*" id='file_upload' onChange={(e) => this.handleUploadChange(e)}/>
  		  <div className={this.getClassName('img')}>
  		    <img src={this.state.src} className='display_img'/>
  		    <img src={closeIcon} className='close_icon' onClick={() => this.handleClose()}/>
  		  </div>
  		</div>)
  }
}