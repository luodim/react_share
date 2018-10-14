import React from 'react'
import TitleBar from '../../components/title_bar/TitleBar.js'
import './Detail.css'
import ImgPlaceholder from '../../asset/share_placeholder.png'
import Utils from '../../helper/Utils'
import Avatar from '../../asset/default_avatar.png'
import HttpEventHelper from '../../http/HttpEventHelper.js'
import HttpCache from '../../http/HttpCache.js'
import LocationIcon from '../../asset/baseline_location_on_black_48dp.png'
import likeSelected from '../../asset/baseline_favorite_black_24dp.png'
import likeUnselected from '../../asset/baseline_favorite_border_black_24dp.png'

export default class Detail extends React.Component {
  constructor(props) {
    super(props)
    this.data = this.getDetailData()
    this.state = {isLike: this.data.id, likeNum: 0, contributor: ''}
    Utils.copyCtrl(window, false)
    window.scrollTo(0, 0)
  }

  getDetailData() {
    this.index = this.props.location.state.index
    let result = {}
    let data = HttpCache.getPageData('reqHomeDataCB')
    if (data && data.data && data.data[this.index]) {
      result = data.data[this.props.location.state.index]
    } else {
      result = this.props.location.state.data
    }
    return result
  }

  componentDidMount() {
    let http = new HttpEventHelper()
    let event = Utils.buildEvents()
    this.reqLikeNum(http, event)
    this.reqContributorInfo(http, event)
  }

  reqLikeNum(http, event) {
    let eventName = 'getLikeNumCB'
    event.on(eventName, result => {
      if (result.status === '200') {
        this.setState({likeNum: result.data[0]['likeNum']})
      } else if (result.status === '300') {
        this.props.history.push({pathname: '/login'})
      }
    })
    http.getLikeNum(this.data.union_id, event, eventName)
  }

  reqContributorInfo(http, event) {
    let eventName = 'getContributorInfoCB'
    event.on(eventName, result => {
      if (result.status === '200') {
        this.setState({contributor: result.data[0]['nickname']})
      } else if (result.status === '300') {
        this.props.history.push({pathname: '/login'})
      }
    })
    http.getUserInfo(this.data.contributor, event, eventName)
  }

  getInfo(type) {
    let result = ''
    if (this.data) {
      switch (type) {
        case 'img':
          result = this.data.img_res
          break
        case 'name':
          let code = this.data.code ? this.data.code : ''
          let name = this.data.name ? this.data.name : ''
          result = !name && !code ? '未知' : `${code} ${name}`
          break
        case 'comment':
          result = this.data.comment
          break
        case 'contributor':
          result = this.state.contributor
          break
        case 'location':
          result = this.data.location && this.data.location !== 'unknown' ? this.data.location : '未知'
          break
        case 'timestamp':
          result = Utils.covertTimeStamp(this.data.timestamp)
          break
        default:
          result = ''
          break
      }
      return result
    }
  }

  getLikeIcon() {
    return this.state.isLike ? likeSelected : likeUnselected
  }

  handleLikeChange() {
    // todo暂时不提供在详情页操作喜欢不喜欢
    // this.setState({isLike:!this.state.isLike, likeNum:this.state.isLike ? this.state.likeNum - 1 : this.state.likeNum + 1})
    // let http = new HttpEventHelper()
    // let event = Utils.buildEvents()
    // let eventName = 'addDelTaskItemCB'
    // event.on(eventName, result => {
    //   if (result.status === '300') {
    //     this.props.history.push({pathname: '/login'})
    //   }
    // })
    // http.addDelTaskState(!this.state.isLike, Utils.getUserId(), this.data.union_id, event, eventName)
    // http.changeLikeCache(!this.state.isLike, this.index)
  }

  render() {
  	return (
  		<div className='detail_outer'>
  		  <TitleBar title='详情'/>
  	      <img className='detail_img' src={this.getInfo('img') || ImgPlaceholder} alt='share' onCopy={() => {return false}}/>
          <p className='detail_name_number'>{this.getInfo('name') || '未知'}</p>
          <div className='detail_subtitle_area'>
            <img className='detail_avatar' src={Avatar}/>
            <label>{this.getInfo('contributor')}</label>
            <img className='detail_location' src={LocationIcon}/>
            <label>{this.getInfo('location')}</label>
            <img className='detail_like' src={this.getLikeIcon()} onClick={() => this.handleLikeChange()}/>
            <label>{this.state.likeNum}</label>
          </div>
  	      <p className='detail_desc'>{this.getInfo('comment') || '未填写'}</p>
          <p className='detail_timestamp'>{this.getInfo('timestamp')}</p>
  		</div>)
  }
}