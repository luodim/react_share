import React from 'react'
import ImgContainer from './img-container.js'
import InfoContainer from './info-container.js'

export default class CardView extends React.Component {
  constructor(props) {
    super(props)
    this.state = {className: 'card'}
  }

  componentDidMount() {
    this.setState({className: 'card-show'})
  }

  handleClick(e) {
    console.log('card click---')
  }

  render() {
  	return (
  		<div className={this.state.className} onClick={(e) => this.handleClick(e)}>
  		  <ImgContainer imgRes={this.props.imgRes} />
  		  <InfoContainer name={this.props.name} isInTask={this.props.isInTask} />
  		</div>)
    }
}