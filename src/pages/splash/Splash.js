import React from 'react'
import Logo from '../../asset/share_logo.png'
import './Splash.css'
import {withRouter} from 'react-router-dom'
import Utils from '../../helper/Utils.js'

class Splash extends React.Component {

  checkCookie() {
    let result = Utils.getUserId()
    console.log(`result is-----${result}`)
    // let pathName = result === '' ? '/login' : '/home/home'
    // test---------
    let pathName = '/login'
    // test---------
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