import React from 'react'
import Masonry from '../../components/masonry/masonry.js'
import FloatButton from '../../components/float_button/float-button.js'
import NavigationBar from '../../components/navigation_bar/navigation-bar.js'
import TaskList from '../../components/task_list/TaskList.js'
import Loading from '../../components/loading/Loading.js'
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom"
import Utils from '../../helper/Utils.js'
import './home.css'

export default class Home extends React.Component {
  constructor(props) {
    super(props)
    this.curPageIndex = this.props.pageIndex || 0
    this.data = []
    this.state = {scrollV: 0, isShow: true, needReq:false, pageIndex: this.curPageIndex, isLoading: false, userId: ''}
    this.initTab()
    window.onbeforeunload = () => {
      if (this.isComponentMounted) {
        localStorage.removeItem(`masonry-scrollPos`)
        localStorage.removeItem(`taskList-scrollPos`)
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
    this.tabHome = () => (
        <Masonry isLoading={this.state.isLoading} needReq={this.state.needReq}
        scrollCtrl={(value) => this.scrollCtrl(value)} reqState={(pageId) => this.handleReqComplete(pageId)}
        userId={this.state.userId} mountState={() => this.handleChildMounted()}/>
      )
    this.tabTask = () => (
        <TaskList isLoading={this.state.isLoading} needReq={this.state.needReq}
        scrollCtrl={(value) => this.scrollCtrl(value)} data={this.state.listData}
        reqState={(pageId) => this.handleReqComplete(pageId)} userId={this.state.userId}
        mountState={() => this.handleChildMounted()}
        />
      )
  }

  handleReqComplete(pageId) {
    this.setState({needReq: false, isLoading:false})
    console.log(`request is finished----`)
    Utils.handleRestoreState(window, pageId, this.props.history.action)
  }

  requestData(index) {
    this.setState({needReq: true, isLoading:true, pageIndex:index})
  }

  scrollCtrl(value) {
    if (this.isComponentMounted) this.setState({scrollV: value})
  }

  handleChildMounted() {
    this.requestData(this.curPageIndex)
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
    	  <NavigationBar scrollValue={this.state.scrollV} switch={(index) => this.switchPage(index)} isShow={this.state.isShow} />
    	  <div className='page_container'>
          <Switch>
            <Route path='/home/home' component={this.tabHome}/>
            <Route path='/home/task' component={this.tabTask}/>
          </Switch>
          <Loading isLoading={this.state.isLoading}/>
        </div>
    	  <FloatButton/>
    	</div>)
  }
}