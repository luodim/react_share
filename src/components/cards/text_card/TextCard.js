import React from 'react'
import './TextCard.css'
import TextInfoContainer from './text_info_container/TextInfoContainer.js'
import TextContainer from './text_container/TextContainer.js'
import { Link } from 'react-router-dom'

export default class TextCard extends React.Component {
  constructor(props) {
    super(props)
  }

  handleTaskStateChange() {
  	console.log('state change----')
  }

  getClassName() {
    return this.props.displayType === 'double' ? 'multiple_card' : 'single_card'
  }

  render() {
  	return (
  		<div className={this.getClassName()}>
  		  <Link className='card_link' to={{ pathname: '/detail', state: {data: this.props.data}}}>
  		    <TextContainer data={this.props.data} isSingle={this.props.displayType === 'single'}/>
  		  </Link>
		  <TextInfoContainer data={this.props.data} isSingle={this.props.displayType === 'single'}
      taskStateChange={(state) => this.handleTaskStateChange(state)}/>
  		</div>)
  }
}