import React from 'react'
import InputArea from '../input/InputArea.js'
import './EditArea.css'

export default class EditArea extends React.Component {
  constructor(props) {
    super(props)
    this.infoList = ['Number', 'Name', 'Description']
  }

  render() {
  	const el = this.infoList.map((v, index) => {return <InputArea key={index} textName={v}/>})
  	return (<div className='edit_card_area'>{el}</div>)
  }
}