const express = require('express')
const router = express.Router()
const redis = require('redis')

const Post = require('../models/AdvAll')
const Comment = require('../models/Comment')


const client = redis.createClient()

client.on('error', (err)=>console.log(`Error: ${err}`))

router.post('/:id', (req, res, next)=>{
	Post.findById(req.params.id).exec((err, post)=>{
		if(err) return res.send(err)
		var comment = new Comment({
			text: req.body.text,
			author: req.user,
			link: req.body.link,
			author_name: req.user.name,
			post: post,
			post: post._id
		})
	console.log(comment);

		comment.save((err, comment) =>{
			if(err) return res.send(err)
			post.comments = post.comments || [];
			post.comments.push(comment)
			post.save((err, post)=>{
				if (err) return res.send(err)
				res.send(comment)
			})
		})
	})
})

router.delete('/:comment_id/:post_id', (req, res, next)=>{
	Comment.deleteOne({_id: req.params.comment_id})
	.exec((err, result)=>{
		if(err) return res.send(err)
		Post.findById(req.params.post_id)
			.exec((err,post)=>{
				if(err)return res.send(err)
				post.comments = post.comments.filter((comment)=>comment != req.params.comment_id)
				post.save((err,result)=>{
					if(err) return res.send(err)
					res.send(200)
				})
			})
	})
})


router.put('/:id',(req,res,next)=>{
	Comment.findById(req.params._id).exec((err, post)=>{
		if(err){ 
			res.status(500).send(err);
		}else{
			post.text = req.body.text;
			post.save((err, result)=>{
				if(err){
					res.status(500).send(err);
				}else{
					client.set(req.params._id, JSON.stringify(post), redis.print)
					res.status(200).send(result);
				}
			});
		}
	})
})

module.exports = router