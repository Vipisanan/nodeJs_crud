const express = require('express')
const mongoose = require('mongoose')
const url = 'mongodb://localhost/AlineDB'


const app =express()

mongoose.connect(url , {useNewUrlParser: true})
const con = mongoose.connection

con.on('open' , ()=>{
    console.log("connected....");
})
//tell to node hey im using json for add data
app.use(express.json())

const aliensRouter = require('./routers/aliens')
app.use('/aliens',aliensRouter)

const userRouter = require('./routers/user')
app.use('/user',userRouter);

app.listen(9000 , ()=>{
    console.log("Server started")
})
