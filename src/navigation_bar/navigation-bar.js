import React from 'react'
import ReactDOM from 'react-dom'
import './navigation-bar.css'
import {tween, easing} from 'popmotion'
import logo from '../asset/share_logo.png'
import Indicator from '../indicate/indicate.js'

export default class NavigationBar extends React.Component {
  constructor(props) {
    super(props)
    this.props = props
    this.myRef = React.createRef()
    this.preOffsetY = 0
    this.showHideCtrl(this.props.scrollValue)
    this.indicateList = ['Home', 'Task']
    console.log('nav is build')
  }

  showHideCtrl(value) {
    if (Math.abs(value - this.preOffsetY) > 10) {
      if (value - this.preOffsetY > 0) {
        this.myRef.current.className = 'nav nav_show'
      } else {
        this.myRef.current.className = 'nav nav_hide'
      }
    }
    this.preOffsetY = value
  }

  componentDidUpdate() {
    this.showHideCtrl(this.props.scrollValue)
  }

  render() {
  	return (
  		<div className='nav nav_show' ref={this.myRef}>
  		  <div className='nav_top'><img className='logo' src={logo}/></div>
  		  <div className='nav_bottom'><Indicator className='indicate-outer' list={this.indicateList}/></div>
  		</div>)
  }
}