import React from 'react'
import { connect } from 'react-redux'
import { notifyCreated, removeNotification } from '../reducers/notificationReducer'
import { createNew } from '../reducers/anecdoteReducer'

class AnecdoteForm extends React.Component {
  handleSubmit = async (e) => {
    e.preventDefault()
    const content = e.target.anecdote.value
    this.props.createNew(content)
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
  createNew,
  notifyCreated,
  removeNotification
}

const ConnectedAnecdoteForm = connect(null, mapDispatchToProps)(AnecdoteForm)

export default ConnectedAnecdoteForm
