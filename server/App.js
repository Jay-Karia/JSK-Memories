const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const mongoose = require('mongoose')
const dotenv = require('dotenv')

const postRoutes = require('./Routes/postRoutes')
const userRoutes = require('./Routes/userRoutes')

const app = express()

dotenv.config()

app.use(bodyParser.json({extended: true }))
app.use(bodyParser.urlencoded({extended: true }))

app.use(cors())

// Connecting to Database
const dbURI = process.env.dbURI
const port = process.env.PORT

mongoose.connect(dbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log('Database connected')
}).catch(err => {
    console.log('Could not connect to database')
    console.error(err)
})

app.use(express.static(__dirname+"/uploads"))

app.use('/', postRoutes)
app.use('/', userRoutes)

// Listening to the server
app.listen(port, (req, res) => {
    console.log('Server started on port: ' + port)
})