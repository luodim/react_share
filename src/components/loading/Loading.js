import React from 'react'
import './Loading.css'
import Refresh from '../../asset/baseline_refresh_black_48dp.png'

export default class Loading extends React.Component {
  constructor(props) {
    super(props)
  }

  getClassName() {
    return this.props.isLoading ? 'loading loading_show' : 'loading loading_hidden'
  }

  render() {
  	return (<img className={this.getClassName()} src={this.props.loadingImg || Refresh}/>)
  }
}