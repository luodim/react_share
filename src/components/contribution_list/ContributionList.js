import React from 'react'
import './ContributionList.css'
import CardB from '../cards/img_card_b/CardB.js'

export default class ContributionList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {datalist: this.props.datalist}
  }

  handleClear(unionId, index) {
    this.props.clear(unionId, index)
  }

  render() {
  	let el = this.props.datalist.map((value, index) => {
  	  return (<CardB key={index} data={value} mark={index} clear={(unionId, index) => this.handleClear(unionId, index)}/>)
  	})
  	return (<div className='contribution_list_outer'>{el}</div>)
  }
}