import React from 'react'

export default class ImgContainer extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
  	return (
  		<div className='img_container'>
  		  <img src={this.props.imgRes}/>
  		</div>
  		)
  }
}