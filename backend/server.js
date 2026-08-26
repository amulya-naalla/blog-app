const exp=require('express')
const app=exp()
require('dotenv').config() //makes all variables from .env file available in process.env variable
const mongoose=require('mongoose')
const userApp = require('./APIs/userApi')
const adminApp = require('./APIs/adminAPi')
const authorApp = require('./APIs/authorApi')
const cors=require('cors')

app.use(cors())

const port=process.env.PORT || 4000

//DB connection
mongoose.connect(process.env.DBURL)
.then(()=>{
   app.listen(port,()=>console.log(`server on port ${port}`)) 
   console.log('DB connection success')
})
.catch(err=>console.log('Error in DB connection ',err))

app.use(exp.json())

//connect API routes
app.use("/user-api",userApp)
app.use("/admin-api",adminApp)
app.use("/author-api",authorApp)