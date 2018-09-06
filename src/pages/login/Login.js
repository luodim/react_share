import React from 'react'
import Loading from '../../components/loading/Loading.js'
import Logo from '../../asset/share_logo.png'
import './Login.css'
import {withRouter} from 'react-router-dom'
import HttpEventHelper from '../../http/HttpEventHelper.js'
import Utils from '../../helper/Utils.js'

class Login extends React.Component {
  constructor(props) {
    super(props)
    this.state = {isLoading: false, iptValue: ''}
  }

  handleClick() {
    console.log('click----')
    this.setState({isLoading: true})
    this.login()
  }

  handleIptChange(e) {
    this.setState({iptValue:e.target.value})
    this.curIpt = e.target.value
  }

  login() {
    let helper = new HttpEventHelper()
    let e = Utils.buildEvents()
    let ev = 'fingerCodeCB'
    e.on(ev, r => {
      console.log(`finger code is ${r}`)
      let event = Utils.buildEvents()
      let eventName = 'loginCB'
      event.on(eventName, result => {
        this.setState({isLoading: false})
        if (result.status === '200') {
          if (result.data.length > 0) {
            let id = result.data[0].user_id
            this.setCookie(id)
            this.props.history.push({pathname: '/home', state: { userId: id}})
          }
        } else {
          // show toast...
          console.log(result.message)
        }
      })
      helper.loginVerify(this.curIpt, r, event, eventName)
    })
    Utils.getDevFingerCode(e, ev)
  }

  setCookie(id) {
    console.log(`id is ${id}`)
    document.cookie = `userId=${id};`
  }

  render() {
  	return (
  		<div className='login_outer'>
  		  <div className='ipt_area'>
  		    <input className='userIdIpt' type='text' name='userId' onChange={(e) => this.handleIptChange(e)} placeholder='please enter invitation code'/>
  	      <button className='loginBtn' onClick={() => this.handleClick()}>Login In</button>
          <Loading isLoading={this.state.isLoading}/>
  	    </div>
  		</div>)
  }
}

export default withRouter(Login)