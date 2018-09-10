const express = require('express')
const morgan = require('morgan')
const path = require('path')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const session = require('express-session')
const MongoStore = require('connect-mongo')(session);
const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/nurik', ({useNewUrlParser: true}));

const app = express()

app.use(express.static(path.join(__dirname, 'public')))
app.use(morgan('dev'))
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json({limit: '10mb'}))
app.use(cookieParser())
app.use(session({
	resave: true,
	secret: 'secret',
	saveUninitialized: true,
	key: 'key',
	store: new MongoStore({mongooseConnection: mongoose.connection})
}))

app.use('/api', require('./server/routes'))

app.get('*', (req, res, next) => {
	res.redirect('/#' + req.originalUrl);
})

app.listen(process.env.PORT || 3015, () => {
	console.log('Server listening on port 3015')
})