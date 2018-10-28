import {
  observable,
  action,
  decorate
} from 'mobx'

import { loginStore } from './LoginStore.js'
import { homeStore } from './HomeStore.js'

class CommonStore {
  isLoading = false
  isShowToast = false
  toastText = ''
  inputText = ''
  isComponentMounted = false
  pointerState = ''

  /*
  改变loading状态
  needLoading:是否需要进入loading状态 true:进入 false:不进入
  */
  showLoading(needLoading) {
    this.isLoading = needLoading
  }

  /*
  显示toast
  toast文字内容
  */
  showToast(text) {
    this.isShowToast = true
    this.toastText = text
  }

  /*
  隐藏toast
  */
  hiddenToast() {
    this.isShowToast = false
    this.toastText = ''
  }

  /*
  处理输入值
  */
  handleInputContent(content) {
    this.inputText = content
  }

  /*
  清空输入值
  */
  clearInput() {
    this.inputText = ''
  }

  /*
  改变空间是否装载状态:isMounted[true:已装载 false:未装载]
  */
  changeComponentMountState(isMounted) {
    this.isComponentMounted = isMounted
  }

  /*
  更新点击状态
  */
  updatePointerState(state) {
    this.pointerState = state
  }

}

decorate(CommonStore, {
  isLoading: observable,
  isShowToast: observable,
  toastText: observable,
  inputText: observable,
  isComponentMounted: observable,
  pointerState: observable,
  showLoading: action,
  showToast: action,
  hiddenToast: action,
  handleInputContent: action,
  clearInput: action,
  changeComponentMountState: action,
  updatePointerState: action
})

const commonStore = new CommonStore()

const stores = {
  commonStore,
  loginStore,
  homeStore
}

export { stores }