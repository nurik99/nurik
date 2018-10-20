const mongoose = require('mongoose')

const SliderSchema = mongoose.Schema({
	title: String,
	desc: String,
	linkFile: String,
	link: String
})

module.exports = mongoose.model('Slider', SliderSchema)