const express = require('express')
const router = express.Router()
const User = require("../models/User")
const { body, validationResult } = require('express-validator');
const bcrypt = require("bcryptjs")
const jwt = require('jsonwebtoken')
const fetchuser = require("../middleware/fetchuser")
const JWT_SECRET ='CHIRAGISGOODBOY!@#$%'

// Route:1 // Create a user using: POST end "/api/auth/createuser". No login required
router.post('/createuser',[
    body('email','Enter the valid Email').isEmail().normalizeEmail(),
    body('name','Enter the valid name').isLength({min:3}),
    body('password','Password must have  6 charcter').isLength({min:6})
], async(req,res)=>{
    // If there are error return bad request and error
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        success=false
      return res.status(400).json({ success,errors: errors.array() });
    }
    // Check user with same email exists
    try {
    let user= await User.findOne({email:req.body.email})
    if(user){
        success=false
        return res.status(400).json({ success,error:'Sorry this email already exits'})
    }

    const salt = await  bcrypt.genSalt(10);
    const secPass = await bcrypt.hash(req.body.password,salt)
    // Create a new user
    user =await User.create({
        name: req.body.name,
        email: req.body.email,
        password: secPass,
      })
      const data={
        user:{
            id:user.id
        }
      }
    const authtoken= jwt.sign(data,JWT_SECRET)
    success=true
    res.json({success,authtoken})
    } catch (error) {
        console.log(error.message)
        success=false
        res.status(500).send({success,error:'Intenal server error'})
    }
})

// Route:2 // Authrenticate the useing: POST "/api/auth/login" ,NO login require
router.post('/login',[
    body('email','Enter the valid Email').isEmail().normalizeEmail(),
    body('password','Password cannot be Empty!').exists(),
], async(req,res)=>{
    // If there are error return bad request and error
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        success=false
      return res.status(400).json({ success,errors: errors.array() });
    }
    const{email,password}= req.body;
    try {
        let user = await User.findOne({email})
        if(!user){
            success=false
            return res.status(400).json({success,error:"Invalid Credentails"})
        }
        const passwordcompare = await bcrypt.compare(password,user.password);
        if(!passwordcompare){
            success=false
            return res.status(400).json({success,error:"Invalid Credentails"})
        }
        const payload={
            user:{
                id:user.id
            }
        }
        const authtoken= jwt.sign(payload,JWT_SECRET)
        success=true
        res.json({success,authtoken})
    } catch (error) {
        console.log(error.message)
        success= false
        res.status(500).send({success,error:'Intenal server error'})
    }
})

// Route:3 Get logged user details require login using POST req.
router.post('/getuser',fetchuser,async(req,res)=>{

    try {
        const userId = req.user.id
        const user = await User.findById(userId).select("-password")
        res.send({user})
    } catch (error) {
        console.log(error.message)
        success=false
        res.status(500).send({success,error:'Intenal server error'})
}
})
module.exports = router