const express = require('express')
const morgan = require('morgan')
const path = require('path')

const app = express()


app.use(express.static(path.join(__dirname, 'public')))
app.use(morgan('dev'))


app.get('*', (req, res, next) => {
	res.redirect('/#' + req.originalUrl);
})

app.listen(process.env.PORT || 3000, () => {
	console.log('Server listening on port 3000')
})