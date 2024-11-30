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
        const isCreate = await User.create({
            username: email,
            password
        })
        return res.json({
            status: 'Successful',
            data: isCreate
        })
    } catch (error) {
        next(error)
    }

})
router.post('/refresh-token', (req,res,next) => {
    res.send('refresh-token route')
})
router.post('/login', (req,res,next) => {
    res.send('login route')
})
router.post('/logout', (req,res,next) => {
    res.send('logout route')
})


module.exports = router