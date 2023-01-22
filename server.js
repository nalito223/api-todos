const express = require('express')
const todos = require('./data.js')
const cors = require('cors')
const app = express()

app.use(cors())
app.use(express.json())

app.locals.title = 'Todos API'
app.locals.todos = todos

app.set('port', 3001)
app.listen(app.get('port'), () => {
  console.log(`${app.locals.title} is now running on ${app.get('port')}!`)
})

app.get('/todos', (request, response) => {
  response.status(200).json(app.locals.todos)
})

app.get('/todos/:id', (request, response) => {
  const id = parseInt(request.params.id)
  const foundTodo = app.locals.todos.find(idea => String(idea.id) === String(id))
  if (!foundTodo) {
    return response.status(404).json({ message: `Sorry, no todo found with an id of ${id}` })
  }
  response.status(200).json(foundTodo)
})

app.post('/todos', (request, response) => {
  const submittedTodo = request.body
  for (let requiredParameter of ['content', 'date', 'status', 'destination']) {
    if (!submittedTodo[requiredParameter]) {
      return response.status(422).json({ message: `Body is missing required parameter of ${requiredParameter}.` })
    }
  }
  submittedTodo.id = String(Date.now())
  app.locals.todos.push(submittedTodo)
  response.status(201).json(submittedTodo)
})

app.delete('/todos/:id', (request, response) => {
  const id = request.params.id
  const filteredTodo = app.locals.todos.filter(todo => String(todo.id) !== String(id))
  app.locals.todos = filteredTodo
  response.status(200).json(app.locals.todos)
})

app.put('/todos/:id', (req, res) => {
  const id = parseInt(req.params.id)
  const { content, date, destination } = req.body
  const updatedTask = app.locals.todos.find(todo => String(todo.id) == String(id))
  updatedTask.destination = destination
  updatedTask.date = date 
  updatedTask.content = content 
  return res.json(updatedTask)
})

// app.put('/todos/:id', async (req, res) => {
//   try {
//     const { content, date, destination } = req.body
//     const updatedTask = await todos('data')
//       .where({ id: req.params.id })
//       .update({ content, date, destination  })
//       .returning(['id', 'date', 'content', 'status', "destination"])

//     if (!updatedTask.length) {
//       res.status(400)
//       return res.json({ message: 'Ticket not found' })
//     }

//     res.status(200).json(updatedTask)
//   } catch (err) {
//     res.status(500).json({ message: 'Error updating ticket', error: err })
//   }
// })

module.exports = app;