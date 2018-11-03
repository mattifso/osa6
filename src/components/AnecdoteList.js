import React from 'react'
import { connect } from 'react-redux'
import { voting } from '../reducers/anecdoteReducer'

class AnecdoteList extends React.Component {
  render() {
    const { anecdotes, filter } = this.props
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
                this.props.voting(anecdote.id)
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

const mapStateToProps = (state) => {
  return {
    anecdotes: state.anecdotes,
    filter: state.filter
  }
}

const mapDispatchToProps = {
  voting
}

const ConnectedAnecdoteList = connect(mapStateToProps, mapDispatchToProps)(AnecdoteList)

export default ConnectedAnecdoteList
