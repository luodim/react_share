import React from 'react'
import ReactDOM from 'react-dom'
import {withRouter} from 'react-router-dom'
import { dataManager, TYPE_HTTP, TYPE_SESSION } from '../../../data/DataManager.js'
import { USER_INFO_REQ, CONTRIBUTION_LIST_REQ, INVITATION_CODE_UPDATE_REQ, DEL_TARGET_INFO_REQ } from '../../../data/data_impl/HttpData.js'
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
import { observer,inject } from 'mobx-react'

const Account = inject('store')(observer(class Account extends React.Component {
  constructor(props) {
    super(props)
    this.homeStore = this.props.store.homeStore
    this.commonStore = this.props.store.commonStore
    this.count = 0
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
      let offsetY = this.doom.getBoundingClientRect().top
      this.homeStore.updateScrollY(offsetY)
    }
  }

  componentDidMount() {
    this.doom = ReactDOM.findDOMNode(this)
    // 通知父容器装载完毕，让父容器统一处理恢复及缓存清理动作
    this.homeStore.updateChildrenMountedState(true, 'account')
    // 开始请求
    this.getUserInfo()
    this.getContributionList()
  }

  componentWillUnmount() {
    // 通知父容器装载完毕，让父容器统一处理恢复及缓存清理动作
    this.homeStore.updateChildrenMountedState(false, 'account')
  }

  handleReqFinish() {
    this.count ++
    if (this.count === 2) {
      this.commonStore.showLoading(false)
      this.count = 0
    }
  }

  async getUserInfo() {
    this.commonStore.showLoading(true)
    let result = await dataManager.reqData(USER_INFO_REQ, TYPE_HTTP, {user_id:  this.homeStore.userId})
    this.handleReqFinish()
    if (result && result.status === '200') {
      let data = result.data[0]
      this.setState({fingerCode: data.finger_code, invitationCode: data.invitation_code, loginCode:data.invitation_code_related, nickname: data.nickname})
    } else if (result && result.status === '300') {
      this.props.history.push({pathname: '/login'})
    }
  }

  async getContributionList() {
    this.commonStore.showLoading(true)
    let result = await dataManager.reqData(CONTRIBUTION_LIST_REQ, TYPE_HTTP, {user_id: this.homeStore.userId})
    this.handleReqFinish()
    if (result && result.status === '200') {
      this.setState({historyData: result.data})
    } else if (result && result.status === '300') {
      this.props.history.push({pathname: '/login'})
    }
  }

  async handleInvitationCodeUpdate() {
    let result = await dataManager.reqData(INVITATION_CODE_UPDATE_REQ, TYPE_HTTP, {user_id: this.homeStore.userId})
    if (result && result.status === '200') {
      let data = result.data[0]
      this.setState({invitationCode: data.invitation_code})
    } else if (result && result.status === '300') {
      this.props.history.push({pathname: '/login'})
    }
  }

  async handleClear(unionId, index) {
    this.state.historyData.splice(index, 1)
    this.setState({historyData: this.state.historyData})
    let result = await dataManager.reqData(DEL_TARGET_INFO_REQ, TYPE_HTTP, {union_id: unionId})
    if (result && result.status === '200') {
      let data = result.data[0]
      console.log(`delete success`)
    } else if (result && result.status === '300') {
      this.props.history.push({pathname: '/login'})
    }
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
}))

export default withRouter(Account)