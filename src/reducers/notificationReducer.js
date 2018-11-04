const reducer = (store = '', action) => {
  if (action.type === 'NOTIFY_CREATED') {
    return `you created '${action.content}'`
  }

  if (action.type === 'REMOVE_NOTIFICATION') {
    return ''
  }

  return store
}
export const notifyCreated = (content) => {
  return (dispatch) => {
    dispatch({ type: 'NOTIFY_CREATED', content })
    setTimeout(() => {
      dispatch({ type: 'REMOVE_NOTIFICATION' })
    }, 5000)
  }
}
export default reducer