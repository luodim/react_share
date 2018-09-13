import React from 'react'
import ReactDOM from 'react-dom'
import ImgContainer from './img-container.js'
import InfoContainer from './info-container.js'
import { Link } from "react-router-dom"
import './card-view.css'

export default class CardView extends React.Component {
  constructor(props) {
    super(props)
    this.state = {className: 'card'}
  }

  componentDidMount() {
    this.setState({className: 'card-show'})
  }

  handleClick(e) {
  }

  handleTaskStateChange(state) {
    this.props.taskStateChange(state, this.props.data.union_id)
  }

  getName() {
    let data = this.props.data
    return data ? `${data.code} ${data.name}` : ''
  }

  render() {
  	return (
  		<div className={this.state.className} onClick={(e) => this.handleClick(e)}>
  		  <Link className='card_link' to={{ pathname: '/detail', state: {data: this.props.data}}}>
          <ImgContainer imgRes={this.props.data.img_res} />
        </Link>
  		  <InfoContainer name={this.getName()} isInTask={this.props.data.is_in_task} taskStateChange={(state) => this.handleTaskStateChange(state)}/>
  		</div>
      )
    }
}