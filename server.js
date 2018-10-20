const express = require('express')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const cookieParser = require('cookie-parser')
const mongoose = require('mongoose')
const path = require('path')
const session = require('express-session')
const MongoStore = require('connect-mongo')(session)
const redis = require('redis')


mongoose.connect('mongodb://localhost/nurik', ({useNewUrlParser: true}))

const app = express()


app.use(express.static(path.join(__dirname, 'public')))
app.use(bodyParser.urlencoded({exdended:true}))
app.use(bodyParser.json({limit:'5mb'}))
app.use(cookieParser())
app.use(morgan('dev'))
app.use(session({
	resave: true,
	secret:'secret',
	saveUninitialized: true,
	key: 'key',
	store: new MongoStore({mongooseConnection: mongoose.connection})
}));
app.use('/api', require('./server/routes'))

app.get('*', (req,res,next)=>{
	res.redirect('/#' + req.originalUrl);
})

//function
app.listen(3000, ()=>{
	console.log('server listening on port 3000')
})





