import React from 'react'
import Logo from '../../asset/share_logo.png'
import './Splash.css'
import {withRouter} from 'react-router-dom'
import Utils from '../../helper/Utils.js'

class Splash extends React.Component {
  constructor(props) {
    super(props)
  }

  checkCookie() {
    let result = Utils.getUserId()
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
  		</div>)
  }
}

export default withRouter(Splash)