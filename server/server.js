const mongoose = require('mongoose')
const express = require('express')
const app = express()

const cookieParser = require('cookie-parser')
const cors = require('cors')
// const session = require('express-session')
// const mongoDBSession = require('connect-mongodb-session')(session)

//ENV
require('dotenv').config({ path: ".env" })

//middleware
app.use(cors({
    credentials: true,
    origin: "http://localhost:3000"
}))
app.use(cookieParser())
app.use(express.json())

//PORT
const PORT = process.env.PORT || 8080
app.listen(PORT, console.log(`Server running on http://localhost:${PORT} `))

//connecting to database
mongoose.connect(
    process.env.DB_CONNECTION
).then(() => console.log('Connected to Database'))
 .catch((err) => console.log(err))

//SESSION
// const store = new mongoDBSession({
//     uri: process.env.DB_CONNECTION,
//     collection: "mySession"
// })

// app.use(session({
//     secret: 'secret-key',
//     resave: false,
//     saveUninitialized: false,
//     store: store 
// }))

//routes
app.use('/api', require('./routes/router'))


