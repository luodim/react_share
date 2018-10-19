import React from 'react'
import { observer,inject } from 'mobx-react'
import './Toast.css'

const Toast = inject('store')(observer(class Toast extends React.Component {

  isInShowState = false

  constructor(props) {
    super(props)
    this.commonStore = this.props.store.commonStore
  }

  getClassName() {
  	return this.commonStore.showToast ? 'toast_outer toast_show' : 'toast_outer toast_hidden'
  }

  handleShowTime() {
  	if (this.isInShowState) return
  	let flag = this.commonStore.showToast
  	if (flag) {
  	  this.isInShowState = true
  	  this.timer = setTimeout(() => {
  	  	this.commonStore.hiddenToast()
  	  	this.isInShowState = false
  	  }, 2000)
  	}
  }

  componentWillUnmount() {
    clearTimeout(this.timer)
  }

  render() {
  	this.handleShowTime()
  	return (
  		<div className={this.getClassName()}>
  		  <div className='toast'>
  		    {this.commonStore.toastText}
  		  </div>
  		</div>)
  }
}))

export default Toast