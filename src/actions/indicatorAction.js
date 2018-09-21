const SELECT_CHANGE = 'SELECT_CHANGE'

export const selectChange = (index) => {
  return {
    type: SELECT_CHANGE,
    index: index
  }
}