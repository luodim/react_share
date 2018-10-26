import React from 'react'
import TaskItem from './TaskItem.js'
import ReactDOM from 'react-dom'
import { withRouter } from "react-router-dom"
import Utils from '../../helper/Utils.js'
import { dataManager, TYPE_HTTP, TYPE_SESSION } from '../../data/DataManager.js'
import { TASK_DEL_REQ, TASK_REQ, TASK_UPDATE_REQ } from '../../data/data_impl/HttpData.js'
import { observer,inject } from 'mobx-react'
import './TaskList.css'

const TaskList = inject('store')(observer(class TaskList extends React.Component {
  constructor(props) {
    super(props)
    this.homeStore = this.props.store.homeStore
    this.commonStore = this.props.store.commonStore
    window.onscroll = () => this.handleScroll()
    this.state = {checkedList: [], uncheckedList: []}
    Utils.copyCtrl(window, false)
  }

  handleScroll() {
    if (this.doom) {
      let offsetY = this.doom.getBoundingClientRect().top
      this.homeStore.updateScrollY(offsetY)
    }
  }

  async dataReq() {
    this.commonStore.showLoading(true)
    let result = await dataManager.reqData(TASK_REQ, TYPE_HTTP, {user_id:this.homeStore.userId})
    this.commonStore.showLoading(false)
    if (result && result.status === '200') {
      this.sortData(result.data)
    } else if (result.status === '300') {
      this.props.history.push({pathname: '/login'})
    }
  }

  async updateListState(isUpdateCheckState, item, checkState = false) {
    let result
    if (isUpdateCheckState) {
      result = await dataManager.reqData(TASK_UPDATE_REQ, TYPE_HTTP, {user_id:this.homeStore.userId, union_id: item.union_id, check_state: checkState})
    } else {
      result = await dataManager.reqData(TASK_DEL_REQ, TYPE_HTTP, {user_id: this.homeStore.userId, union_id: item.union_id})
    }
    if (result && result.status === '200') {
      console.log('success update')
    } else if (result && result.status === '300') {
      this.props.history.push({pathname: '/login'})
    }
  }

  sortData(datalist) {
    if (datalist && datalist.length > 0) {
      let uncheckedList = datalist.filter(data => data.is_checked === 0)
      let checkedList = datalist.filter(data => data.is_checked === 1)
      this.setState({checkedList: checkedList, uncheckedList: uncheckedList})
    }
  }

  handleDelChange(state, isChecked) {
    let index = this.homeStore.curLikeListItemIndex
    let item
    if (isChecked) {
      item = this.state.checkedList.splice(index, 1)[0]
      this.setState({checkedList: this.state.checkedList})
    } else {
      item = this.state.uncheckedList.splice(index, 1)[0]
      this.setState({uncheckedList: this.state.uncheckedList})
    }
    this.updateListState(false, item)
  }

  handleCheckStateChange(state) {
    let index = this.homeStore.curLikeListItemIndex
    let item
    if (state) { // 此处由于state在item里先刷新了，所以实际操作checked及unchecked数组时与此state相反
      item = this.state.uncheckedList.splice(index, 1)[0]
      this.state.checkedList.push(item)
    } else {
      item = this.state.checkedList.splice(index, 1)[0]
      this.state.uncheckedList.push(item)
    }
    this.setState({checkedList: this.state.checkedList, uncheckedList: this.state.uncheckedList})
    this.updateListState(true, item, state)
  }

  componentDidMount() {
    this.doom = ReactDOM.findDOMNode(this)
    // 通知父容器装载完毕，让父容器统一处理恢复及缓存清理动作
    this.homeStore.updateChildrenMountedState(true, 'task')
    // 开始请求
    this.dataReq()
    // 设置isLike状态改变的响应函数及check状态变化响应函数
    this.homeStore.setHandleLikeStateChange((state, isChecked) => this.handleDelChange(state, isChecked))
    this.homeStore.setCheckStateChangeCB((state) => this.handleCheckStateChange(state))
  }

  componentWillUnmount() {
    // 保存当前页面滚动位置
    dataManager.setData(this.homeStore.scrollY, 'homePagePosition', TYPE_SESSION)
    // 通知父容器装载完毕，让父容器统一处理恢复及缓存清理动作
    this.homeStore.updateChildrenMountedState(false, 'task')
  }

  getClassName() {
    return this.props.isLoading ? 'task_list_outer task_list_hidden' : 'task_list_outer task_list_show'
  }

  render() {
  	let uncheckedEl = this.state.uncheckedList.map((obj, index) =>
  	  (<TaskItem data={obj} key={index} mark={index} isChecked={false}/>)
  	)
    let checkedEl = this.state.checkedList.map((obj, index) =>
      (<TaskItem data={obj} key={index} mark={index} isChecked={true}/>)
    )
  	return (
      <div className={this.getClassName()}>
        {uncheckedEl}
        {checkedEl}
      </div>)
  }
}))

export default withRouter(TaskList)