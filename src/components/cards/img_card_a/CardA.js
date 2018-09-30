import React from 'react'
import ReactDOM from 'react-dom'
import ImgContainer from './img_container/ImgContainer.js'
import InfoContainer from './info_container/InfoContainer.js'
import { Link } from 'react-router-dom'
import './CardA.css'

export default class CardA extends React.Component {
  constructor(props) {
    super(props)
    this.state = {className: 'multiple_card'}
  }

  handleTaskStateChange() {
    console.log('state change---')
  }


  render() {
  	return (
  	  <div className={this.state.className}>
  	    <Link className='card_link' to={{ pathname: '/detail', state: {data: this.props.data}}}>
          <ImgContainer imgRes={this.props.data.img_res_small || this.props.data.img_res} isSingle={this.state.className === 'single_card'}/>
        </Link>
  		<InfoContainer data={this.props.data} isSingle={this.state.className === 'single_card'} taskStateChange={(state) => this.handleTaskStateChange(state)}/>
  	  </div>
      )
  }
}