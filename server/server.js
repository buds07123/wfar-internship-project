const mongoose = require('mongoose')
const express = require('express')
const app = express()
const httpServer = require('http')
// const io = require('socket.io')(server)
const { Server } = require("socket.io");

const cookieParser = require('cookie-parser')
const cors = require('cors')

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
// app.listen(PORT, console.log(`Server running on http://localhost:${PORT} `))

//connecting to database
mongoose.connect(
    process.env.DB_CONNECTION
).then(() => console.log('Connected to Database'))
 .catch((err) => console.log(err))

//routes
app.use('/api', require('./routes/router'))

const server = httpServer.createServer(app)

//Socket IO
const io = new Server(server,{ 
    cors: {
        origin: ["http://localhost:3000"]
    }
});

const users = {}

io.on("connection", (socket) => {
    app.set("socket", socket);
    console.log("Socket connected.");

    // socket.on("send_message", (data) => {
    //     socket.broadcast.emit("receive_message", data)
    // })

    socket.on("emp_id", (data) => {
        socket.join(data)
    }) 
    
    socket.on("send_notif", (data) => {
        console.log(data.id)
        socket.to(data.id).emit("receive_notif",data)     
    })

});

server.listen(PORT)

