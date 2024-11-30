const mongoose = require('mongoose')
require('dotenv').config();
function newConnection(uri) {
    const connectDB = mongoose.createConnection(uri)

    connectDB.on('connected',function() {
        console.log(`MongoDB::: connected::: ${this.name}`)
    })

    connectDB.on('disconnected',function() {
        console.log(`MongoDB::: disconnected::: ${this.name}`)
    })

    connectDB.on('error',function() {
        console.log(`MongoDB::: error::: ${this.name}`)
    })

    return connectDB;
}


const testConnection = newConnection(process.env.URI_MONGODB_TEST)
const userConnection = newConnection(process.env.URI_MONGODB_USER)

module.exports = {
    testConnection,
    userConnection
}
