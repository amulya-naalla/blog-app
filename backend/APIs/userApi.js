const exp=require('express')
const userApp=exp.Router()
const expressAsyncHandler=require('express-async-handler')
const createUserOrAuthor=require('./createUserOrAuthor')
const Article=require('../models/articleModel')

userApp.post("/user",expressAsyncHandler(createUserOrAuthor))

userApp.put("/comment/:articleId",expressAsyncHandler(async(req,res)=>{
    const commentObj=req.body;
    const artWithComment=await Article.findOneAndUpdate({articleId:req.params.articleId},{$push:{comments:commentObj}},{returnDocument:'after'})
    res.send({message:"comment added",payload:artWithComment})
}))

module.exports=userApp