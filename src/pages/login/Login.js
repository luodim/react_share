import React from 'react'
import Loading from '../../components/loading/Loading.js'
import Logo from '../../asset/share_logo.png'
import InputArea from '../../components/input/InputArea.js'
import './Login.css'
import {withRouter} from 'react-router-dom'
import HttpEventHelper from '../../http/HttpEventHelper.js'
import Utils from '../../helper/Utils.js'

class Login extends React.Component {
  constructor(props) {
    super(props)
    this.state = {isLoading: false, iptValue: '', fingerCode: '', isFingerCodeShow: false}
    this.count = 0
  }

  handleClick() {
    if (!this.state.iptValue || this.state.iptValue === '') {
      console.log('empty click---')
      this.count ++
      if (this.count === 6) {
        this.count = 0
        this.setState({isFingerCodeShow: true})
      }
    }
    this.setState({isLoading: true})
    this.login()
  }

  handleIptChange(e) {
    this.setState({iptValue:e.target.value})
  }

  getFingerCode() {
    let event = Utils.buildEvents()
    let eventName = 'fingCodeCB'
    event.on(eventName, result => {
      this.setState({fingerCode: result})
      console.log(result)
    })
    Utils.getDevFingerCode(event, eventName)
  }

  getClassName() {
    return this.state.isFingerCodeShow ? 'finger_code_display finger_code_display_show' : 'finger_code_display finger_code_display_hidden'
  }

  componentDidMount() {
    this.getFingerCode()
  }

  login() {
    let helper = new HttpEventHelper()
    let event = Utils.buildEvents()
    let eventName = 'loginCB'
    event.on(eventName, result => {
      this.setState({isLoading: false})
      if (result.status === '200') {
        if (result.data.length > 0) {
          let id = result.data[0].user_id
          this.setCookie(id)
          this.props.history.push({pathname: '/home/home', state: { userId: id}})
        }
      } else {
        // show toast...
        console.log(result.message)
      }
    })
    helper.loginVerify(this.state.iptValue, this.state.fingerCode, event, eventName)
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
          <Loading isLoading={this.state.isLoading}/>
  	    </div>
        <p className={this.getClassName()}>{this.state.fingerCode}</p>
  		</div>)
  }
}

export default withRouter(Login)