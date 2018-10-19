import {
  observable,
  action,
  decorate
} from 'mobx'

class LoginStore {
  iptValue = ''
  fingerCode = ''
  isFingerCodeShow = false
  count = 0

  /*
  设置输入数值
  */
  setIpt(content) {
    this.iptValue = content
  }

  /*
  设置设备码
  */
  setFingerCode(code) {
    this.fingerCode = code
  }

  /*
  改变设备码显示状态
  needShow:是否需要显示 true:显示 false:不显示
  */
  changeFCDisState(needShow) {
    this.isFingerCodeShow = needShow
  }

  countEmptyClick() {
    this.count ++
    if (this.count === 6) {
      this.count = 0
      this.changeFCDisState(true)
    }
  }
}

decorate(LoginStore, {
  iptValue: observable,
  fingerCode: observable,
  isFingerCodeShow: observable,
  setIpt: action,
  setFingerCode: action,
  changeFCDisState: action,
})

const loginStore = new LoginStore()
export {loginStore}