import React from 'react'
import './InputArea.css'
import closeIcon from '../../asset/baseline_close_black_48dp.png'

export default class InputArea extends React.Component {
  constructor(props) {
    super(props)
    this.state = {content: '', isSubmit:this.props.isSubmit}
  }

  getClassName() {
    return this.props.type === 'multiple' ? 'input_area input_multiple_line' : 'input_area input_single_line'
  }

  handleChange(e) {
    this.props.iptChangeCB(e.target.value)
    this.setState({content: e.target.value})
  }

  getCloseClassName(type) {
    if (type === 'comment') {
      return this.state.content !== '' ? 'iptCloseComment iptCloseShow' : 'iptCloseComment iptCloseHidden'
    } else {
      return this.state.content !== '' ? 'iptCloseNormal iptCloseShow' : 'iptCloseNormal iptCloseHidden'
    }
  }

  getTipClassName() {
    return this.state.content !== '' ? 'tipText tipText_hidden' : 'tipText tipText_show'
  }

  clearIpt() {
    this.setState({content: ''})
  }

  getElement() {
    console.log(`${this.props.type}`)
    return this.props.type === 'multiple' ?
    (<div className='ipt_container'>
      <textarea className={this.getClassName()} value={this.state.content} name={this.props.name} placeholder={this.props.textName} onChange={(e) => this.handleChange(e)} required/>
      <span className='tipText'>{this.props.name}</span>
      <img src={closeIcon} className={this.getCloseClassName('comment')} onClick={() => this.clearIpt()}/>
      </div>):
    (<div className='ipt_container'>
      <input className={this.getClassName()} value={this.state.content} type='text' name={this.props.name} placeholder={this.props.textName} onChange={(e) => this.handleChange(e)} required/>
      <span className='tipText'>{this.props.name}</span>
      <img src={closeIcon} className={this.getCloseClassName('normal')} onClick={() => this.clearIpt()}/>
     </div>)
  }

  render() {
  	return (
      <div className='input_outer'>
        {this.getElement()}
      </div>)
  }
}