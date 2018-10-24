import React from 'react'
import './TextCard.css'
import TextInfoContainer from './text_info_container/TextInfoContainer.js'
import TextContainer from './text_container/TextContainer.js'
import { Link } from 'react-router-dom'
import { observer,inject } from 'mobx-react'

const TextCard = inject('store')(observer(class TextCard extends React.Component {
  constructor(props) {
    super(props)
    this.homeStore = this.props.store.homeStore
  }

  getClassName() {
    return this.homeStore.displayType === 'double' ? 'multiple_card' : 'single_card'
  }

  render() {
  	return (
  		<div className={this.getClassName()}>
  		  <Link className='card_link' to={{ pathname: '/detail', state: {data: this.props.data}}}>
  		    <TextContainer data={this.props.data} isSingle={this.homeStore.displayType === 'single'}/>
  		  </Link>
		  <TextInfoContainer data={this.props.data} isSingle={this.homeStore.displayType === 'single'} mark={this.props.mark}/>
  		</div>)
  }
}))

export default TextCard