import React from 'react'
import ReactDOM from 'react-dom'
import { withRouter } from 'react-router-dom'
import CardA from '../cards/img_card_a/CardA.js'
import TextCard from '../cards/text_card/TextCard.js'
import LoadMore from '../load_more/LoadMore.js'
import ReactSwipe from 'react-swipe';
import Utils from '../../helper/Utils.js'
import { dataManager, TYPE_HTTP, TYPE_SESSION } from '../../data/DataManager.js'
import { TASK_ADD_REQ, TASK_DEL_REQ, HOME_REQ } from '../../data/data_impl/HttpData.js'
import SliderAbout from '../../asset/slider_about.png'
import SliderTest from '../../asset/slider_test.png'
import { config } from './SliderBarConfig.js'
import { observer,inject } from 'mobx-react'
import './TargetList.css'

const TargetList = inject('store')(observer(class TargetList extends React.Component {
  constructor(props) {
    super(props)
    this.homeStore = this.props.store.homeStore
    this.commonStore = this.props.store.commonStore
    // datalist不使用store进行存储是因为经过mobx，observable装饰对象会增添多个方法导致变大，不利于传递
    this.state = {datalist: []}
    this.isRequesting = false // 防止反复滚动到底部进行多次数据加载
    window.onscroll = () => this.handleScroll()
    Utils.copyCtrl(window, false)
  }

  // 处理滚动数据
  handleScroll() {
    if (this.doom) {
      let offsetY = this.doom.getBoundingClientRect().top
      this.homeStore.updateScrollY(offsetY)
    }
    let isInBottom = Utils.isInBottom(document)
    // 滑动到底部且当前组件处于mounted状态，且当前状态处于还有数据可获取状态且处于非请求状态中，发起一次新的分页请求
    if (isInBottom && this.commonStore.isComponentMounted && this.homeStore.hasData && !this.isRequesting) {
      this.dataReq()
    }
  }

  // 处理like状态变化
  async handleTaskStateChange(state) {
    let unionId = this.state.datalist[this.homeStore.curSelectedCardIndex].union_id
    let index = this.homeStore.curSelectedCardIndex
    let reqName = state ? TASK_ADD_REQ : TASK_DEL_REQ
    let result = await dataManager.reqData(reqName, TYPE_HTTP, {user_id: this.homeStore.userId, union_id: unionId})
  }

  async dataReq() {
    if (this.homeStore.sinceId === -2) return // 没有数据可请求了（到最底部了）
    this.isRequesting = true
    this.commonStore.showLoading(true)
    let result = await dataManager.reqData(HOME_REQ, TYPE_HTTP, {user_id: this.homeStore.userId, since_id: this.homeStore.sinceId})
    this.commonStore.showLoading(false)
    this.isRequesting = false
    if (result && result.status === '200') {
      if (result.data && result.data.length > 0) {
        this.setState({datalist: this.state.datalist.concat(result.data)})
        let cursorId = result.data[result.data.length - 1].cursor_id
        this.homeStore.setSinceId(cursorId)
        this.homeStore.changeHasDataState(true)
      } else {
        this.homeStore.changeHasDataState(false)
      }
    } else if (result.status === '300') {
      this.props.history.push({pathname: '/login'})
    }
  }

  componentDidMount() {
    this.doom = ReactDOM.findDOMNode(this)
    // 通知父容器装载完毕，让父容器统一处理恢复及缓存清理动作
    this.homeStore.updateChildrenMountedState(true, 'target')
    // 更改组件装载状态
    this.commonStore.changeComponentMountState(true)
    // 开始做数据请求
    this.dataReq()
    // 设置isLike状态改变的响应函数
    this.homeStore.setHandleLikeStateChange((state) => this.handleTaskStateChange(state))
  }

  componentWillUnmount() {
    // 保存当前页面滚动位置
    dataManager.setData(this.homeStore.scrollY, 'homePagePosition', TYPE_SESSION)
    // 恢复分页请求游标到初始位置
    this.homeStore.setSinceId(-1)
    // 更改组件装载状态
    this.commonStore.changeComponentMountState(false)
    // 通知父容器当前处于卸载状态
    this.homeStore.updateChildrenMountedState(false, 'target')
  }

  getCard(data, index) {
    return data.img_res_small !== null || (data.img_res !== null && data.img_res !== 'undefined') ?
    <CardA key={index} data={data} mark={index} /> :
    <TextCard key={index} data={data} mark={index} />
  }

  render() {
  	let el = this.state.datalist.map((data, index) => this.getCard(data, index))
  	return (
  		<div className='target_list_outer'>
  		  <ReactSwipe className='slider_bar' swipeOptions={config}>
  		    <div><a href='http://54.238.237.51/about/AboutShareHub.html'><img src={SliderAbout}/></a></div>
  		    <div><a href='http://54.238.237.51/about/AboutShareHub.html'><img src={SliderTest}/></a></div>
  		  </ReactSwipe>
  		  {el}
  		  <LoadMore />
  		</div>)
  }
}))

export default withRouter(TargetList)