const express = require('express')
const router = express.Router()
const User = require('../models/User')
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')
const JWT_SECRET = 'ShreyIsAwesome'
const fetchuser = require('../middleware/fetchuser')

// ROUTE:1 Create a user using POST : /api/auth/createuser 
router.post('/createuser',
    body('name','Please enter a valid name').isLength({ min: 2 }),
    body('email','Please enter a valid email').isEmail(),
    body('password').isLength({ min: 5 }),
    async (req,res)=>{
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
            }
            // use let here or otherwise you wont be able to asign new user
            let user = await User.findOne({"email":req.body.email})
            if(user){
                return res.status(400).send({success:false,error:"This email already exists"})
            }
            // Using bcryptjs to generate salt and hash for password

            const salt = await bcrypt.genSalt(10);
            const secretPass = await bcrypt.hash(req.body.password,salt); 
            console.log(secretPass)

            /* There are two ways to create a user */
            // Method:1
                // user = await new User(req.body)
                // const createuser = await user.save()
                // res.status(201).send(createuser)
            
            // Method:2
                user = await User.create({
                    name:req.body.name,
                    email:req.body.email,
                    password:secretPass,
                })

                // Creating an authentication token
                const data = {
                    user:{
                        id:user._id
                    }
                }
                const authtoken = jwt.sign(data,JWT_SECRET)
                console.log(data,authtoken)

                const createuser = await user.save()
                res.status(201).send({success:true,authtoken:authtoken})

        } catch (error) {
            res.status(400).send('Internal error occured',error)
        }
})

// ROUTE:2 Create a user authentication using POST : /api/auth/login 
router.post('/login',
    body('email','Please enter a valid email').isEmail(),
    body('password','Please enter the password').exists(),
    async(req,res)=>{
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
            }
            const {email,password} = req.body
            let user = await User.findOne({email})
            if(!user){
                return res.status(400).send({success:false,error:"Please enter the correct credentials"})
            }

            const passwordCompare = await bcrypt.compare(password,user.password)
            if(passwordCompare){
                const data = {
                    user:{
                        id:user._id
                    }
                }
                const authtoken = jwt.sign(data,JWT_SECRET)
                console.log(data,authtoken)
                res.status(201).send({success:true,authtoken:authtoken})
            }
            else{
                return res.status(400).send({success:false,error:"Please enter the correct credentials"})
            }
        } catch (error) {
            res.status(400).send('Internal error occured',error)
        }
    })

    // ROUTE:3 Get the user from json auth token using POST : /api/auth/getuser
    router.post('/getuser',fetchuser,async(req,res)=>{
        try {
            userId = req.user.id
            const user = await User.findById(userId).select('-password')
            res.send(user)
        } catch (error) {
            console.log(error)
            res.status(400).send({error})
        }
    })

module.exports = router 