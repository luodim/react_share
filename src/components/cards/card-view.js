import React from 'react'
import ReactDOM from 'react-dom'
import ImgContainer from './img-container.js'
import InfoContainer from './info-container.js'
import { Link } from "react-router-dom"

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

  render() {
  	return (
  		<div className={this.state.className} onClick={(e) => this.handleClick(e)}>
  		  <Link className='card_link' to={{ pathname: '/detail', state: { imgRes: this.props.imgRes, name: this.props.name}}}>
          <ImgContainer imgRes={this.props.imgRes} />
        </Link>
  		  <InfoContainer name={this.props.name} isInTask={this.props.isInTask} />
  		</div>
      )
    }
}