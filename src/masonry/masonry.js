import React from 'react'
import ReactDOM from 'react-dom'
import CardView from '../cards/card-view.js'

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

  shouldComponentUpdate(newProps, newState) {
    return true
  }

  componentDidMount() {
    this.doom = ReactDOM.findDOMNode(this)
  }

  render() {
    this.el = this.props.data.map((data, index) => {
      return (<div className='outer' key={index}><CardView isInTask={data.isInTask} imgRes={data.imgRes} name={data.name}/></div>)
    })
    return (
      <div className='masonry'>{this.el}</div>
    )
  }
}
