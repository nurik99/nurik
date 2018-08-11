const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const path = require('path')


app.use(express.static(path.join(__dirname, 'public')))
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json({limit: '20mb'}))

app.get('*', (req, res, next) => {
	res.redirect('/#' + req.originalUrl);
}) 
app.listen(3000, () => {
	console.log('Server started on port 3000');
})