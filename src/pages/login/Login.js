import React from 'react'
import Loading from '../../components/loading/Loading.js'
import NormalIpt from '../../components/input/NormalIpt.js'
import './Login.css'
import { withRouter } from 'react-router-dom'
import { dataManager, TYPE_HTTP, TYPE_COOKIE } from '../../data/DataManager.js'
import { LOGIN_REQ } from '../../data/data_impl/HttpData.js'
import DynamicBg from '../../components/dynamic_bg/DynamicBg.js'
import Toast from '../../components/toast/Toast.js'
import Utils from '../../helper/Utils.js'
import { observer,inject } from 'mobx-react'

const Login = inject('store')(observer(class Login extends React.Component {
  constructor(props) {
    super(props)
    this.loginStore = this.props.store.loginStore
    this.commonStore = this.props.store.commonStore
  }

  async getFingerCode() {
    let result = await Utils.getDevFingerCode()
    this.loginStore.setFingerCode(result)
  }

  getClassName() {
    return this.loginStore.isFingerCodeShow ? 'finger_code_display finger_code_display_show' : 'finger_code_display finger_code_display_hidden'
  }

  getBtnClassName() {
    let className = 'loginBtn login_btn_up'
    if (this.commonStore.pointerState === 'pointerDown') {
      className = 'loginBtn login_btn_down'
    } else if (this.commonStore.pointerUp === 'pointerUp') {
      className = 'loginBtn login_btn_up'
    }
    return className
  }

  handlePointerUp() {
    this.commonStore.updatePointerState('pointerUp')
    if (!this.loginStore.iptValue || this.loginStore.iptValue === '') {
      this.loginStore.countEmptyClick()
      this.commonStore.showToast('请输入邀请码')
    } else {
      this.login()
    }
  }

  handlePointerDown() {
    this.commonStore.updatePointerState('pointerDown')
  }

  componentDidMount() {
    this.getFingerCode()
  }

  async login() {
    this.commonStore.showLoading(true)
    let result = await dataManager.reqData(LOGIN_REQ, TYPE_HTTP, {invitation_code: this.loginStore.iptValue, finger_code: this.loginStore.fingerCode})
    this.commonStore.showLoading(false)
    if (result && result.status === '200' && result.data.length > 0) {
      let id = result.data[0].user_id
      dataManager.setData({data: id, expire: 60 * 1000 * 60 * 24 * 365}, 'userId', TYPE_COOKIE)
      this.props.history.push({pathname: '/home/home', state: { userId: id}})
    } else {
      this.commonStore.showToast(result.message)
    }
  }

  render() {
  	return (
  		<div className='login_outer'>
        <DynamicBg/>
  		  <div className='ipt_area'>
          <NormalIpt tips='请输入邀请码'/>
  	      <button className={this.getBtnClassName()} onPointerDown={() => this.handlePointerDown()} onPointerUp={() => this.handlePointerUp()}>登录</button>
          <Loading />
  	    </div>
        <p className={this.getClassName()}>{this.loginStore.fingerCode}</p>
        <Toast/>
  		</div>)
  }
}))

export default withRouter(Login)