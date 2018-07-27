import React from 'react'
import TaskItem from './TaskItem.js'

export default class TaskList extends React.Component {
  constructor(props) {
    super(props)
    this.data = []
    for (let i = 0; i < 100; i++) {
      this.data.push(`test content is ${i}`)
    }
  }

  render() {
  	const el = this.data.map((obj, index) => {
  	  return (<TaskItem content={obj} key={index}/>)
  	})
  	return (<div className='task_list_outer'>{el}</div>)
  }
}