import React from 'react'
import './navigation-bar.css'
import logo from '../../asset/share_logo.png'
import Indicator from '../indicator/Indicator.js'
import SwitchBtn from '../switch_btn/SwitchBtn.js'
import { observer,inject } from 'mobx-react'

const NavigationBar = inject('store')(observer(class NavigationBar extends React.Component {
  constructor(props) {
    super(props)
    this.homeStore = this.props.store.homeStore
    this.preOffsetY = 0
    this.preClassName = 'nav nav_show'
    this.indicateList = ['首页', '喜欢', '账户']
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
  		<div className={this.getClassName(this.homeStore.scrollY)}>
  		  <div className='nav_top'>
        <img className='logo' src={logo} alt='logo'/>
        </div>
  		  <div className='nav_bottom'>
          <Indicator list={this.indicateList}/>
          <SwitchBtn />
        </div>
  		</div>)
  }
}))

export default NavigationBar