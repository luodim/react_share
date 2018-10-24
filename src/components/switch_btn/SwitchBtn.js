import React from 'react'
import './SwitchBtn.css'
import { observer,inject } from 'mobx-react'
import Utils from '../../helper/Utils.js'

const SwitchBtn = inject('store')(observer(class SwitchBtn extends React.Component {
  constructor(props) {
    super(props)
    this.homeStore = this.props.store.homeStore
  }

  getClassName() {
    return this.homeStore.displayType === 'double' ? 'display_icon_single' : 'display_icon_double'
  }

  handleClick() {
    let newType = this.homeStore.displayType === 'double' ? 'single' : 'double'
    this.homeStore.changeDisplayType(newType)
    Utils.saveDisplayType(newType)
  }

  render() {
  	return (
      <div className='switch_btn'>
        <img hidden={!this.homeStore.showDisplayTypeIcon} className={this.getClassName()}
        onClick={() => this.handleClick()} alt='switch_btn'/>
      </div>)
  }
}))

export default SwitchBtn