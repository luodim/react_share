import React from 'react'
import ImgContainer from './img-container.js'
import InfoContainer from './info-container.js'

export default class CardView extends React.Component {
  constructor(props) {
    super(props)
    this.props = props
  }

  render() {
  	return (
  		<div className='card'>
  		  <ImgContainer imgRes={this.props.imgRes}/>
  		  <InfoContainer name={this.props.name} isInTask={this.props.isInTask}/>
  		</div>)
  }
}