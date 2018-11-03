import React from 'react'
import { connect } from 'react-redux'
import { creation } from '../reducers/anecdoteReducer'
import { notifyCreated, removeNotification } from '../reducers/notificationReducer'

class AnecdoteForm extends React.Component {
  handleSubmit = (e) => {
    e.preventDefault()
    const content = e.target.anecdote.value
    this.props.creation(content)
    this.props.notifyCreated()
    setTimeout(() => {
      this.props.store.dispatch(removeNotification())
    }, 5000)
    e.target.anecdote.value = ''
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

const mapStateToProps = () => { return {} }

const mapDispatchToProps = {
  creation,
  notifyCreated
}

const ConnectedAnecdoteForm = connect(mapStateToProps, mapDispatchToProps)(AnecdoteForm)

export default ConnectedAnecdoteForm
