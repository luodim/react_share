import React from 'react'
import ReactDOM from 'react-dom'
import ImgContainer from './img_container/ImgContainer.js'
import InfoContainer from './info_container/InfoContainer.js'
import { Link } from 'react-router-dom'
import { observer,inject } from 'mobx-react'
import './CardA.css'

const CardA = inject('store')(observer(class CardA extends React.Component {
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
  	    <Link className='card_link' to={{ pathname: '/detail', state: {data: this.props.data, index: this.props.mark}}}>
          <ImgContainer imgRes={this.props.data.img_res_small || this.props.data.img_res} isSingle={this.homeStore.displayType === 'single'}/>
        </Link>
  		<InfoContainer data={this.props.data} isSingle={this.homeStore.displayType === 'single'} mark={this.props.mark}/>
  	  </div>
    )
  }
}))

export default CardA