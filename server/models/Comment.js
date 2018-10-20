const mongoose = require('mongoose')

const CommentsSchema = mongoose.Schema({
	text: String,
	author: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User"
	},
	post: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "AdvAll"
	},
	link: String,
	author_name: String,
	data:{
		type: Date,
		default: Date.now
	}
})

module.exports = mongoose.model('Comment', CommentsSchema)//Post нозвания таблицы

