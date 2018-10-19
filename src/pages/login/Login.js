import React from 'react'
import Loading from '../../components/loading/Loading.js'
import './Login.css'
import {withRouter} from 'react-router-dom'
import HttpEventHelper from '../../http/HttpEventHelper.js'
import Utils from '../../helper/Utils.js'
import { observer,inject } from 'mobx-react'

const Login = inject('store')(observer(class Login extends React.Component {
  constructor(props) {
    super(props)
    this.loginStore = this.props.store.loginStore
    this.commonStore = this.props.store.commonStore
  }

  handleClick() {
    if (!this.loginStore.iptValue || this.loginStore.iptValue === '') {
      this.loginStore.countEmptyClick()
      this.commonStore.showToast('请输入邀请码')
    } else {
      this.commonStore.showLoading(true)
      this.login()
    }
  }

  handleIptChange(e) {
    this.loginStore.setIpt(e.target.value)
  }

  getFingerCode() {
    let event = Utils.buildEvents()
    let eventName = 'fingCodeCB'
    event.on(eventName, result => {
      this.loginStore.setFingerCode(result)
    })
    Utils.getDevFingerCode(event, eventName)
  }

  getClassName() {
    return this.loginStore.isFingerCodeShow ? 'finger_code_display finger_code_display_show' : 'finger_code_display finger_code_display_hidden'
  }

  componentDidMount() {
    this.getFingerCode()
  }

  login() {
    let helper = new HttpEventHelper()
    let event = Utils.buildEvents()
    let eventName = 'loginCB'
    event.on(eventName, result => {
      this.commonStore.showLoading(false)
      if (result.status === '200') {
        if (result.data.length > 0) {
          let id = result.data[0].user_id
          this.setCookie(id)
          this.props.history.push({pathname: '/home/home', state: { userId: id}})
        }
      } else {
        this.commonStore.showToast(result.message)
      }
    })
    helper.loginVerify(this.loginStore.iptValue, this.loginStore.fingerCode, event, eventName)
  }

  setCookie(id) {
    console.log(`id is ${id}`)
    let exp = new Date();
    exp.setTime(exp.getTime() + 60 * 1000 * 60 * 24 * 365);//过期时间1年
    document.cookie = `userId=${id};expires=${exp.toGMTString()}`
  }

  render() {
  	return (
  		<div className='login_outer'>
  		  <div className='ipt_area'>
          <input className='userIdIpt' type='text' name='userId' onChange={(e) => this.handleIptChange(e)} placeholder='请输入邀请码'/>
  	      <button className='loginBtn' onClick={() => this.handleClick()}>登录</button>
          <Loading />
  	    </div>
        <p className={this.getClassName()}>{this.loginStore.fingerCode}</p>
  		</div>)
  }
}))

export default withRouter(Login)