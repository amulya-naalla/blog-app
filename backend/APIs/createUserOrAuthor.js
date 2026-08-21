const UserAuthor=require('../models/userAuthorModel')

async function createUserOrAuthor(req,res){
    const newUserAuthor=req.body
    const userInDb=await UserAuthor.findOne({email:newUserAuthor.email})
    if(userInDb!=null){
        if(userInDb.role==newUserAuthor.role) res.status(200).send({message:newUserAuthor.role,payload:userInDb})
        else res.status(200).send({message:"Invalid role"})
    }else{
        const newUserAuthorDoc=new UserAuthor(newUserAuthor)
        await newUserAuthorDoc.save()
        res.status(201).send({message:newUserAuthorDoc.role,payload:newUserAuthorDoc})
    }
}

module.exports=createUserOrAuthor