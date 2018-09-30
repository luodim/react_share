export const routeTo = (index, history) => {
  let path = ''
  switch (index) {
    case 0:
      path = '/home/home'
      break
    case 1:
      path = '/home/task'
      break
    case 2:
      path = '/home/account'
      break
    default:
      path = '/home/home'
      break
  }
  history.push({pathname: path})
}

export const getPageIndex = (path) => {
  let index = 0
  switch (path) {
    case '/home/home':
      index = 0
      break
    case '/home/task':
      index = 1
      break
    case '/home/account':
      index = 2
      break
    default:
      index = 0
      break
  }
  return index
}