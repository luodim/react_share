import React from 'react'
import TaskItem from './TaskItem.js'

export default class TaskList extends React.Component {
  constructor(props) {
    super(props)
  }

  shouldComponentUpdate(a, b) {
  	console.log('uodate---')
    return true
  }

  render() {
  	const el = this.props.data.map((obj, index) => {
  	  return (<TaskItem hidden={this.props.isLoading} content={obj.content} key={index} isChecked={obj.isChecked}/>)
  	})
  	return (<div className='task_list_outer'>{el}</div>)
  }
}