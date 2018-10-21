import React from 'react'
import './IndicatorItem.css'
import { withRouter } from 'react-router-dom'
import { routeTo,getPageIndex } from './RouteConfig.js'
import { observer,inject } from 'mobx-react'

const IndicatorItem = inject('store')(observer(class IndicatorItem extends React.Component {
  constructor(props) {
    super(props)
    this.homeStore = this.props.store.homeStore
  }

  getClassName(type, index) {
  	if (type === 'outer') {
  	  return index === this.props.index ? 'indicator_item selected' : 'indicator_item unselected'
  	} else if (type === 'underline') {
      return index === this.props.index ? 'indicator_underline slide_selected' : 'indicator_underline slide_unselected'
  	} else if (type === 'wave') {
  	  return index === this.props.index ? 'item_wave item_wave_show' : 'item wave'
  	}
  }

  handleClick(pageIndex) {
    if (this.homeStore.indicateIndex !== pageIndex) {
      this.homeStore.selectIndexChange(pageIndex)
      routeTo(this.homeStore.indicateIndex, this.props.history)
    }
  }

  render() {
    this.homeStore.selectIndexChange(getPageIndex(this.props.history.location.pathname))
  	return (
  	  <div className={this.getClassName('outer', this.homeStore.indicateIndex)} onClick={() => this.handleClick(this.props.index)}>
  		  <p className='indicator_text'>{this.props.text}</p>
  		  <div className={this.getClassName('underline', this.homeStore.indicateIndex)}></div>
      </div>)
  }
}))

export const Item = withRouter(IndicatorItem)

