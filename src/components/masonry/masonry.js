import React from 'react'
import ReactDOM from 'react-dom'
import { withRouter } from "react-router-dom"
import CardView from '../cards/card-view.js'
import Utils from '../../helper/Utils.js'
import HttpEventHelper from '../../http/HttpEventHelper.js'
import './masonry.css'

class Masonry extends React.Component {
  constructor(props) {
    super(props)
    this.state = {data: []}
    window.onscroll = () => this.handleScroll()
    this.helper = new HttpEventHelper()
  }

  handleScroll() {
    if (this.doom) {
      let offsetY = this.doom.getBoundingClientRect().top
      this.props.scrollCtrl(offsetY)
    }
  }

  handleTaskStateChange(state, unionId) {
    this.updateTaskState(state, unionId)
    console.log(`current state is ${state}, current union id is ${unionId}`)
  }

  updateTaskState(state, unionId) {
    let event = Utils.buildEvents()
    let eventName = 'updateTaskCB'
    event.on(eventName, (result) => {
      console.log(result)
    })
    this.helper.addDelTaskState(state, this.props.userId, unionId, event, eventName)
  }

  dataReq() {
    console.log(`home start request---`)
    let event = Utils.buildEvents()
    let eventName = 'reqHomeDataCB'
    event.on(eventName, (result) => {
      this.props.reqState()
      if (result.status === '200') {
        this.setState({data: result.data})
      } else if (result.status === '300') {
        this.props.history.push({pathname: '/login'})
      }
    })
    this.helper.getHomeData(0, 10, this.props.userId, event, eventName)
  }

  componentDidMount() {
    this.doom = ReactDOM.findDOMNode(this)
    this.props.mountState()
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.needReq !== this.props.needReq && prevProps.isLoading !== this.props.isLoading) {
      if (this.props.needReq && this.props.isLoading) { // 请求标记为true，开始请求
        this.dataReq()
      }
    }
  }

  getClassName() {
    return this.props.isLoading ? 'masonry masonry_hidden' : 'masonry masonry_show'
  }

  render() {
    this.el = this.state.data.map((data, index) => {
      return (
        <div className='outer' key={index}>
          <CardView data={data} taskStateChange={(state, unionId) => this.handleTaskStateChange(state, unionId)}/>
        </div>)
    })
    return (
      <div className={this.getClassName()}>{this.el}</div>
    )
  }
}

export default withRouter(Masonry)