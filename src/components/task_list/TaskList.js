import React from 'react'
import TaskItem from './TaskItem.js'
import ReactDOM from 'react-dom'
import { withRouter } from "react-router-dom"
import Utils from '../../helper/Utils.js'
import HttpEventHelper from '../../http/HttpEventHelper.js'
import './TaskList.css'

class TaskList extends React.Component {

  constructor(props) {
    super(props)
    window.onscroll = () => this.handleScroll()
    this.state = {data:[], checkedList: [], unCheckedList: [], isUploading: false}
    this.helper = new HttpEventHelper()
    this.isComponentMounted = false
    Utils.copyCtrl(window, false)
  }

  handleScroll() {
    if (this.doom) {
      let offsetY = this.doom.getBoundingClientRect().top
      this.props.scrollCtrl(offsetY)
    }
  }

  dataReq() {
    console.log(`req start-----`)
    let event = Utils.buildEvents()
    let eventName = 'reqTaskDataCB'
    event.on(eventName, (result) => {
      this.props.reqState()
      if (result.status === '200') {
        this.setState({data: result.data})
        this.sortData()
        this.setState()
      } else if (result.status === '300') {
        this.props.history.push({pathname: '/login'})
      }
      console.log('req finished')
    })
    this.helper.getTaskData(this.props.userId, event, eventName)
  }

  componentDidMount() {
    this.doom = ReactDOM.findDOMNode(this)
    this.props.mountState()
    this.isComponentMounted = true
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.needReq !== this.props.needReq && prevProps.isLoading !== this.props.needReq) {
      if (this.props.needReq && this.props.isLoading) { // 请求标记为true，开始请求
        this.dataReq()
      }
    }
  }

  getClassName() {
    return this.props.isLoading ? 'task_list_outer task_list_hidden' : 'task_list_outer task_list_show'
  }

  // 处理check状态改变
  handleCheckChange(newState, index) {
    let item
    if (newState) {
      item = this.unCheckedArray[index]
      this.unCheckedArray.splice(index, 1)
      this.checkedArray.push(item)
    } else {
      item = this.checkedArray[index]
      this.checkedArray.splice(index, 1)
      this.unCheckedArray.push(item)
    }
    this.updateToServer('check', item, newState)
  }

  // 处理删除状态改变
  handleDelChange(curState, index) {
    let item
    if (curState) {
      item = this.checkedArray[index]
      this.checkedArray.splice(index, 1)
    } else {
      item = this.unCheckedArray[index]
      this.unCheckedArray.splice(index, 1)
    }
    this.updateToServer('del', item)
  }

  // 将任务列表改变更新到服务器
  updateToServer(action, item, state) {
    this.setState({checkedList: this.checkedArray, unCheckedList: this.unCheckedArray})
    // 模拟更新数据到服务器
    let event = Utils.buildEvents()
    let eventName = 'updateTaskDataCB'
    event.on(eventName, (result) => {
      if (result.status === '200') {
        console.log(`state is ${result.state}`)
      } else if (result.status === '300') {
        this.props.history.push({pathname: '/login'})
      }
    })
    if (action === 'check' && item) {
      this.helper.updateTaskState(this.props.userId, item.union_id, state, event, eventName)
    } else if (action === 'del' && item) {
      this.helper.addDelTaskState(false, this.props.userId, item.union_id, event, eventName)
    }
  }

  // 将获取的数据分类
  sortData() {
    this.checkedArray = []
    this.unCheckedArray = []
    if (this.state.data) {
      this.state.data.map((obj, index) => {
        if (obj.is_checked === 1) {
          this.checkedArray.push(obj)
        } else {
          this.unCheckedArray.push(obj)
        }
      })
    }
    this.setState({checkedList: this.checkedArray, unCheckedList: this.unCheckedArray})
  }

  render() {
  	const uncheckedEl = this.state.unCheckedList.map((obj, index) => {
  	  return (<TaskItem data={obj} key={index} mark={index} isChecked={false}
        checkChange={(newState, i) => this.handleCheckChange(newState, i)} deleteChange={(curState, i) => this.handleDelChange(curState, i)}/>)
  	})

    const checkedEl = this.state.checkedList.map((obj, index) => {
      return (<TaskItem data={obj} key={index} mark={index} isChecked={true}
        checkChange={(newState, i) => this.handleCheckChange(newState, i)} deleteChange={(curState, i) => this.handleDelChange(curState, i)}/>)
    })
  	return (
      <div className={this.getClassName()}>
        {uncheckedEl}
        {checkedEl}
      </div>)
  }
}

export default withRouter(TaskList)