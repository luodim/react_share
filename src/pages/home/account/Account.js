import React from 'react'
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

class Account extends React.Component {
  constructor(props) {
    super(props)
    this.state ={avatar: defaultAvatar, bgWall: bgWall, loginCode: '', invitationCode: '', nickName: 'nickname', infoData:[], historyData:[]}
    this.infoName = ['Login Code', 'Invitation Code', 'Device Code']
    Utils.copyCtrl(window, true)
  }

  componentDidMount() {
    this.props.mountState('account')
    let http = new HttpEventHelper()
    let userId = Utils.getUserId()
    let event = Utils.buildEvents()
    let eventName = 'getUserInfoCB'
    event.on(eventName, result => {
      if (result.status === '200') {
      	let data = result.data[0]
	      this.setState({FingerCode: data.finger_code, InvitationCode: data.invitation_code, InvitationCodeRelated:data.invitation_code_related})
      } else if (result.status === '300') {
      	this.props.history.push({pathname: '/login'})
      }
    })
    http.getUserInfo(userId, event, eventName)
    this.event = event
    this.eventName = eventName
  }

  componentWillUnmount() {
    this.event.removeListener(this.eventName, () => {
      console.log('event listener is removed')
    });
  }

  getUserInfo() {

  }

  render() {
    let infoList = this.infoName.map((v, index) => <AccountInfoItem title={v} key={index} data={this.state.infoData[index]} iconShow={index === 1}/>)
  	return (
      <div className='account_outer'>
        <img src={this.state.bgWall} className='bg_wall'/>
        <img src={this.state.avatar} className='avatar'/>
        <p className='nickname'>{this.state.nickName}</p>
        <div className='info_list_area'>{infoList}</div>
        <div className='card_history_area'></div>
      </div>)
  }
}

export default withRouter(Account)