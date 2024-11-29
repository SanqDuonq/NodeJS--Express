const mongoose = require('mongoose')

const connect = mongoose.createConnection('mongodb://localhost:27017/test')
connect.on('connected',function() {
    console.log(`MongoDB::: connected::: ${this.name}`)
})
 
connect.on('disconnected',function() {
    console.log(`MongoDB::: disconnected::: ${this.name}`)
})

connect.on('error', function(err) {
    console.log(`MongoDB::: error::: ${JSON.stringify(err)}`)
})

process.on('SIGINT', async () => {
    await connect.close();
    process.exit(0);
})

module.exports = connect;