const express = require('express') 
const dotenv = require('dotenv')
const createError = require('http-errors')
const userRoute = require('./routes/user.route')
require('./helpers/connect-mongo')
dotenv.config();
const app = express();


app.get('/',(req,res,next) => {
    res.send('Home Page')
})

app.use('/api/user',userRoute)

app.use((req,res,next) => {
   next(createError.NotFound('This router does not exist'))
})
 
app.use((err,req,res,next) => {
    res.json({
        status: err.status,
        message: err.message
    })
})
const PORT = process.env.PORT || 3001

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})