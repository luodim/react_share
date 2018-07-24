import React from 'react'
import ImgContainer from './img-container.js'
import InfoContainer from './info-container.js'

export default class CardView extends React.Component {
  constructor(props) {
    super(props)
    this.props = props
    this.myRef = React.createRef()
  }

  componentDidMount() {
    this.myRef.current.className = this.myRef.current.className === 'card' ? 'card-show' : 'card'
  }

  handleClick() {
    // this.doCardAnim()
    // this.infoContainer.doInfoAnim()
  }

  render() {
  	return (
  		<div className='card' ref={this.myRef} onClick={() => this.handleClick()}>
  		  <ImgContainer imgRes={this.props.imgRes} />
  		  <InfoContainer name={this.props.name} isInTask={this.props.isInTask} ref={(InfoContainer) => {this.infoContainer = InfoContainer}}/>
  		</div>)
  }
}