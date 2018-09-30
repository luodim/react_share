import React from 'react'
import './navigation-bar.css'
import logo from '../../asset/share_logo.png'
import Indicator from '../indicator/Indicator.js'
import SwitchBtn from '../switch_btn/SwitchBtn.js'

export default class NavigationBar extends React.Component {
  constructor(props) {
    super(props)
    this.preOffsetY = 0
    this.preClassName = 'nav nav_show'
    this.indicateList = ['Home', 'Task', 'Account']
  }

  getClassName(value) {
    let result = this.preClassName
    if (Math.abs(value - this.preOffsetY) > 10) {
      result = value - this.preOffsetY > 0 ? 'nav nav_show' : 'nav nav_hide'
      this.preClassName = result
    }
    this.preOffsetY = value
    return result
  }

  render() {
  	return (
  		<div className={this.getClassName(this.props.scrollValue)}>
  		  <div className='nav_top'>
        <img className='logo' src={logo}/>
        </div>
  		  <div className='nav_bottom'>
          <Indicator list={this.indicateList}/><SwitchBtn isShow={this.props.isShow}/>
        </div>
  		</div>)
  }
}