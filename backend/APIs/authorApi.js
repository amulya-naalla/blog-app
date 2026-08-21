const exp=require('express')
const authorApp=exp.Router()
const expressAsyncHandler=require('express-async-handler')
const createUserOrAuthor=require('./createUserOrAuthor')
const Article=require('../models/articleModel')

authorApp.post("/author",expressAsyncHandler(createUserOrAuthor))

authorApp.post("/article",expressAsyncHandler(async(req,res)=>{
    const newArticleObj=req.body
    const artDoc=new Article(newArticleObj)
    const savedArt=await artDoc.save()
    res.status(201).send({message:"article created",payload:artDoc})
}))

authorApp.get("/articles",expressAsyncHandler(async(req,res)=>{
    const artList=await Article.find({isArticleActive:true})
    res.status(200).send({message:"articles",payload:artList})
}))

authorApp.put("/article/:articleId",expressAsyncHandler(async(req,res)=>{
    const modifiedArt=req.body
    const dbRes=await Article.findByIdAndUpdate(modifiedArt._id,{...modifiedArt},{returnDocument:'after'})
    res.status(200).send({message:"article modified",payload:dbRes})
}))

authorApp.put("/articles/:articleId",expressAsyncHandler(async(req,res)=>{
    const deletedArt=req.body
    const dbRes=await Article.findByIdAndUpdate(deletedArt._id,{...deletedArt},{returnDocument:'after'})
    res.status(200).send({message:"article deleted",payload:dbRes})
}))

module.exports=authorApp