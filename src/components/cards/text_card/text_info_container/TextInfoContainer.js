import React from 'react'
import './TextInfoContainer.css'
import likeSelected from '../../../../asset/baseline_favorite_black_24dp.png'
import likeUnselected from '../../../../asset/baseline_favorite_border_black_24dp.png'
import location from '../../../../asset/baseline_location_on_black_48dp.png'

export default class TextInfoContainer extends React.Component {
  constructor(props) {
    super(props)
    this.state = {isLike: this.props.data.isInTask, likeNum: this.props.data.likeNum ? this.props.data.likeNum : 0}
  }

  handleLikeClick() {
    this.setState({isLike: !this.state.isLike, likeNum: this.state.isLike ? this.state.likeNum -1 : this.state.likeNum + 1})
  }

  getIcon() {
    return this.state.isLike ? likeSelected : likeUnselected
  }

  getClassName() {
    return this.props.isSingle ? 'info_outer info_outer_single' : 'info_outer info_outer_multiple'
  }

  render() {
  	return (
  		<div className={this.getClassName()}>
        <div className='other_info'>
          <img className='location_icon' src={location}/>
          <label className='info_text'>{this.props.data.location}</label>
          <img className='like_icon' src={this.getIcon()} onClick={() => this.handleLikeClick()}/>
          <label className='info_text'>{this.state.likeNum}</label>
        </div>
  		</div>)
  }
}