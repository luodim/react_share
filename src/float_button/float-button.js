import React from 'react'
import ReactDOM from 'react-dom'
import icon from '../asset/border-color.png'
import InfoEdit from '../info_edit/InfoEdit.js'
import './float-button.css'
import RouterHelper from '../helper/router/RouterHelper.js'

export default class FloatButton extends React.Component {

  handleClick(e) {
    RouterHelper.getInstance().routeTo('edit')
    e.stopPropagation()
  }

  shouldComponentUpdate(newProps, newState) {
    return Object.keys(newProps).length > 0
  }

  render() {
  	return (<div className='float_btn' onClick={(e) => this.handleClick(e)}><img className='float_icon' src={icon}/></div>)
  }
}