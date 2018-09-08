import React from 'react'
import addIcon from '../../asset/baseline_add_circle_outline_black_48dp.png'
import closeIcon from '../../asset/baseline_close_black_48dp.png'
import './ImgUpload.css'
import {onLoadImg} from '../../helper/ImgHelper.js'

export default class ImgUpload extends React.Component {
  constructor(props) {
    super(props)
    this.state = {displayImg: false, src:'', iconclass: 'choose_img_icon_no_pic', imgInptValue: '0'}
  }

  getClassName(type) {
    if (type === 'tips') {
      return this.state.displayImg ? 'img_add_tip_outer img_add_tip_outer_hidden' : 'img_add_tip_outer img_add_tip_outer_show'
    } else {
      return this.state.displayImg ? 'display_img_container display_img_container_show' : 'display_img_container display_img_container_hidden'
    }
  }

  handleLoad(url) {
  	this.setState({displayImg: !this.state.displayImg, src: url, iconclass: 'choose_img_icon_pic'})
    this.props.handleImgCB(url)
  }

  handleUploadChange() {
  	let file = document.querySelector('input[type=file]').files[0];
  	onLoadImg(file, (url) => this.handleLoad(url))
  }

  handleClose(e) {
    if (this.state.displayImg) {
      this.setState({displayImg: false, iconclass: 'choose_img_icon_no_pic'})
      this.props.handleImgCB('')
    } else {
      // e.preventDefault()
    }
  }

  clearFileStatus(event) {
    event.target.value = null
  }

  render() {
  	return (
  		<div className='img_upload_outer'>
        <img className={this.state.iconclass} onClick={(e) => this.handleClose(e)}/>
        <div className={this.getClassName('tips')}>
  		    <label className='chooseIpt' htmlFor="file_upload">
  		  	  choose photo from your device
  		    </label>
        </div>
  		  <input type='file' className='file_input' accept="image/*" id='file_upload' onChange={() => this.handleUploadChange()} onClick={e => this.clearFileStatus(e)}/>
  		  <div className={this.getClassName('img')}>
  		    <img src={this.state.src} className='display_img'/>
  		  </div>
  		</div>)
  }
}