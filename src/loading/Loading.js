import React from 'react'
import './Loading.css'
import Refresh from '../asset/baseline_refresh_black_48dp.png'

export default class Loading extends React.Component {
  constructor(props) {
    super(props)
    console.log(this.props.isLoading)
    // this.state = {isLoading: false}
  }

  // shouldComponentUpdate(nextProps, nextState) {
  // 	console.log('should update')
  // 	return true
  // }

  render() {
  	return (<img className='loading' src={this.props.loadingImg || Refresh}/>)
  }
}