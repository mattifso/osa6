import anecdoteService from '../services/anecdotes'

const reducer = (store = [], action) => {
  if (action.type === 'VOTE') {
    const updatedAnecdote = action.updatedAnecdote
    const old = store.filter(a => a.id !== updatedAnecdote.id)
    return [...old, updatedAnecdote]
  }
  if (action.type === 'CREATE') {
    return [...store, { content: action.newEntry.content, id: action.newEntry.id, votes: action.newEntry.votes }]
  }
  if (action.type === 'INIT_ANECDOTES') {
    return action.data
  }

  return store
}

export const vote = (anecdote) => {
  return async (dispatch) => {
    anecdote.votes++
    const updatedAnecdote = await anecdoteService.update(anecdote)
    dispatch({ type: 'VOTE', updatedAnecdote: updatedAnecdote })
  }
}

export const createNew = (content) => {
  return async (dispatch) => {
    const newEntry = await anecdoteService.createNew(content)
    dispatch({ type: 'CREATE', newEntry: newEntry })
  }
}

export const initAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: 'INIT_ANECDOTES',
      data: anecdotes
    })
  }
}

export default reducer