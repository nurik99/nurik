const express = require('express')
const router = express.Router()
const redis = require('redis')

const Post = require('../models/AdvAll')
const Basket = require('../models/Basket')


const client = redis.createClient()

client.on('error', (err)=>console.log(`Error: ${err}`))

router.get('/', (req,res,next)=>{
	Basket.find().exec((e, p)=>{
		if(e)return res.send(e);
		res.send(p);
	})
})

router.post('/:id', (req, res, next)=>{
	Post.findById(req.params.id).exec((err, post)=>{
		if(err) return res.send(err)
		var basket = new Basket({
			author: req.user,
			post: post,
			post: post._id,
			adv_name: post.adv_name,
			new_price: post.new_price,
			link: post.link
		})
	console.log(basket);

		basket.save((err, basket) =>{
			if(err) return res.send(err)
			post.save((err, post)=>{
				if (err) return res.send(err)
				res.send(basket)
			})
		})
	})
})

router.delete('/:id', (req, res, next) => {
    Basket.remove({ _id: req.params.id })
        .exec((err, result) => {
            if (err) return res.send(err)
            res.send(result)
        })
})

module.exports = router