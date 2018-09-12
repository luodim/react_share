import React from 'react'
import './navigation-bar.css'
import logo from '../../asset/share_logo.png'
import Indicator from '../indicate/indicate.js'
import SwitchBtn from '../switch_btn/SwitchBtn.js'
import { Link } from 'react-router-dom'

export default class NavigationBar extends React.Component {
  constructor(props) {
    super(props)
    this.preOffsetY = 0
    this.preClassName = 'nav nav_show'
    this.indicateList = ['Home', 'Task']
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
  		  <div className='nav_top'><Link to='/account'><img className='logo' src={logo}/></Link></div>
  		  <div className='nav_bottom'><Indicator list={this.indicateList} switch={this.props.switch}/><SwitchBtn isShow={this.props.isShow}/></div>
  		</div>)
  }
}