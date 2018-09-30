
const SELECT_CHANGE = 'SELECT_CHANGE'

const indicatorReducer = (state = {index: 0}, action) => {
  if (action.type === SELECT_CHANGE) {
    return Object.assign({state}, {
      index: action.index
    })
  }
  return state
}

export const rootReducer = indicatorReducer


