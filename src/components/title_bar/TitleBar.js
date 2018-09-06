import React from 'react'
import './TitleBar.css'
import backIcon from '../../asset/baseline_keyboard_backspace_black_48dp.png'
import {withRouter} from 'react-router-dom'

class TitleBar extends React.Component {
  constructor(props) {
    super(props)
  }

  handleBackClick() {
    this.props.history.goBack()
  }

  render() {
  	return (
  		<div className='title_bar'>
  		  {this.props.title || 'Title Bar'}
  		  <img className='back_btn' src={backIcon} onClick={() => this.handleBackClick()}/>
  		</div>)
  }
}

export default withRouter(TitleBar)