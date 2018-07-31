import React from 'react'
import Logo from '../asset/share_logo.png'
import './Splash.css'
import {withRouter} from 'react-router-dom'

class Splash extends React.Component {
  constructor(props) {
    super(props)
  }

  checkCookie() {
  	if (document.cookie.length > 0) {
	  let startIndex = document.cookie.indexOf('userId')
	  let endIndex
	  let result
	  let pathName
	  if (startIndex !== -1) {
	    endIndex = document.cookie.indexOf(';', startIndex)
	    endIndex = endIndex === -1 ? document.cookie.length : endIndex
	    result = document.cookie.substring(startIndex, endIndex)
	    pathName = '/home'
	  } else {
	  	pathName = '/login'
	  }
	  this.timer = setTimeout(() => {
        this.props.history.push({pathname: pathName, state: { userId: result}})
      }, 1500)
	  console.log(`startIndex is ${startIndex}, endIndex is ${endIndex}, result is ${result}, path name is ${pathName}`)
    console.log(`cookie is ${document.cookie}`)
  	}
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