const reducer = (store = '', action) => {
  if (action.type === 'FILTER') {
    return action.filter
  }
  return store
}
export const filter = (filter) => {
  return { type: 'FILTER', filter: filter }
}
export default reducer