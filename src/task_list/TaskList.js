import React from 'react'
import TaskItem from './TaskItem.js'
import ReactDOM from 'react-dom'
import './TaskList.css'

export default class TaskList extends React.Component {
  constructor(props) {
    super(props)
    window.onscroll = () => this.handleScroll()
    this.sortData()
    this.state = {checkedList: this.checkedArray, unCheckedList: this.unCheckedArray, isUploading: false}
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
    return this.props.isLoading ? 'task_list_outer task_list_hidden' : 'task_list_outer task_list_show'
  }

  onCheckedChange(key) {
    this.arrayChangeHandle(key, 'checkAction')
  }

  onDeleteChange(key) {
    this.arrayChangeHandle(key, 'deleteAction')
  }

  arrayChangeHandle(key, action) {
    if (key && action) {
      let array_1 = key.split('-')
      if (array_1.length > 1) {
        let type = array_1[0]
        let index = array_1[1]
        let obj
        if (type === 'unchecked') {
          obj = this.unCheckedArray[index]
          if (action === 'checkAction') {
            this.checkedArray.push(obj)
          }
          this.unCheckedArray.splice(index, 1)
        } else if (type === 'checked') {
          obj = this.checkedArray[index]
          if (action === 'checkAction') {
            this.unCheckedArray.push(obj)
          }
          this.checkedArray.splice(index, 1)
        }
      }
      this.setState({checkedList: this.checkedArray, unCheckedList: this.unCheckedArray})
      this.updateToServer()
    }
  }

  updateToServer() {
    // 模拟更新数据到服务器
  }

  // sort the data according to param isChecked
  sortData() {
    this.checkedArray = []
    this.unCheckedArray = []
    this.props.data.map((obj, index) => {
      if (obj.isChecked) {
        this.checkedArray.push(obj)
      } else {
        this.unCheckedArray.push(obj)
      }
    })
  }

  render() {
  	const uncheckedEl = this.state.unCheckedList.map((obj, index) => {
  	  return (<TaskItem content={obj.content} key={`unchecked-${index}`} mark={`unchecked-${index}`} isChecked={false}  
        checkChange={(key) => this.onCheckedChange(key)} deleteChange={(key) => this.onDeleteChange(key)}/>)
  	})

    const checkedEl = this.state.checkedList.map((obj, index) => {
      return (<TaskItem content={obj.content} key={`checked-${index}`} mark={`checked-${index}`} isChecked={true} 
        checkChange={(key) => this.onCheckedChange(key)} deleteChange={(key) => this.onDeleteChange(key)}/>)
    })
  	return (
      <div className={this.getClassName()}>
        {uncheckedEl}
        {checkedEl}
      </div>)
  }
}