const express = require('express');

const router = express.Router();
const {body,validationResult}= require('express-validator');
const userModel =require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')



router.get('/register',(req,res)=>{
    res.render('register');
})

router.post('/register',
    body('username').trim().isLength({min:1}),
    body('email').trim().isEmail(),
    body('password').trim().isLength({min:5}),
    
    
    
     async (req,res)=>{

        const errors = validationResult(req);
        if (!errors.isEmpty()){
            return res.status(400).json({
                errors:errors.array(),
                message:'Invalid data'
            })
        }
        const {username,email,password}=req.body;
        const hashpassword = await bcrypt.hash(password,10)

        const newUser =await userModel.create({
            email,
            password:hashpassword,
            username
        })
        res.json(newUser)
  
})
router.get('/login',(req,res)=>{
    res.render('login');
})


   router.post('/login',
    body('username').trim().isLength({min:2}),
    body('password').trim().isLength({min:5}),

    
    
     async(req,res)=>{
     const errors = validationResult(req);     
       if(!errors.isEmpty()){
        return res.status(400).json({
            error:errors.array(),
            message:'invalid data',
        })
       }
       const {username,password}=req.body;
       const user = await userModel.findOne({
        username:username
       })
       if(!user){
        return res.status(400).json({
            message:'username or password is incorrect'
        })
       }
       const isMatch = await bcrypt.compare(password,user.password)
       if (!isMatch){
        return res.status(400).json({
            message:'username or password is incorrect',
        })
       }
     const token = jwt.sign({
        userId:user._id,
        email:user.email,
        username:user.username,
     }, process.env.JWT_SECRET,
    );
      res.json({
        token
      })
    }
)

module.exports = router;