import {
  observable,
  action,
  decorate
} from 'mobx'

class HomeStore {
  indicateIndex = 0 // 导航栏指示器但前选中item的index
  scrollY = 0 // 当前页面Y轴滑动的距离
  showDisplayTypeIcon = false // 是否显示单双列展示功能的切换图标，默认不展示
  displayType = 'double' // 单双列显示状态，默认双列显示
  hasData = true // 是否有数据，此变量用于标定在分页加载时是否该继续请求，默认值为true即还有数据
  sinceId = -1 // 分页查询的游标
  userId = '' // userId
  datalist = [] // 首页请求的数据列表
  isLike = false // 是否喜欢
  curSelectedCardIndex = 0 // 当前选中卡片在列表中的index
  curLikeListItemIndex = 0 // 当前操作的喜欢列表中的item的index
  childrenMounted = false // 子组件是否加载
  handleStateChange // 处理喜欢状态改变的回调函数
  handleChildrenMounted // 处理子组件加载后的回调函数
  checkStatekChange // 处理喜爱列表选中状态改变的回调函数

  // 设置喜欢状态改变的回调函数
  setHandleLikeStateChange(f) {
  	this.handleStateChange = (state, isChecked) => f(state, isChecked)
  }

  // 设置首页子组件装载/卸载状态更新的回调函数
  setHandleChildrenMountedChange(f) {
    this.handleChildrenMounted = (id) => f(id)
  }

  // 设置处理喜爱列表选中状态改变的回调函数
  setCheckStateChangeCB(f) {
    this.checkStatekChange = (state) => f(state)
  }

  // 设置当前选中的item的index
  selectIndexChange(index) {
    this.indicateIndex = index
  }

  // 更新当前页面Y轴滚动数值
  updateScrollY(value) {
  	this.scrollY = value
  }

  // 设置图标显示状态
  setDisplayTypeIconState(needShow) {
  	this.showDisplayTypeIcon = needShow
  }

  // 改变显示类型
  changeDisplayType(type) {
    this.displayType = type
  }

  // 改变还有数据标记状态
  changeHasDataState(hasMoreData) {
    this.hasData = hasMoreData
  }

  // 设置分页查询的游标id
  setSinceId(value) {
    this.sinceId = value
  }

  // 更新数据列表
  updateDatalist(list) {
    this.datalist = this.datalist.concat(list)
  }

  // 清除数据列表
  clearDatalist() {
  	this.datalist = []
  }

  // 设置当前选中卡片的index
  setCurSelectedCardIndex(index) {
    this.curSelectedCardIndex = index
  }

  // 改变是否喜欢状态
  changeTaskState(isLike, isChecked = false) {
    this.isLike = isLike
    this.handleStateChange(isLike)
  }

  // 设置userId
  setUserId(userId) {
    this.userId = userId
  }

  // 更新子组件装载状态
  updateChildrenMountedState(isMounted, id) {
    this.childrenMounted = isMounted
    if (isMounted) this.handleChildrenMounted(id)
  }

  // 设置当前操作的喜欢item的index
  setCurLikeItemIndex(index) {
    this.curLikeListItemIndex = index
  }

  // 更新选中状态改变
  updateCheckStateChange(state, isChecked) {
    this.checkStatekChange(state, isChecked)
  }
}

decorate(HomeStore, {
  indicateIndex: observable,
  scrollY: observable,
  showDisplayTypeIcon: observable,
  displayType: observable,
  hasData: observable,
  sinceId: observable,
  datalist: observable,
  isLike: observable,
  curSelectedCardIndex: observable,
  userId: observable,
  childrenMounted: observable,
  curLikeListItemIndex: observable,
  selectIndexChange: action,
  updateScrollY: action,
  setDisplayTypeIconState: action,
  changeDisplayType: action,
  changeHasDataState: action,
  setSinceId: action,
  updateDatalist: action,
  clearDatalist: action,
  setCurSelectedCardIndex: action,
  changeTaskState: action,
  setUserId: action,
  updateChildrenMountedState: action,
  setCurLikeItemIndex: action,
  updateCheckStateChange: action
})

const homeStore = new HomeStore()
export { homeStore }