import axios from 'axios'

const url = 'http://localhost:3001/anecdotes'

const getAll = async () => {
  const response = await axios.get(url)
  return response.data
}

const createNew = async (content) => {
  const response = await axios.post(url, { content: content, votes: 0 })
  return response.data
}

const update = async (content) => {
  const response = await axios.put(url + '/' + content.id, { content: content.content, votes: content.votes })
  return response.data
}

export default { getAll, createNew, update }