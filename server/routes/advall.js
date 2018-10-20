const express = require('express')
const multer  = require('multer')
const fs = require('fs')
const path = require('path')
const upload = multer({ dest: 'uploads/' })
const redis = require('redis')
const router = express.Router()
const asyncMiddleware = require('../async')
const passport = require('passport')


const client = redis.createClient()

const asyncMiddleWare = require('../async')

client.on('error', (err) => console.log(`Error: ${err}`))

const AdvAll = require('../models/AdvAll')
const Comment = require('../models/Comment')
const Avatar = require('../models/Avatar')
const Users = require('../models/User')
const SliderDb = require('../models/Slider')


//регулярные выражения

router.get('/', (req,res,next)=>{
	var a = parseInt(req.query.a)
	AdvAll.find().skip(0).limit(a).exec((err, p)=>{
		if(err)return res.send(err);
		res.send(p);
	})
})

router.get('/', (req,res,next)=>{
	AdvAll.find().exec((e, p)=>{
		if(e)return res.send(e);
		res.send(p);
	})
})

router.get('/swiper', (req,res,next)=>{
	SliderDb.find().exec((e, p)=>{
		if(e)return res.send(e);
		res.send(p);
	})
})
router.get('/sliderGet', (req,res,next)=>{
	SliderDb.find().exec((e, p)=>{
		if(e)return res.send(e);
		res.send(p);
	})
})

router.get('/avaGet', (req,res,next)=>{
	var d = req._passport.session.user;
	console.log(d);
	Avatar.find({"author": d}).exec((err, p)=>{
		if(err)return res.send(err);
		res.send(p);
	})
})

router.get('/:id',(req,res,next)=>{
	client.get(req.params.id, (err, post)=>{
		if(err) return res.send(err)
		if(post){
			res.send(JSON.parse(post))
			console.log("mongo");
		}else{
			AdvAll.findById(req.params.id).populate('comments')
			.exec((err,post)=>{
				if(err)return res.send(err)
				client.get(req.params.id, JSON.stringify(post), redis.print)
				console.log("redis");
				res.send(post)
			})
		}
	})		
})

router.get('/search/:search_text', asyncMiddleWare(async(req, res, next) => {
	const myRegExp = new RegExp(`${req.params.search_text}`, 'i')
	
	let result = await AdvAll.find({
		$or: [
			{adv_name: myRegExp},
			{adv_conditions: myRegExp}
		]
	}).limit(5).exec()

	res.send(result)
	
}))

router.post('/', upload.single('myFile'), (req, res, next) => {
	var post = new AdvAll({
		author: req.user,
		city: req.body.city,
		adv_name: req.body.adv_name,
		categorya: req.body.categorya,
      	adv_date: req.body.adv_date,
		adv_conditions: req.body.adv_conditions,
		adv_description: req.body.adv_description,
		old_price: req.body.old_price,
		discount: req.body.discount,
		new_price: req.body.new_price,
	})

	console.log(post);

	// post.save((err, post)=>{
	// 		if(err) res.send(err)
	// 		res.send(post)
	// 	})

	console.log(req.file);
	let tempPath = req.file.path;
	let targetPath = path.resolve(`public/uploads/${post._id}.${req.file.originalname.split('.').pop()}`)
	console.log("targetPath=" + targetPath);

	fs.rename(tempPath,targetPath, (err)=>{
		if(err)return res.send(err)
		post.link = `/uploads/${post._id}.${req.file.originalname.split('.').pop()}`
		post.save((err,post)=>{
		if(err)return res.send(err)
		res.send(post)
		})
	})
})
router.post('/ava', upload.single('avaFile'), (req, res, next) => {
	var post = new Avatar({
		author: req.user,
	})

	console.log(post);
	console.log(req.file);
	let tempPath = req.file.path;
	let targetPath = path.resolve(`public/uploads/${post._id}.${req.file.originalname.split('.').pop()}`)
	console.log("targetPath=" + targetPath);

	fs.rename(tempPath,targetPath, (err)=>{
		if(err)return res.send(err)
		post.link = `/uploads/${post._id}.${req.file.originalname.split('.').pop()}`
		post.save((err,post)=>{
		if(err)return res.send(err)
		res.send(post)
		})
	})
})

router.post('/slider', upload.single('sliderFile'), (req, res, next) => {
	var post = new SliderDb({
		title: req.body.title,
		desc: req.body.desc,
		link: req.body.link
	})

	console.log(post);
	console.log(req.file);
	let tempPath = req.file.path;
	let targetPath = path.resolve(`public/uploads/${post._id}.${req.file.originalname.split('.').pop()}`)
	console.log("targetPath=" + targetPath);

	fs.rename(tempPath,targetPath, (err)=>{
		if(err)return res.send(err)
		post.linkFile = `/uploads/${post._id}.${req.file.originalname.split('.').pop()}`
		post.save((err,post)=>{
		if(err)return res.send(err)
		res.send(post)
		console.log(post);
		})
	})
})

router.put('/', (req,res,next)=>{
	var id = req._passport.session.user;
	console.log(id);
	Users.findById(id).exec((err, user) => {
		if(err) return res.send(err)
		else {
			user.name = req.body.name;
			user.password = req.body.password;
			user.save((err, comment) => {
				if(err) return res.send(err)
				res.cookie('session', JSON.stringify(comment))
				res.send(comment)	
			})
		}
	});
})

	router.delete('/deleteSlide',(req,res,next)=>{
	var a = req.query.sl;
	console.log(a);
	SliderDb.remove({_id: a})
	.exec((err,result)=>{
		if(err) return res.send(err)
		res.send(result)
	})
	})

	router.delete('/:id',(req,res,next)=>{
	AdvAll.remove({_id: req.params.id})
	.exec((err,result)=>{
		if(err) return res.send(err)
		res.send(result)
	})

})


module.exports = router