import React from 'react'
import Logo from '../../asset/share_logo.png'
import './Splash.css'
import {withRouter} from 'react-router-dom'
import { dataManager, TYPE_COOKIE } from '../../data/DataManager.js'

class Splash extends React.Component {

  checkCookie() {
    let result = dataManager.reqData('userId', TYPE_COOKIE)
    console.log(`result is-----${result}`)
    let pathName = result === '' ? '/login' : '/home/home'
    this.timer = setTimeout(() => {
      this.props.history.push({pathname: pathName, state: { userId: result}})
    }, 1800)
  }

  componentDidMount() {
  	this.checkCookie()
  }

  render() {
  	return (
  		<div className='splash_outer'>
  		  <img className='splash_logo' src={Logo} alt='Welcome To Share'/>
  		  <p className='splash_text'>Welcome to share platform</p>
        <p className='version_code'>Ver 0.0.2</p>
  		</div>)
  }
}

export default withRouter(Splash)