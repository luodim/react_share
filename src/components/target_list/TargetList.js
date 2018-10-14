import React from 'react'
import ReactDOM from 'react-dom'
import { withRouter } from 'react-router-dom'
import CardA from '../cards/img_card_a/CardA.js'
import TextCard from '../cards/text_card/TextCard.js'
import LoadMore from '../load_more/LoadMore.js'
import ReactSwipe from 'react-swipe';
import Utils from '../../helper/Utils.js'
import HttpEventHelper from '../../http/HttpEventHelper.js'
import './TargetList.css'
import SliderAbout from '../../asset/slider_about.png'
import SliderTest from '../../asset/slider_test.png'
import {config} from './SliderBarConfig.js'

export default class TargetList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {data: [], sinceId:-1, hasData:true}
    this.isComponentMounted = false
    this.isRequesting = false // 防止反复滚动到底部进行多次数据加载
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
    // 滑动到底部且当前组件处于mounted状态，且当前状态处于还有数据可获取状态且处于非请求状态中，发起一次新的分页请求
    if (isInBottom && this.isComponentMounted && this.state.hasData && !this.isRequesting) {
      this.dataReq()
    }
  }

  // 处理like状态变化
  handleTaskStateChange(state, unionId, index) {
    let event = Utils.buildEvents()
    let eventName = 'updateTaskCB'
    event.on(eventName, (result) => {
      console.log(result)
    })
    this.helper.addDelTaskState(state, this.props.userId, unionId, event, eventName, index)
  }

  // 进行数据请求
  dataReq() {
  	if (this.state.sinceId === -2) return
    let event = Utils.buildEvents()
    let eventName = 'reqHomeDataCB'
    // 标记置于此处是由于回调可能使用缓存导致回调快于下方网络请求api的调用，导致标记错乱
    this.isRequesting = true
    event.on(eventName, (result) => {
      this.props.reqState('target')
      this.isRequesting = false
      if (result.status === '200') {
      	if (result.data && result.data.length > 0) {
          this.setState({data: this.state.data.concat(result.data)})
          let cursorId = result.data[result.data.length - 1].cursor_id
          this.setState({sinceId: cursorId, hasData: true})
      	} else {
      	  this.setState({hasData: false})
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
    this.props.mountState('target')
    this.isComponentMounted = true
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.needReq !== this.props.needReq
      && prevProps.isLoading !== this.props.isLoading) {
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
    return data.img_res_small !== null || (data.img_res !== null && data.img_res !== 'undefined') ?
    <CardA key={index} data={data} displayType={this.props.displayType} mark={index}
    taskStateChange={(state, unionId) => this.handleTaskStateChange(state, unionId, index)}/>
    : <TextCard key={index} data={data} displayType={this.props.displayType} mark={index}
    taskStateChange={(state, unionId) => this.handleTaskStateChange(state, unionId, index)}/>
  }

  render() {
  	let el = this.state.data.map((data, index) => {return this.getCard(data, index)})
  	return (
  		<div className='target_list_outer'>
  		  <ReactSwipe className='slider_bar' swipeOptions={config}>
  		    <div><a href='http://54.238.237.51/about/AboutShareHub.html'><img src={SliderAbout}/></a></div>
  		    <div><a href='http://54.238.237.51/about/AboutShareHub.html'><img src={SliderTest}/></a></div>
  		  </ReactSwipe>
  		  {el}
  		  <LoadMore hasData={this.state.hasData}/>
  		</div>)
  }
}