import React from 'react'
import TargetList from '../../components/target_list/TargetList.js'
import FloatButton from '../../components/float_button/float-button.js'
import NavigationBar from '../../components/navigation_bar/navigation-bar.js'
import TaskList from '../../components/task_list/TaskList.js'
import Account from './account/Account.js'
import Loading from '../../components/loading/Loading.js'
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom"
import Utils from '../../helper/Utils.js'
import './home.css'

export default class Home extends React.Component {
  constructor(props) {
    super(props)
    this.curPageIndex = this.props.pageIndex || 0
    this.data = []
    this.state = {
      scrollV: 0,
      isShow: true,
      needReq:false,
      pageIndex: this.curPageIndex,
      isLoading: false,
      userId: '',
      isInitReq:true,
      displayType: Utils.getDisplayType()
    }
    this.initTab()
    this.setScrollListener()
  }

  setScrollListener() {
    // 在刷新本页面当前页面时清除滚动位置记录
    window.onbeforeunload = () => {
      if (this.isComponentMounted) {
        // 处理页面刷新
        Utils.handlePageRefresh('home')
      }
    }
  }

  getUserId() {
    let data = this.props.location.state
    if (data && data.userId && data.userId !== '') {
      this.setState({userId: data.userId})
    } else {
      if (Utils.getUserId() && Utils.getUserId() !== '') {
        this.setState({userId: Utils.getUserId()})
      } else {
        this.props.history.push({pathname: '/login'})
      }
    }
  }

  // 初始化组件
  initTab() {
    this.tabTask = () => (
        <TaskList isLoading={this.state.isLoading} needReq={this.state.needReq}
        scrollCtrl={(value) => this.scrollCtrl(value)} reqState={(pageId) => this.handleReqComplete(pageId)}
        userId={this.state.userId} mountState={(id) => this.handleChildMounted(id)}
        />
      )
    this.tabAccount = () => (
        <Account isLoading={this.state.isLoading} needReq={this.state.needReq}
        scrollCtrl={(value) => this.scrollCtrl(value)} reqState={(pageId) => this.handleReqComplete(pageId)}
        userId={this.state.userId} mountState={(id) => this.handleChildMounted(id)}
        />)
    this.tabTarget = () => (
        <TargetList isLoading={this.state.isLoading} needReq={this.state.needReq}
        scrollCtrl={(value) => this.scrollCtrl(value)} reqState={(pageId) => this.handleReqComplete(pageId)}
        userId={this.state.userId} mountState={(id) => this.handleChildMounted(id)}
        displayType={this.state.displayType}/>)
  }

  handleReqComplete(pageId) {
    if (this.isComponentMounted) this.setState({needReq: false, isLoading:false})
    // 页面被重新加载后的首次请求需要恢复位置
    if (this.state.isInitReq) Utils.handleRestoreState(window, pageId, this.props.history.action)
    this.setState({isInitReq:false})
  }

  requestData(index) {
    this.setState({needReq: true, isLoading:true, pageIndex:index})
  }

  scrollCtrl(value) {
    if (this.isComponentMounted) this.setState({scrollV: value})
  }

  handleChildMounted(id) {
    Utils.handlePageRoute('home', this.props.history.action)
    this.requestData(this.curPageIndex)
    this.setState({isInitReq:true})
    this.setState({isShow: id === 'target'})
    console.log('home page children is mounted')
  }

  handleDisplayTypeChange(type) {
    this.setState({displayType:type})
    Utils.saveDisplayType(type)
  }

  componentDidMount() {
    this.getUserId()
    this.isComponentMounted = true
  }

  componentWillUnmount() {
    this.isComponentMounted = false
  }

  render() {
    return (
    	<div className='home'>
    	  <NavigationBar scrollValue={this.state.scrollV} isShow={this.state.isShow}
        displayType={this.state.displayType}
        displayTypeChange={(type) => this.handleDisplayTypeChange(type)}/>
    	  <div className='page_container'>
          <Switch>
            <Route path='/home/home' component={this.tabTarget}/>
            <Route path='/home/task' component={this.tabTask}/>
            <Route path='/home/account' component={this.tabAccount}/>
          </Switch>
          <Loading isLoading={this.state.isLoading}/>
        </div>
    	  <FloatButton/>
    	</div>)
  }
}