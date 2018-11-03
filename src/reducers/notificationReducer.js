const reducer = (store = '', action) => {
  if (action.type === 'NOTIFY_CREATED') {
    return 'Created a a new anecdote'
  }

  if (action.type === 'REMOVE_NOTIFICATION') {
    return ''
  }

  return store
}
export const notifyCreated = () => {
  return { type: 'NOTIFY_CREATED' }
}

export const removeNotification = () => {
  return { type: 'REMOVE_NOTIFICATION' }
}

export default reducer