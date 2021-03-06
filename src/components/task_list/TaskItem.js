import React from 'react'
import './TaskItem.css'
import ImgHolder from '../../asset/share_placeholder.png'
import { observer, inject } from 'mobx-react'
import {withRouter} from 'react-router-dom'

const TaskItem = inject('store')(observer(class TaskItem extends React.Component {
  constructor(props) {
    super(props)
    this.state = {isChecked: this.props.isChecked}
    this.homeStore = this.props.store.homeStore
  }

  handleCheckBox(e) {
    this.setState({isChecked: !this.state.isChecked}, () => {
      this.homeStore.setCurLikeItemIndex(this.props.mark)
      this.homeStore.updateCheckStateChange(this.state.isChecked)
      // 这段很重要，由于在item中改变状态后回调到tasklist根据更改状态修改了check及uncheck集合，只是集合变化，组件需要刷新
      this.setState({isChecked: this.props.isChecked})
    })
    e.stopPropagation()
  }

  handleDelete(e) {
    this.homeStore.setCurLikeItemIndex(this.props.mark)
    this.homeStore.changeTaskState(false, this.state.isChecked)
    e.stopPropagation()
  }

  handleContentClick() {
    this.props.history.push({ pathname: '/detail', state: {data: this.props.data}})
  }

  getClassName(type) {
    if (type === 'checkbox') {
      return this.state.isChecked ? `task_item_checked` : `task_item_unchecked`
    } else {
      return this.state.isChecked ? `task_item_outer task_item_outer_checked` : `task_item_outer task_item_outer_unchecked`
    }
  }

  getContent() {
    let content = ''
    let t = this.props.data
    let code = t.code ? t.code : ''
    let name = t.name ? t.name : ''
    content = !code && !name ? '未知' : `${code} ${name}`
    return content
  }

  componentWillUnmount() {
    clearTimeout(this.timer)
  }

  getImgRes() {
    return this.props.data.img_res_small || this.props.data.img_res || ImgHolder
  }

  render() {
    return (
    	<div className={this.getClassName('outer')} onClick={() => this.handleContentClick()}>
    	  <div className='task_item_left_react'></div>
    	  <div className='task_item_click_rect' onClick={(e) => this.handleCheckBox(e)}><img className={this.getClassName('checkbox')}/></div>
        <img className='task_item_img' src={this.getImgRes()} alt=''/>
    	  <p className='task_item_content' >{this.getContent()}</p>
    	  <div className='task_item_click_rect' onClick={(e) => this.handleDelete(e)}><img className='task_item_delete_icon'/></div>
    	</div>)
  }
}))

export default withRouter(TaskItem)