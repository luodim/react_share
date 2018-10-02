import React from 'react'
import TitleBar from '../../components/title_bar/TitleBar.js'
import './Detail.css'
import ImgPlaceholder from '../../asset/share_placeholder.png'
import Utils from '../../helper/Utils'
import Avatar from '../../asset/default_avatar.png'
import LocationIcon from '../../asset/baseline_location_on_black_48dp.png'
import LikeIcon from '../../asset/baseline_favorite_black_24dp.png'

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
        case 'contributor':
          result = this.data.contributor
          break
        case 'location':
          result = this.data.location
          break
        case 'timestamp':
          result = this.data.timestamp
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
          <div className='detail_subtitle_area'>
            <img className='detail_avatar' src={Avatar}/>
            <label>{this.getInfo('contributor')}</label>
            <img className='detail_location' src={LocationIcon}/>
            <label>{this.getInfo('location')}</label>
            <img className='detail_like' src={LikeIcon}/>
          </div>
  	      <p className='detail_desc'>{this.getInfo('comment') || 'unfilled'}</p>
          <p className='detail_timestamp'>{this.getInfo('timestamp')}</p>
  		</div>)
  }
}