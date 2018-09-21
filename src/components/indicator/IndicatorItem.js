import React from 'react'
import './IndicatorItem.css'
import {selectChange} from '../../actions/indicatorAction.js'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { routeTo,getPageIndex } from './RouteConfig.js'

class IndicatorItem extends React.Component {
  constructor(props) {
    super(props)
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

  render() {
    const { handleClick, pageIndex, handleSelectChange } = this.props
    handleSelectChange(getPageIndex(this.props.history.location.pathname))
  	return (
  	  <div className={this.getClassName('outer', pageIndex)} onClick={() => handleClick(this.props, pageIndex)}>
  		  <p className='indicator_text'>{this.props.text}</p>
  		  <div className={this.getClassName('underline', pageIndex)}></div>
      </div>)
  }
}

const mapStateToProps = (state) => {
  return {
    pageIndex: state.index
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    handleClick: (props, pageIndex) => {
      if (props.index !== pageIndex) {
        routeTo(props.index, props.history)
      }
    },
    handleSelectChange: (index) => {
      dispatch(selectChange(index))
    }
  }
}

export const Item = withRouter(connect(mapStateToProps, mapDispatchToProps)(IndicatorItem))