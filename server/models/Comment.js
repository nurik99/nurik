const mongoose = require('mongoose')

const CommentSchema = mongoose.Schema({
	text: String,
	author: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User'
	},
	post: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Post'
	},
	author_name: String,
	date: {
		type: Date,
		default: Date.now
	}
})

module.exports = mongoose.model('Comment', CommentSchema)

