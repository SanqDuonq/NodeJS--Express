const express = require('express')
const router = express.Router();
const createError = require('http-errors')
const User = require('../models/user.model')
const userValidate = require('../helpers/validate')

router.post('/register', async (req,res,next) => {
    try {
        const {email,password} = req.body
        const {error} = userValidate(req.body)
        console.log(`error validate`,error)
        if (error) {
            throw createError.BadRequest(error.details[0].message)
        }
        const isExits = await User.findOne({
            username: email
        })
        if (isExits) {
            throw createError.Conflict(`${email} is ready been register`);
        }
        
        const user = new User({
            username: email,
            password
        })

        const savedUser = await user.save();
        return res.json({
            status: 'Successful',
            data: savedUser
        })
    } catch (error) {
        next(error)
    }

})
router.post('/refresh-token', async (req,res,next) => {
    res.send('refresh-token route')
})
router.post('/login', async (req,res,next) => {
    try {
        const {email,password} = req.body
        const {error} = userValidate(req.body)
        if (error) {
            throw createError(error.details[0].message)
        }
        const user = await User.findOne({username: email})
        if(!user){
            console.log('User not found:', email);
            throw createError.NotFound('User not register')
        }
        const isValid = await user.isCheckPassword(password)
        if (!isValid){
            throw createError.Unauthorized()
        }
        res.send(user)
    } catch (error) {
        next(error)
    }
})
router.post('/logout', (req,res,next) => {
    res.send('logout route')
})


module.exports = router