import React from 'react'
import InputArea from '../input/InputArea.js'
import './EditArea.css'

export default class EditArea extends React.Component {
  constructor(props) {
    super(props)
    this.infoList = ['code', 'name', 'comment']
    this.state = {isSubmit: this.props.isSubmit}
  }

  handleIptCB(content, name) {
    this.props.textIptCB(content, name)
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.isSubmit !== this.props.isSubmit) {
      this.setState({isSubmit: this.props.isSubmit})
    }
  }

  getType(v) {
    if (v === 'comment') {
      return 'multiple'
    }
    return 'single'
  }

  render() {
  	const el = this.infoList.map((v, index) => {
  		return <InputArea key={index} name={v} textName={v} type={this.getType(v)} iptChangeCB={(content) => this.handleIptCB(content, this.infoList[index])}/>
  	})
  	return (<div className='edit_card_area'>{el}</div>)
  }
}