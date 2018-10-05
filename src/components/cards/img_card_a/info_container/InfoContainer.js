import React from 'react'
import './InfoContainer.css'
import likeSelected from '../../../../asset/baseline_favorite_black_24dp.png'
import likeUnselected from '../../../../asset/baseline_favorite_border_black_24dp.png'
import location from '../../../../asset/baseline_location_on_black_48dp.png'

export default class InfoContainer extends React.Component {
  constructor(props) {
    super(props)
    this.state = {isLike: this.props.data.id !== null}
  }

  handleLikeClick() {
    this.setState({isLike: !this.state.isLike})
    this.props.taskStateChange(!this.state.isLike)
  }

  getIcon() {
    return this.state.isLike ? likeSelected : likeUnselected
  }

  getLikeText() {
    return this.state.isLike ? '喜欢' : '赞一个'
  }

  getClassName() {
    return this.props.isSingle ? 'info_outer info_outer_single' : 'info_outer info_outer_multiple'
  }

  getLocation() {
    let location = this.props.data.location
    return location && location !== 'unknown' ? location : '未知'
  }

  getTitle() {
    return this.props.data.code && this.props.data.name ? `${this.props.data.code} ${this.props.data.name}` : '未填写'
  }

  render() {
  	return (
  		<div className={this.getClassName()}>
  		  <label className='info_title_outer'>{this.getTitle()}</label>
        <div className='other_info'>
          <img className='location_icon' src={location}/>
          <label className='info_text'>{this.getLocation()}</label>
          <img className='like_icon' src={this.getIcon()} onClick={() => this.handleLikeClick()}/>
          <label className='info_text'>{this.getLikeText()}</label>
        </div>
  		</div>)
  }
}