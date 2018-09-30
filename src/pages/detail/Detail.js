import React from 'react'
import TitleBar from '../../components/title_bar/TitleBar.js'
import './Detail.css'
import ImgPlaceholder from '../../asset/share_placeholder.png'
import Utils from '../../helper/Utils'

export default class Detail extends React.Component {
  constructor(props) {
    super(props)
    this.data = this.props.location.state.data
    Utils.copyCtrl(window, false)
    window.scrollTo(0, 0)
  }

  getInfo(type) {
    let result = ''
    if (this.data) {
      switch (type) {
        case 'img':
          result = this.data.img_res
          break
        case 'name':
          result = `${this.data.code} ${this.data.name}`
          break
        case 'comment':
          result = this.data.comment
          break
        default:
          result = ''
          break
      }
      return result
    }
  }

  render() {
  	return (
  		<div className='detail_outer'>
  		  <TitleBar title='Detail'/>
  	      <img className='detail_img' src={this.getInfo('img') || ImgPlaceholder} alt='share' onCopy={() => {return false}}/>
  	      <p className='detail_name_number'>{this.getInfo('name') || 'unfilled'}</p>
  	      <p className='detail_desc'>{this.getInfo('comment') || 'unfilled'}</p>
  		</div>)
  }
}