const mongoose = require('mongoose')

const TodoSchema = new mongoose.Schema({
	text: { 
        type: String, 
        required: true 
    },
	date: {
        type : Date,
		default: Date.now
	}
})

const model = mongoose.model('TodoModel', TodoSchema)

module.exports = model