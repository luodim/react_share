import React from 'react'
import ReactDOM from 'react-dom'
import CardView from '../cards/card-view.js'
import './masonry.css'

export default class Masonry extends React.Component {
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
    return this.props.isLoading ? 'masonry masonry_hidden' : 'masonry masonry_show'
  }

  render() {
    this.el = this.props.data.map((data, index) => {
      return (<div className='outer' key={index}><CardView isInTask={data.isInTask} imgRes={data.imgRes} name={data.name}/></div>)
    })
    return (
      <div className={this.getClassName()}>{this.el}</div>
    )
  }
}
