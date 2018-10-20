const mongoose = require('mongoose')

const AdvAllSchema = mongoose.Schema({
	author: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User"
	},
	city: String,
	adv_name: String,
	categorya: String,
	adv_date: {
		type: Date
	},
	adv_conditions: String,
	adv_description: String,
	old_price: String,
	discount: String,
	new_price: String,
	link: String,
	comments: [{
		type: mongoose.Schema.Types.ObjectId,
		ref: "Comment"
	}]
})

module.exports = mongoose.model('Advall', AdvAllSchema)