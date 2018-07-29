import React from 'react'
import './TitleBar.css'
import backIcon from '../../asset/baseline_keyboard_backspace_black_48dp.png'

export default class TitleBar extends React.Component {
  constructor(props) {
    super(props)
  }

  handleBackClick() {
    console.log('back------')
  }

  render() {
  	return (
  		<div className='title_bar'>
  		  {this.props.title || 'Title Bar'}
  		  <img className='back_btn' src={backIcon} onClick={() => this.handleBackClick()}/>
  		</div>)
  }
}