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
    this.TabHome = () => (
        <Masonry isLoading={this.state.isLoading} needReq={this.state.needReq}
        scrollCtrl={(value) => this.scrollCtrl(value)} reqState={() => this.handleReqComplete()}
        userId={this.state.userId} mountState={() => this.handleChildMounted()}/>
      )
    this.TabTask = () => (
        <TaskList isLoading={this.state.isLoading} needReq={this.state.needReq}
        scrollCtrl={(value) => this.scrollCtrl(value)} data={this.state.listData}
        reqState={() => this.handleReqComplete()} userId={this.state.userId}
        mountState={() => this.handleChildMounted()}
        />
      )
  }

  handleReqComplete() {
    this.setState({needReq: false, isLoading:false})
    console.log(`request is finished----`)
  }

  requestData(index) {
    this.setState({needReq: true, isLoading:true, pageIndex:index})
  }

  scrollCtrl(value) {
    this.setState({scrollV: value})
  }

  handleChildMounted() {
    this.requestData(this.curPageIndex)
  }

  componentDidMount() {
    this.getUserId()
  }

  render() {
    return (
    	<div className='home'>
    	  <NavigationBar scrollValue={this.state.scrollV} switch={(index) => this.switchPage(index)} isShow={this.state.isShow} />
    	  <div className='page_container'>
          <Switch>
            <Route path='/home/home' component={this.TabHome}/>
            <Route path='/home/task' component={this.TabTask}/>
          </Switch>
          <Loading isLoading={this.state.isLoading}/>
        </div>
    	  <FloatButton/>
    	</div>)
  }
}