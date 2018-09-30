import React from 'react'
import './AccountInfoItem.css'
import refresh from '../../asset/baseline_cached_black_48dp.png'

export default class AccountInfoItem extends React.Component {
  constructor(props) {
    super(props)
  }

  handleClick() {
    console.log('click------')
  }

  getClassName() {
    return this.props.iconShow ? 'refresh_icon icon_show' : 'refresh_icon icon_hidden'
  }

  render() {
    return (
    	<div className='item_outer'>
        <p className='info_title'>{this.props.title}</p>
    	  <p className='info_content'>{this.props.data}</p>
        <img className={this.getClassName()} src={refresh} onClick={() => this.handleClick()}/>
    	</div>)
  }
}