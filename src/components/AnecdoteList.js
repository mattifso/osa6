import React from 'react'
import { voting } from '../reducers/anecdoteReducer'


class AnecdoteList extends React.Component {
  render() {
    const { anecdotes, filter } = this.props.store.getState()
    const anecdotesToShow = () => {
      return anecdotes.filter(a => a.content.includes(filter)).sort((a, b) => b.votes - a.votes)
    }

    return (
      <div>
        <h2>Anecdotes</h2>
        {anecdotesToShow().map(anecdote =>
          <div key={anecdote.id}>
            <div>
              {anecdote.content}
            </div>
            <div>
              has {anecdote.votes}
              <button onClick={() =>
                this.props.store.dispatch(voting(anecdote.id))
              }>
                vote
              </button>
            </div>
          </div>
        )}
      </div>
    )
  }
}

export default AnecdoteList
