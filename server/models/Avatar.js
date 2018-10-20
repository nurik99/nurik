const mongoose = require('mongoose')

const AvatarSchema = mongoose.Schema({
	author: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User"
	},
	link: String
})

module.exports = mongoose.model('Avatar', AvatarSchema)