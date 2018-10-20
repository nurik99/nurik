const mongoose = require('mongoose')

const BasketsSchema = mongoose.Schema({
	author: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User"
	},
	post: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "AdvAll"
	},
	adv_name: String,
	new_price: String,
	link: String,
	data:{
		type: Date,
		default: Date.now
	}
})

module.exports = mongoose.model('Basket', BasketsSchema)//Post нозвания таблицы

