import React from 'react'
import Refresh from '../../asset/baseline_refresh_black_48dp.png'
import './LoadMore.css'

export default class LoadMore extends React.Component {
  constructor(props) {
    super(props)
  }

  getClassName() {
  	return this.props.hasData ? 'bottom_loading bottom_loading_show' : 'bottom_loading bottom_loading_hidden'
  }

  getTipsText() {
    return this.props.hasData ? 'loading...' : '没有更多了'
  }

  render() {
  	return (
  		<div className='load_more_outer'>
  		  {this.getTipsText()}
  		  <img className={this.getClassName()} src={Refresh}/>
  		</div>)
  }
}