import React from 'react'
import './TaskItem.css'
import {withRouter} from 'react-router-dom'

class TaskItem extends React.Component {
  constructor(props) {
    super(props)
    this.state = {isChecked: this.getCheckState()}
  }

  handleCheckBox() {
    this.setState({isChecked: !this.state.isChecked})
    // this.timer = setTimeout(() => {
    //   this.props.checkChange(this.props.mark)
    //   this.setState({isChecked: this.props.isChecked})
    // }, 100)
  }

  handleDelete() {
    this.props.deleteChange(this.props.mark)
  }

  handleContentClick() {
    // todo
    this.props.history.push({ pathname: '/detail', state: { imgRes: null, name: this.props.content}})
  }

  getClassName(type) {
    if (type === 'checkbox') {
      return this.state.isChecked ? `task_item_checked` : `task_item_unchecked`
    } else {
      return this.state.isChecked ? `task_item_outer task_item_outer_checked` : `task_item_outer task_item_outer_unchecked`
    }
  }

  getCheckState() {
    let state = false
    let t = this.props.data.target[0]
    if (t) {
      state = t.is_checked === 1
    }
    return state
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