import React from 'react'
import TargetList from '../../components/target_list/TargetList.js'
import FloatButton from '../../components/float_button/float-button.js'
import NavigationBar from '../../components/navigation_bar/navigation-bar.js'
import TaskList from '../../components/task_list/TaskList.js'
import Account from './account/Account.js'
import Loading from '../../components/loading/Loading.js'
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom"
import { observer,inject } from 'mobx-react'
import { dataManager, TYPE_COOKIE, TYPE_SESSION } from '../../data/DataManager.js'
import Utils from '../../helper/Utils.js'
import './home.css'

const Home = inject('store')(observer(class Home extends React.Component {
  constructor(props) {
    super(props)
    this.homeStore = this.props.store.homeStore
    // 初始化单双列显示状态
    this.homeStore.changeDisplayType(Utils.getDisplayType())
    // 初始化获取userId
    let userId = dataManager.reqData('userId', TYPE_COOKIE)
    this.homeStore.setUserId(userId)
    // 注入子组件装载状态变化回调函数
    this.homeStore.setHandleChildrenMountedChange((id) => this.handleChildMounted(id))
    this.setScrollListener()
  }

  setScrollListener() {
    // 在刷新本页面当前页面时清除滚动位置记录
    window.onbeforeunload = () => {
      // 页面发生刷新动作，强制清除相关缓存数据
      Utils.cacheClearControl(this.curChildId, this.props.history.action, true)
    }
  }

  handleChildMounted(id) {
    this.curChildId = id
    // 设置单双列切换功能图标是否显示
    this.homeStore.setDisplayTypeIconState(id === 'target')
    // 执行是否需要清除缓存数据操作
    Utils.cacheClearControl(id, this.props.history.action)
    // 获取滚动位置，由于恢复滚动由react-reouter实现，滚动位置主要是为了在执行页面刷新动作时强制页面滚动到（0,0）位置
    let pos = dataManager.reqData('homePagePosition', TYPE_SESSION)
    // 位置缓存数据被清空，强制滚动到顶部
    if (!pos) this.timer = setTimeout(() => {window.scrollTo({top:0, behavior:'instant'})}, 400)
  }

  componentWillUnmount() {
    clearTimeout(this.timer)
  }

  render() {
    return (
    	<div className='home'>
    	  <NavigationBar />
    	  <div className='page_container'>
          <Switch>
            <Route path='/home/home' component={TargetList}/>
            <Route path='/home/task' component={TaskList}/>
            <Route path='/home/account' component={Account}/>
          </Switch>
          <Loading isLoading />
        </div>
    	  <FloatButton/>
    	</div>)
  }
}))

export default Home