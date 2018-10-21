import {
  observable,
  action,
  decorate
} from 'mobx'

class HomeStore {
  indicateIndex = 0

  selectIndexChange(index) {
    this.indicateIndex = index
  }
}

decorate(HomeStore, {
  indicateIndex: observable,
  selectIndexChange: action
})

const homeStore = new HomeStore()
export { homeStore }