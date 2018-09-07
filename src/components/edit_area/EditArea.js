import React from 'react'
import InputArea from '../input/InputArea.js'
import './EditArea.css'

export default class EditArea extends React.Component {
  constructor(props) {
    super(props)
    this.infoList = ['code', 'name', 'comment']
  }

  handleIptCB(content, name) {
    this.props.textIptCB(content, name)
  }

  render() {
  	const el = this.infoList.map((v, index) => {
  		return <InputArea key={index} textName={v} iptChangeCB={(content) => this.handleIptCB(content, this.infoList[index])}/>
  	})
  	return (<div className='edit_card_area'>{el}</div>)
  }
}