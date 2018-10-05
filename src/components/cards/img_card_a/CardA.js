import React from 'react'
import ReactDOM from 'react-dom'
import ImgContainer from './img_container/ImgContainer.js'
import InfoContainer from './info_container/InfoContainer.js'
import { Link } from 'react-router-dom'
import './CardA.css'

export default class CardA extends React.Component {
  constructor(props) {
    super(props)
  }

  handleTaskStateChange(state) {
    this.props.taskStateChange(state, this.props.data.union_id)
  }

  getClassName() {
    return this.props.displayType === 'double' ? 'multiple_card' : 'single_card'
  }

  render() {
  	return (
  	  <div className={this.getClassName()}>
  	    <Link className='card_link' to={{ pathname: '/detail', state: {data: this.props.data}}}>
          <ImgContainer imgRes={this.props.data.img_res_small || this.props.data.img_res}
          isSingle={this.props.displayType === 'single'}/>
        </Link>
  		<InfoContainer data={this.props.data} isSingle={this.props.displayType === 'single'}
      taskStateChange={(state) => this.handleTaskStateChange(state)}/>
  	  </div>
      )
  }
}