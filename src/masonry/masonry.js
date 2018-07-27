import React from 'react'
import ReactDOM from 'react-dom'
import CardView from '../cards/card-view.js'

export default class Masonry extends React.Component {
  constructor(props) {
    super(props)
    this.data = [
      {isInTask: true, imgRes: 'https://keyassets.timeincuk.net/inspirewp/live/wp-content/uploads/sites/11/2017/06/Genius-900-Tuned_SCOTT-Sports_bike_Close-Up_2018_22-e1517576991890.jpg', name: '001 A Han'}, 
      {isInTask: false, imgRes: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSiMUQJr3B2V4ZGkOYbZS03ci85mOVje7Zs9MU3qAPFe7w4gnxQ', name: '002 A Tues'}, 
      {isInTask: false, imgRes: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcThI9ulwBTUVLZM1eZY13sJuM4mHNqxpqXTe3rcqFFAxKCts7WvdQ', name: '003 A Mian'}, 
      {isInTask: false, imgRes: 'http://english.baoquangninh.com.vn/dataimages/201108/original/images606552_ngochan2.jpg', name:'004 A Qi'}, 
      {isInTask: true, imgRes: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTE-7Uy9PWJr20l-SWG5lpZhZS1V4Wc29Cvchc9IMPOlEbLPNgw', name: '005 A Taiya'}, 
      {isInTask: false, imgRes: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT5xVODa1jwWojwqnwm8rAvaXbdCn3xKq6wN90a37ED1vUvD1qr', name: '006 A Nghyuen'}, 
      {isInTask: false, imgRes: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSLnmyta7kiitGvKrOQKQ5DjXRjz7EoDL3EeGpVTRHSP--qsQBU6w', name: '007 A Mai'},
      {isInTask: true, imgRes: 'https://keyassets.timeincuk.net/inspirewp/live/wp-content/uploads/sites/11/2017/06/Genius-900-Tuned_SCOTT-Sports_bike_Close-Up_2018_22-e1517576991890.jpg', name: '001 A Han'}, 
      {isInTask: false, imgRes: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSiMUQJr3B2V4ZGkOYbZS03ci85mOVje7Zs9MU3qAPFe7w4gnxQ', name: '002 A Tues'}, 
      {isInTask: false, imgRes: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcThI9ulwBTUVLZM1eZY13sJuM4mHNqxpqXTe3rcqFFAxKCts7WvdQ', name: '003 A Mian'}, 
      {isInTask: false, imgRes: 'http://english.baoquangninh.com.vn/dataimages/201108/original/images606552_ngochan2.jpg', name:'004 A Qi'}, 
      {isInTask: true, imgRes: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTE-7Uy9PWJr20l-SWG5lpZhZS1V4Wc29Cvchc9IMPOlEbLPNgw', name: '005 A Taiya'}, 
      {isInTask: false, imgRes: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT5xVODa1jwWojwqnwm8rAvaXbdCn3xKq6wN90a37ED1vUvD1qr', name: '006 A Nghyuen'}, 
      {isInTask: false, imgRes: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSLnmyta7kiitGvKrOQKQ5DjXRjz7EoDL3EeGpVTRHSP--qsQBU6w', name: '007 A Mai'},
      {isInTask: true, imgRes: 'https://keyassets.timeincuk.net/inspirewp/live/wp-content/uploads/sites/11/2017/06/Genius-900-Tuned_SCOTT-Sports_bike_Close-Up_2018_22-e1517576991890.jpg', name: '001 A Han'}, 
      {isInTask: false, imgRes: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSiMUQJr3B2V4ZGkOYbZS03ci85mOVje7Zs9MU3qAPFe7w4gnxQ', name: '002 A Tues'}, 
      {isInTask: false, imgRes: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcThI9ulwBTUVLZM1eZY13sJuM4mHNqxpqXTe3rcqFFAxKCts7WvdQ', name: '003 A Mian'}, 
      {isInTask: false, imgRes: 'http://english.baoquangninh.com.vn/dataimages/201108/original/images606552_ngochan2.jpg', name:'004 A Qi'}, 
      {isInTask: true, imgRes: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTE-7Uy9PWJr20l-SWG5lpZhZS1V4Wc29Cvchc9IMPOlEbLPNgw', name: '005 A Taiya'}, 
      {isInTask: false, imgRes: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT5xVODa1jwWojwqnwm8rAvaXbdCn3xKq6wN90a37ED1vUvD1qr', name: '006 A Nghyuen'}, 
      {isInTask: false, imgRes: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSLnmyta7kiitGvKrOQKQ5DjXRjz7EoDL3EeGpVTRHSP--qsQBU6w', name: '007 A Mai'}
    ]

    window.onscroll = () => this.handleScroll()
  }

  handleScroll() {
    if (this.doom) {
      let offsetY = this.doom.getBoundingClientRect().top
      this.props.scrollCtrl(offsetY)
    }
  }

  shouldComponentUpdate(newProps, newState) {
    return false
  }

  componentDidMount() {
    this.doom = ReactDOM.findDOMNode(this)
  }

  render() {
    this.el = this.data.map((data, index) => {
      return (<div className='outer' key={index}><CardView isInTask={data.isInTask} imgRes={data.imgRes} name={data.name}/></div>)
    })
    return (
      <div className='masonry'>{this.el}</div>
    )
  }
}
