import React from 'react'
import './TextCard.css'
import TextInfoContainer from './text_info_container/TextInfoContainer.js'
import TextContainer from './text_container/TextContainer.js'
import { Link } from 'react-router-dom'

export default class TextCard extends React.Component {
  constructor(props) {
    super(props)
    this.state = {className: 'text_single_card'}
  }

  handleTaskStateChange() {
  	console.log('state change----')
  }

  render() {
  	return (
  		<div className={this.state.className}>
  		  <Link className='card_link' to={{ pathname: '/detail', state: {data: this.props.data}}}>
  		    <TextContainer data={this.props.data} isSingle={this.state.className === 'single_card'}/>
  		  </Link>
		  <TextInfoContainer data={this.props.data} isSingle={this.state.className === 'single_card'} taskStateChange={(state) => this.handleTaskStateChange(state)}/>
  		</div>)
  }
}