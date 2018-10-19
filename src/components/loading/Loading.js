import React from 'react'
import { observer,inject } from 'mobx-react'
import './Loading.css'
import Refresh from '../../asset/baseline_refresh_black_48dp.png'

const Loading = inject('store')(observer(class Loading extends React.Component {
  constructor(props) {
    super(props)
    this.commonStore = this.props.store.commonStore
  }

  getClassName() {
  	let state = this.commonStore ? this.commonStore.isLoading : this.props.isLoading
    return state ? 'loading loading_show' : 'loading loading_hidden'
  }

  render() {
  	return (<img className={this.getClassName()} src={this.props.loadingImg || Refresh}/>)
  }
}))

export default Loading

