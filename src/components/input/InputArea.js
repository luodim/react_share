import React from 'react'
import './InputArea.css'
import closeIcon from '../../asset/baseline_close_black_48dp.png'

export default class InputArea extends React.Component {
  constructor(props) {
    super(props)
    this.state = {content: '', isSubmit:this.props.isSubmit}
  }

  getClassName() {
    return this.props.textName === 'comment' ? 'input_area input_multiple_line' : 'input_area input_single_line'
  }

  handleChange(e) {
    this.props.iptChangeCB(e.target.value)
    let reg = new RegExp('^[A-Za-z0-9_]+$')
    console.log(`-----------${reg.test(e.target.value)}------------`)
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

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.isSubmit !== this.props.isSubmit) {
      if (this.props.isSubmit) {
        console.log('start submit method--------------------')
      }
    }
  }

  getElement() {
    return this.props.textName === 'comment' ?
    (<div className='ipt_container'>
      <textarea className={this.getClassName()} value={this.state.content} name={this.props.textName} placeholder={this.props.textName} onChange={(e) => this.handleChange(e)} required/>
      <span className='tipText'>{this.props.textName}</span>
      <img src={closeIcon} className={this.getCloseClassName('comment')} onClick={() => this.clearIpt()}/>
      </div>):
    (<div className='ipt_container'>
      <input className={this.getClassName()} value={this.state.content} type='text' name={this.props.textName} placeholder={this.props.textName} onChange={(e) => this.handleChange(e)} required/>
      <span className='tipText'>{this.props.textName}</span>
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