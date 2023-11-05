require("dotenv").config()
const express = require("express")
const userRouter = require("./server/Api/user.router")
const app = express()
const cors = require("cors")
const database = require("./server/config/database")
const port = process.env.PORT;

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use("/api/users", userRouter);

app.listen(port,(err)=>{
  if(err){
    console.log(err)
  }else{
    console.log(`server is running on port ${port}`)
  }

})