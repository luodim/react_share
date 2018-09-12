import React from 'react'
import './TaskItem.css'
import {withRouter} from 'react-router-dom'

class TaskItem extends React.Component {
  constructor(props) {
    super(props)
    this.state = {isChecked: this.props.isChecked}
  }

  handleCheckBox() {
    this.setState({isChecked: !this.state.isChecked})
    this.timer = setTimeout(() => {
      console.log(`key is ${this.props.mark}, check state is ${this.state.isChecked}`)
      this.props.checkChange(this.state.isChecked, this.props.mark)
      // 这段很重要，由于在item中改变状态后回调到tasklist根据更改状态修改了check及uncheck集合，只是集合变化，组件需要刷新
      this.setState({isChecked: this.props.isChecked})
    }, 100)
  }

  handleDelete() {
    this.props.deleteChange(this.state.isChecked, this.props.mark)
  }

  handleContentClick() {
    this.props.history.push({ pathname: '/detail', state: {data: this.props.data.target[0]}})
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
    let t = this.props.data.target[0]
    if (t) {
      content = `${t.code} ${t.name}`
    }
    return content
  }

  componentWillUnmount() {
    // clearTimeout(this.timer)
  }

  render() {
    return (
    	<div className={this.getClassName('outer')}>
    	  <div className='task_item_left_react'></div>
    	  <div className='task_item_click_rect' onClick={() => this.handleCheckBox()}><img className={this.getClassName('checkbox')}/></div>
    	  <p className='task_item_content' onClick={() => this.handleContentClick()}>{this.getContent()}</p>
    	  <div className='task_item_click_rect' onClick={() => this.handleDelete()}><img className='task_item_delete_icon'/></div>
    	</div>)
  }
}

export default withRouter(TaskItem)