import React from 'react'
import Loading from '../loading/Loading.js'
import Logo from '../asset/share_logo.png'
import './Login.css'
import {withRouter} from 'react-router-dom'

class Login extends React.Component {
  constructor(props) {
    super(props)
    this.state = {isLoading: false}
  }

  handleClick() {
    console.log('click')
    this.verifyUserId()
    this.setState({isLoading: true})
  }

  verifyUserId() {
    // 模拟验证
    setTimeout(() => {
      // success error
      this.setState({isLoading: false})
      // only success will invoke setCookie
      let id = 'admin'
      this.setCookie(id)
      this.props.history.push({pathname: '/home', state: { userId: id}})
    }, 1500)
  }

  setCookie(id) {
    console.log(`id is ${id}`)
    document.cookie = `userId=${id};`
  }

  render() {
  	return (
  		<div className='login_outer'>
  		  <div className='ipt_area'>
  		    <input className='userIdIpt' type='text' name='userId' placeholder='please enter invitation code'/>
  	      <button className='loginBtn' onClick={() => this.handleClick()}>Login In</button>
          <Loading isLoading={this.state.isLoading}/>
  	    </div>
  		</div>)
  }
}

export default withRouter(Login)