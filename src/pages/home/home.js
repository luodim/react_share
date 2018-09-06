import React from 'react'
import Masonry from '../../components/masonry/masonry.js'
import FloatButton from '../../components/float_button/float-button.js'
import NavigationBar from '../../components/navigation_bar/navigation-bar.js'
import TaskList from '../../components/task_list/TaskList.js'
import Loading from '../../components/loading/Loading.js'
import Fingerprint2 from 'fingerprintjs2'

export default class Home extends React.Component {
  constructor(props) {
    super(props)
    this.curPageIndex = this.props.pageIndex || 0
    this.data = []
    this.state = {scrollV: 0, isShow: true, listData: this.data, pageIndex: this.curPageIndex, isLoading: true}
    this.isComponentMounted = false
  }

  requestData(index) {
    // 模拟耗时网络请求
    this.timer = setTimeout(() => {
      this.data = index === 0 ? [
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
      ]:
      [
        {isChecked: false, content: '027 A Tiyuen'},
        {isChecked: false, content: '055 A Dihe'},
        {isChecked: false, content: '024 A Mihabd'},
        {isChecked: false, content: '011 A Yukjdklj'},
        {isChecked: false, content: '001 A Yuhena'},
        {isChecked: false, content: '003 A Hewutu'},
        {isChecked: true, content: '059 A Haindjf'},
        {isChecked: false, content: '077 A dasda'},
        {isChecked: false, content: '087 A Hong'},
        {isChecked: false, content: '004 A Yuduen'},
        {isChecked: false, content: '066 A Hauidjd'},
        {isChecked: false, content: '044 A dsasa'},
        {isChecked: true, content: '198 A sdfhjdsfuen'},
        {isChecked: false, content: '200 A Benskds'},
        {isChecked: false, content: '177 A Hubry'},
        {isChecked: true, content: '162 A bhuhdd'},
        {isChecked: false, content: '401 A honfdknd'},
        {isChecked: true, content: '330 A Hoa mie'},
        {isChecked: false, content: '989 A hjjidkldf'},
        {isChecked: false, content: '787 A Beoneklkd'},
        {isChecked: false, content: '199 A adasddsf'},
        {isChecked: false, content: '124 A adjhUj'},
        {isChecked: false, content: '099 A hksdjfks'},
        {isChecked: false, content: '288 A hudjkkf'},
        {isChecked: false, content: '013 A Leujdks'},
        {isChecked: true, content: '676 A Hukdjfd'},
        {isChecked: false, content: '433 A akjdks'},
        {isChecked: false, content: '233 A djjdskf'},
        {isChecked: false, content: '101 A Taidkfg'},
        {isChecked: false, content: '089 A asdasd'},
        {isChecked: false, content: '333 A asdasf'},
        {isChecked: false, content: '320 A Aiedmkxf'},
      ]

      this.setState({scrollV: 0, isShow: index === 0 ? true : false, listData: this.data, pageIndex: index, isLoading: false})
      this.isReset = false
    }, 1500)
    this.reset()
    this.setState({isLoading: true})
  }

  reset() {
    this.isReset = true
    window.scrollTo(0,0)
  }

  getPage(pageId) {
  	return pageId === 0 ?
    (<Masonry isLoading={this.state.isLoading} scrollCtrl={(value) => this.scrollCtrl(value)} data={this.state.listData}/>):
    (<TaskList isLoading={this.state.isLoading} scrollCtrl={(value) => this.scrollCtrl(value)} data={this.state.listData}/>)
  }

  scrollCtrl(value) {
    if (this.isReset) return
    if (this.isComponentMounted) this.setState({scrollV: value})
  }

  switchPage(index) {
    if (index === this.curPageIndex) return
    this.curPageIndex = index
    this.requestData(index)
  }

  componentDidMount() {
    this.isComponentMounted = true
    this.requestData(this.curPageIndex)
    new Fingerprint2().get(function(result, components) {
      console.log(`result is ${result}`) // a hash, representing your device fingerprint
    })
  }

  componentWillUnmount() {
    // todo will be modify late
    clearTimeout(this.timer)
    this.isComponentMounted = false
  }

  render() {
    return (
    	<div className='home'>
    	  <NavigationBar scrollValue={this.state.scrollV} switch={(index) => this.switchPage(index)} isShow={this.state.isShow} />
    	  <div className='page_container'>
          {this.getPage(this.state.pageIndex)}
          <Loading isLoading={this.state.isLoading}/>
        </div>
    	  <FloatButton/>
    	</div>)
  }
}