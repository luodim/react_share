import {
  observable,
  action,
  decorate
} from 'mobx'

import { loginStore } from './LoginStore.js'

class CommonStore {
  isLoading = false
  isShowToast = false
  toastText = ''

  /*
  改变loading状态
  needLoading:是否需要进入loading状态 true:进入 false:不进入
  */
  showLoading(needLoading) {
    this.isLoading = needLoading
  }

  showToast(text) {
    this.isShowToast = true
    this.toastText = text
  }

  hiddenToast() {
    this.isShowToast = false
    this.toastText = ''
  }

}

decorate(CommonStore, {
  isLoading: observable,
  isShowToast: observable,
  toastText: observable,
  showLoading: action,
  showToast: action,
  hiddenToast: action
})

const commonStore = new CommonStore()

const stores = {
  commonStore,
  loginStore
}

export { stores }