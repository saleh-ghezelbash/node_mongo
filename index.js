const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const Todo = require('./models/todo')

mongoose.connect('mongodb://localhost/todo')

const app = express()

app.use(bodyParser.json())

app.get('/api/get', async (req, res) => {
	const records = await Todo.find({})
	res.json(records)
})

app.post('/api/create', async (req, res) => {
	const text = req.body

	const response = await Todo.create(text)

	res.json({ status: 'ok', data: response})
})

app.post('/api/edit', async (req, res) => {
	const { id, text } = req.body

	const response = await Todo.updateOne(
		{
			_id: id
		},
		{
			$set: {
				text: text
			}
		}
	)

	res.json({ status: 'ok' })
})

app.delete('/api/delete', async (req, res) => {
	const { id } = req.body

	await Todo.deleteOne({ _id:id })

	res.json({ status: 'ok' })
})

app.listen(3000,() => {
	console.log('Server running...')
})