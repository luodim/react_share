import React from 'react'
import TaskItem from './TaskItem.js'
import ReactDOM from 'react-dom'
import './TaskList.css'

export default class TaskList extends React.Component {
  constructor(props) {
    super(props)
    window.onscroll = () => this.handleScroll()
  }

  handleScroll() {
    if (this.doom) {
      let offsetY = this.doom.getBoundingClientRect().top
      this.props.scrollCtrl(offsetY)
    }
  }

  componentDidMount() {
    this.doom = ReactDOM.findDOMNode(this)
  }

  getClassName() {
  	console.log(`list status is ${this.props.isLoading}`)
    return this.props.isLoading ? 'task_list_outer task_list_hidden' : 'task_list_outer task_list_show'
  }

  render() {
  	const el = this.props.data.map((obj, index) => {
  	  return (<TaskItem content={obj.content} key={index} isChecked={obj.isChecked}/>)
  	})
  	return (<div className={this.getClassName()}>{el}</div>)
  }
}