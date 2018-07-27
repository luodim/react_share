import React from 'react'
import './TaskItem.css'

export default class TaskItem extends React.Component {
  constructor(props) {
    super(props)
    this.state = {isChecked: false}
  }

  handleCheckBox() {
    this.setState({isChecked : !this.state.isChecked})
  }

  handleDelete() {
    console.log('delete----')
  }

  handleContentClick() {
    console.log('content is clicked')
  }

  getClassName() {
  	return this.state.isChecked ? `task_item_checked` : `task_item_unchecked`
  }

  render() {
    return (
    	<div className='task_item_outer'>
    	  <div className='task_item_left_react'></div>
    	  <div className='task_item_click_rect' onClick={() => this.handleCheckBox()}><img className={this.getClassName()}/></div>
    	  <p className='task_item_content' onClick={() => this.handleContentClick()}>{this.props.content}</p>
    	  <div className='task_item_click_rect' onClick={() => this.handleDelete()}><img className='task_item_delete_icon'/></div>
    	</div>)
  }
}