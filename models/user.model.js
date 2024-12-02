const mongoose = require('mongoose')
const schema = mongoose.Schema();
const bcrypt = require('bcrypt')
const userSchema = mongoose.Schema({
    username: {
        type: String,
        unique: true,
        required: true,
    },
    password: {
        type:String,
        required: true
    }
})

userSchema.pre('save', async function (next) {
    try {
        console.log('Called before save', this.username,this.password)
        const salt = await bcrypt.genSalt(10)
        const hashPassword = await bcrypt.hash(this.password,salt)
        this.password = hashPassword
        next();
    } catch (error) {
        next(error)
    }
})

userSchema.methods.isCheckPassword = async function (password) {
    try {
        return await bcrypt.compare(password,this.password)
    } catch (error) {
        
    }
}

module.exports = mongoose.model('user',userSchema)