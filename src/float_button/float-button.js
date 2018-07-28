import React from 'react'
import ReactDOM from 'react-dom'
import icon from '../asset/border-color.png'
import InfoEdit from '../info_edit/InfoEdit.js'
import './float-button.css'

export default class FloatButton extends React.Component {

  handleClick() {
    console.log('float button is click')
    const ex = (<div><InfoEdit/></div>)
    ReactDOM.render(ex, document.getElementById('root'))
  }

  shouldComponentUpdate(newProps, newState) {
    return Object.keys(newProps).length > 0
  }

  render() {
  	return (<div className='float_btn' onClick={() => this.handleClick()}><img className='float_icon' src={icon}/></div>)
  }
}