import React from 'react'
import './SwitchBtn.css'
import A from '../../asset/double_dis.png'
import B from '../../asset/single_dis.png'

export default class SwitchBtn extends React.Component {
  constructor(props) {
    super(props)
    this.state = {type: this.props.displayType}
    console.log(this.state.type)
  }

  getClassName() {
    return this.state.type === 'double' ? 'display_icon_single' : 'display_icon_double'
  }

  handleClick() {
    let newType = this.state.type === 'double' ? 'single' : 'double'
    this.setState ({type: newType})
    this.props.displayTypeChange(newType)
  }

  render() {
  	return (
      <div className='switch_btn'>
        <img hidden={!this.props.isShow} className={this.getClassName()}
        onClick={() => this.handleClick()} alt='switch_btn'/>
      </div>)
  }
}