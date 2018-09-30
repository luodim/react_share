import React from 'react'
import ReactDOM from 'react-dom'
import { withRouter } from 'react-router-dom'
import CardA from '../cards/img_card_a/CardA.js'
import TextCard from '../cards/text_card/TextCard.js'
import LoadMore from '../load_more/LoadMore.js'
import Utils from '../../helper/Utils.js'
import HttpEventHelper from '../../http/HttpEventHelper.js'
import './TargetList.css'

export default class TargetList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {data: [], sinceId:-1}
    this.isComponentMounted = false
    window.onscroll = () => this.handleScroll()
    this.helper = new HttpEventHelper()
    Utils.copyCtrl(window, false)
  }

  // 处理滚动数据
  handleScroll() {
    if (this.doom) {
      this.offsetY = this.doom.getBoundingClientRect().top
      this.props.scrollCtrl(this.offsetY)
    }
    let isInBottom = Utils.isInBottom(document)
    if (isInBottom && this.isComponentMounted) {
      this.dataReq()
    }
  }

  // 处理like状态变化
  handleTaskStateChange(state, unionId) {
    let event = Utils.buildEvents()
    let eventName = 'updateTaskCB'
    event.on(eventName, (result) => {
      console.log(result)
    })
    this.helper.addDelTaskState(state, this.props.userId, unionId, event, eventName)
  }

  // 进行数据请求
  dataReq() {
  	if (this.state.sinceId === -2) return
    let event = Utils.buildEvents()
    let eventName = 'reqHomeDataCB'
    event.on(eventName, (result) => {
      this.props.reqState('target')
      if (result.status === '200') {
      	if (result.data && result.data.length > 0) {
          this.setState({data: this.state.data.concat(result.data)})
          let cursorId = result.data[result.data.length - 1].cursor_id
          this.setState({sinceId: cursorId})
      	}
      } else if (result.status === '300') {
        this.props.history.push({pathname: '/login'})
      }
    })
    this.helper.getHomeData(this.props.userId, event, eventName, this.state.sinceId)
    this.event = event
    this.eventName = eventName
  }

  componentDidMount() {
    this.doom = ReactDOM.findDOMNode(this)
    this.props.mountState()
    this.isComponentMounted = true
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.needReq !== this.props.needReq && prevProps.isLoading !== this.props.isLoading) {
      if (this.props.needReq && this.props.isLoading) { // 请求标记为true，开始请求
        this.dataReq()
      }
    }
  }

  componentWillUnmount() {
    Utils.saveState(window, 'target', this.offsetY)
    this.setState({data:[]})
    this.isComponentMounted = false
    this.event.removeListener(this.eventName, () => {console.log('remove listener')});
  }

  getCard(data, index) {
    return data.img_res_small || data.img_res_small !== '' ?
    <CardA key={index} data={data} taskStateChange={(state, unionId) => this.handleTaskStateChange(state, unionId)}/>
    : <TextCard key={index} data={data} taskStateChange={(state, unionId) => this.handleTaskStateChange(state, unionId)}/>
  }

  render() {
  	let el = this.state.data.map((data, index) => {return this.getCard(data, index)})
  	return (
  		<div className='target_list_outer'>
  		  <img className='slide_show'/>
  		  {el}
  		  <LoadMore/>
  		</div>)
  }
}