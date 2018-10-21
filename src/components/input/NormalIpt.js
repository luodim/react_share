import React from 'react'
import { observer,inject } from 'mobx-react'
import closeIcon from '../../asset/baseline_close_black_48dp.png'
import './NormalIpt.css'

const NormalIpt = inject('store')(observer(class NormalIpt extends React.Component {
  constructor(props) {
    super(props)
    this.commonStore = this.props.store.commonStore
    this.loginStore = this.props.store.loginStore
  }

  handleIptChange(e) {
    this.commonStore.handleInputContent(e.target.value)
    this.loginStore.setIpt(e.target.value)
  }

  handleClear() {
    this.commonStore.clearInput()
    this.loginStore.setIpt('')
  }

  getClassName() {
    return this.commonStore.inputText && this.commonStore.inputText !== '' ? 'normal_ipt_close_icon close_icon_show' : 'normal_ipt_close_icon close_icon_hidden'
  }

  render() {
  	return (
  		<div className='normal_ipt_rect'>
          <input className='normal_ipt' type='text' name='userId' onChange={(e) => this.handleIptChange(e)} placeholder={this.props.tips} value={this.commonStore.inputText}/>
          <img src={closeIcon} alt='clear' className={this.getClassName()} onClick={() => this.handleClear()}/>
        </div>)
  }
}))

export default NormalIpt