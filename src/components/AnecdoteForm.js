import React from 'react'
import { connect } from 'react-redux'
import { creation } from '../reducers/anecdoteReducer'
import { notifyCreated, removeNotification } from '../reducers/notificationReducer'
import anecdoteService from '../services/anecdotes'

class AnecdoteForm extends React.Component {
  handleSubmit = async (e) => {
    e.preventDefault()
    const content = e.target.anecdote.value
    const newAnecdote = await anecdoteService.createNew(content)

    this.props.creation(newAnecdote)
    this.props.notifyCreated()
    setTimeout(() => {
      this.props.removeNotification()
    }, 5000)
  }
  render() {
    return (
      <div>
        <h2>create new</h2>
        <form onSubmit={this.handleSubmit}>
          <div><input name='anecdote' /></div>
          <button>create</button>
        </form>
      </div>
    )
  }
}

const mapDispatchToProps = {
  creation,
  notifyCreated,
  removeNotification
}

const ConnectedAnecdoteForm = connect(null, mapDispatchToProps)(AnecdoteForm)

export default ConnectedAnecdoteForm
