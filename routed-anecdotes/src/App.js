import React from 'react'
import { BrowserRouter as Router, Route, Link, Redirect, NavLink } from 'react-router-dom'
import { ListGroup, ListGroupItem, Grid, Col, Image, ControlLabel, FormControl, FormGroup, Button } from 'react-bootstrap'

const Menu = ({ anecdotes, addNew, anecdoteById, notify }) => {
  const menuStyle = {
    border: 'solid',
    padding: 10,
    borderWidth: 5,
    borderRadius: 10,
    margin: 10,
    background: 'linear-gradient(green, purple)',
  }
  const activeStyle = {
    color: 'red',
    fontWeight: 'bold'
  }
  const passiveStyle = {
    color: 'lightBlue',
  }
  return (
    <div>
      <div style={menuStyle}>
        <NavLink style={passiveStyle} activeStyle={activeStyle} exact to="/">anecdotes</NavLink>&nbsp;
        <NavLink style={passiveStyle} activeStyle={activeStyle} exact to="/create">create new</NavLink>&nbsp;
        <NavLink style={passiveStyle} activeStyle={activeStyle} exact to="/about">about</NavLink>&nbsp;
      </div>
      <Route exact path="/" render={() => <div><AnecdoteList anecdotes={anecdotes} /> </div>} />
      <Route path="/about" render={() => <div><About /> </div>} />
      <Route path="/create" render={() => <div><CreateNew addNew={addNew} notify={notify} /> </div>} />
      <Route exact path="/anecdotes/:id" render={({ match }) => <Anecdote anecdote={anecdoteById(match.params.id)} />} />
    </div>)
}

const Anecdote = ({ anecdote }) => {
  return (
    <div>
      <h2>{anecdote.content}</h2>
      <div>author: {anecdote.author}</div>
      <div>info: {anecdote.info}</div>
      <div>votes: {anecdote.votes}</div>
    </div>
  )
}

const AnecdoteList = ({ anecdotes }) => (
  <div>
    <h2>Anecdotes</h2>
    <ListGroup>
      {anecdotes.map(anecdote => <ListGroupItem key={anecdote.id} ><Link to={`/anecdotes/${anecdote.id}`}>{anecdote.content}</Link></ListGroupItem>)}
    </ListGroup>
  </div>
)

const About = () => (
  <div>
    <h2>About anecdote app</h2>
    <p>According to Wikipedia:</p>

    <Grid>
      <Col sm={8}>
        <em>An anecdote is a brief, revealing account of an individual person or an incident.
            Occasionally humorous, anecdotes differ from jokes because their primary purpose is not simply to provoke laughter but to reveal a truth more general than the brief tale itself,
            such as to characterize a person by delineating a specific quirk or trait, to communicate an abstract idea about a person, place, or thing through the concrete details of a short narrative.
          An anecdote is "a story with a point."</em>

        <p>Software engineering is full of excellent anecdotes, at this app you can find the best and add more.</p>
      </Col>
      <Col sm={2}>
        <Image src="https://static.frontendmasters.com/assets/teachers/crockford/thumb@2x.jpg" />
      </Col>
    </Grid>
  </div>
)

const Footer = () => (
  <div>
    Anecdote app for <a href='https://courses.helsinki.fi/fi/TKT21009/121540749'>Full Stack -sovelluskehitys</a>.

    See <a href='https://github.com/mluukkai/routed-anecdotes'>https://github.com/mluukkai/routed-anecdotes</a> for the source code.
  </div>
)

class CreateNew extends React.Component {
  constructor() {
    super()
    this.state = {
      content: '',
      author: '',
      info: ''
    }
  }

  handleChange = (e) => {
    console.log(e.target.name, e.target.value)
    this.setState({ [e.target.name]: e.target.value })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    this.props.addNew({
      content: this.state.content,
      author: this.state.author,
      info: this.state.info,
      votes: 0,
    })
    this.props.notify(`a new anecdote ${this.state.content} created`)
  }

  render() {
    return (
      <div>
        <h2>create a new anecdote</h2>

        <form onSubmit={this.handleSubmit}>
          <FormGroup>
            <div>
              <ControlLabel>content</ControlLabel>
              <FormControl type='text' name='content' value={this.state.content} onChange={this.handleChange} />
            </div>
            <div>
              <ControlLabel>author</ControlLabel>
              <FormControl type='text' name='author' value={this.state.author} onChange={this.handleChange} />
            </div>
            <div>
              <ControlLabel>url for more info</ControlLabel>
              <FormControl type='text' name='info' value={this.state.info} onChange={this.handleChange} />
            </div>
            <Button bsStyle="success" type="submit">create</Button>
          </FormGroup>
        </form>
      </div>
    )

  }
}

class App extends React.Component {
  constructor() {
    super()

    this.state = {
      anecdotes: [
        {
          content: 'If it hurts, do it more often',
          author: 'Jez Humble',
          info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
          votes: 0,
          id: '1'
        },
        {
          content: 'Premature optimization is the root of all evil',
          author: 'Donald Knuth',
          info: 'http://wiki.c2.com/?PrematureOptimization',
          votes: 0,
          id: '2'
        }
      ],
      notification: ''
    }
  }

  addNew = (anecdote) => {
    anecdote.id = (Math.random() * 10000).toFixed(0)
    this.setState({ anecdotes: this.state.anecdotes.concat(anecdote) })
  }

  anecdoteById = (id) =>
    this.state.anecdotes.find(a => a.id === id)

  vote = (id) => {
    const anecdote = this.anecdoteById(id)

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1
    }

    const anecdotes = this.state.anecdotes.map(a => a.id === id ? voted : a)

    this.setState({ anecdotes })
  }
  notify = (notification) => {
    this.setState({ notification })
    setTimeout(() => {
      this.setState({ notification: '', redirect: '/' })
    }, 10000)

  }

  render() {
    const notificationStyle = {
      border: 'solid',
      padding: 50,
      borderWidth: 5,
      borderRadius: 50,
      margin: 50,
      background: 'linear-gradient(red, yellow)',
      textAlign: 'center',
      color: 'purple',
      wordSpacing: 5
    }

    return (
      <div className="container">
        <Router>
          <div>
            <h1>Software anecdotes</h1>
            {this.state.notification ? <div style={notificationStyle}> {this.state.notification} </div> : ''}
            {this.state.redirect ? <Redirect to={this.state.redirect} /> : ''}
            <Menu anecdotes={this.state.anecdotes} addNew={this.addNew} anecdoteById={this.anecdoteById} notify={this.notify} />
            <Footer />
          </div>
        </Router>
      </div>
    )
  }
}

export default App
