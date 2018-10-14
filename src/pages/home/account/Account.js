import React from 'react'
import ReactDOM from 'react-dom'
import {withRouter} from 'react-router-dom'
import HttpEventHelper from '../../../http/HttpEventHelper.js'
import Utils from '../../../helper/Utils.js'
import TitleBar from '../../../components/title_bar/TitleBar.js'
import './Account.css'
import bgWall from '../../../asset/default_bg_wall.png'
import defaultAvatar from '../../../asset/default_avatar.png'
import AccountInfoItem from '../../../components/account_info_item/AccountInfoItem.js'
import CardA from '../../../components/cards/img_card_a/CardA.js'
import TextCard from '../../../components/cards/text_card/TextCard.js'
import CardB from '../../../components/cards/img_card_b/CardB.js'
import ContributionList from '../../../components/contribution_list/ContributionList.js'

class Account extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      avatar: defaultAvatar,
      bgWall: bgWall,
      fingerCode: '',
      loginCode: '',
      invitationCode: '',
      nickname: 'nickname',
      historyData:[]
    }
    this.infoTitle = ['登录密码', '邀请码', '设备码']
    window.onscroll = () => this.handleScroll()
    Utils.copyCtrl(window, true)
  }

  handleScroll() {
    if (this.doom) {
      this.offsetY = this.doom.getBoundingClientRect().top
      this.props.scrollCtrl(this.offsetY)
    }
  }

  componentDidMount() {
    this.props.mountState('account')
    this.doom = ReactDOM.findDOMNode(this)
    this.getUserInfo()
    this.getContributionList()
  }

  componentWillUnmount() {
    this.event.removeListener(this.eventName, () => {
      console.log('event listener is removed')
    });
  }

  getUserInfo() {
    let http = new HttpEventHelper()
    let userId = Utils.getUserId()
    let event = Utils.buildEvents()
    let eventName = 'getUserInfoCB'
    event.on(eventName, result => {
      this.props.reqState('account')
      if (result.status === '200') {
        let data = result.data[0]
        this.setState({fingerCode: data.finger_code, invitationCode: data.invitation_code, loginCode:data.invitation_code_related, nickname: data.nickname})
      } else if (result.status === '300') {
        this.props.history.push({pathname: '/login'})
      }
    })
    http.getUserInfo(userId, event, eventName)
    this.event = event
    this.eventName = eventName
  }

  getContributionList() {
    let http = new HttpEventHelper()
    let userId = Utils.getUserId()
    let event = Utils.buildEvents()
    let eventName = 'getContributionListCB'
    event.on(eventName, result => {
      this.props.reqState('account')
      if (result.status === '200') {
        this.setState({historyData: result.data})
      } else if (result.status === '300') {
        this.props.history.push({pathname: '/login'})
      }
    })
    http.getContributionList(userId, event, eventName)
  }

  handleInvitationCodeUpdate() {
    let http = new HttpEventHelper()
    let userId = Utils.getUserId()
    let event = Utils.buildEvents()
    let eventName = 'updateInvitationCodeCB'
    event.on(eventName, result => {
      if (result.status === '200') {
        let data = result.data[0]
        if (data) {
          this.setState({invitationCode: data.invitation_code})
        }
      } else if (result.status === '300') {
        this.props.history.push({pathname: '/login'})
      }
    })
    http.updateInvitationCode(userId, event, eventName)
  }

  handleClear(unionId, index) {
    let http = new HttpEventHelper()
    let event = Utils.buildEvents()
    let eventName = 'delTargetInfoCB'
    event.on(eventName, result => {
      if (result.status === '300') {
        this.props.history.push({pathname: '/login'})
      }
    })
    http.delTargetInfo(unionId, event, eventName)
    this.state.historyData.splice(index, 1)
    this.setState({historyData: this.state.historyData})
  }

  render() {
    let infoData = [this.state.loginCode, this.state.invitationCode, this.state.fingerCode]
    let infoList = this.infoTitle.map((v, index) => <AccountInfoItem title={v} key={index}
      data={infoData[index]} iconShow={index === 1} updateStateChange={() => this.handleInvitationCodeUpdate()}/>)
  	return (
      <div className='account_outer'>
        <img src={this.state.bgWall} className='bg_wall'/>
        <img src={this.state.avatar} className='avatar'/>
        <p className='nickname'>{this.state.nickname}</p>
        <div className='info_list_area'>{infoList}</div>
        <ContributionList datalist={this.state.historyData} clear={(unionId, index) => this.handleClear(unionId, index)}/>
      </div>)
  }
}

export default withRouter(Account)