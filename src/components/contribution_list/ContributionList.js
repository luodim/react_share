import React from 'react'
import './ContributionList.css'
import CardB from '../cards/img_card_b/CardB.js'

export default class ContributionList extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
  	let el = this.props.datalist.map((value, index) => {
  	  return (<CardB key={index} data={value}/>)
  	})
  	return (<div className='contribution_list_outer'>{el}</div>)
  }
}