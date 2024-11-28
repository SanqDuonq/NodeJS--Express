const mongoose = require('mongoose')
const schema = mongoose.Schema();


const userSchema = new Schema({
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

module.exports = mongoose.model('User',userSchema)