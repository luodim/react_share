import React from 'react'
import ReactDOM from 'react-dom'
import ImgContainer from './img-container.js'
import InfoContainer from './info-container.js'
import Detail from '../detail/Detail.js'

export default class CardView extends React.Component {
  constructor(props) {
    super(props)
    this.state = {className: 'card'}
  }

  componentDidMount() {
    this.setState({className: 'card-show'})
  }

  handleClick(e) {
    const ee = (<div><Detail info={{name: this.props.name, imgRes: this.props.imgRes}}/></div>)
    ReactDOM.render(ee, document.getElementById('root'))
  }

  render() {
  	return (
  		<div className={this.state.className} onClick={(e) => this.handleClick(e)}>
  		  <ImgContainer imgRes={this.props.imgRes} />
  		  <InfoContainer name={this.props.name} isInTask={this.props.isInTask} />
  		</div>)
    }
}