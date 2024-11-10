const express = require('express');
const userRouter = require('./routes/userRoutes')
const dotenv = require('dotenv')
const app = express();
const connectToDB =require('./config/db')

dotenv.config();

connectToDB();


app.set('view engine', 'ejs');
app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use('/user',userRouter)

app.listen(3000,()=>{
    console.log('server is running')
})