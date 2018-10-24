import React from 'react'
import Refresh from '../../asset/baseline_refresh_black_48dp.png'
import { observer,inject } from 'mobx-react'
import './LoadMore.css'

const LoadMore = inject('store')(observer(class LoadMore extends React.Component {
  constructor(props) {
    super(props)
    this.homeStore = this.props.store.homeStore
  }

  getClassName() {
  	return this.homeStore.hasData ? 'bottom_loading bottom_loading_show' : 'bottom_loading bottom_loading_hidden'
  }

  getTipsText() {
    return this.homeStore.hasData ? 'loading...' : '没有更多了'
  }

  render() {
  	return (
  		<div className='load_more_outer'>
  		  {this.getTipsText()}
  		  <img className={this.getClassName()} src={Refresh}/>
  		</div>)
  }
}))

export default LoadMore