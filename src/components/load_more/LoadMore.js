import React from 'react'
import Refresh from '../../asset/baseline_refresh_black_48dp.png'
import './LoadMore.css'

export default class LoadMore extends React.Component {
  constructor(props) {
    super(props)
    this.state = {tipsText: 'loading...'}
  }

  getClassName() {
  	//todo
  }

  getTipsText() {
  	
  }

  render() {
  	return (
  		<div className='load_more_outer'>
  		  {this.state.tipsText}
  		  <img className='bottom_loading' src={Refresh}/>
  		</div>)
  }
}