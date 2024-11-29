const mongoose = require('mongoose')
const schema = mongoose.Schema();

const {testConnect,userConnection} = require('../helpers/connect-multi')

const testSchema = new Schema({
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

module.exports = {
    test: testConnect.model('test', testSchema),
    user: userConnection.model('user',userSchema)
}