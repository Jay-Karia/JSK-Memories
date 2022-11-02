const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const mongoose = require('mongoose')
const dotenv = require('dotenv')

const postRoutes = require('./Routes/routes')

const app = express()

dotenv.config()

app.use(bodyParser.json({ limit: '30mb', extended: true }))
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }))
app.use(cors())

// Connecting to Database
const dbURI = process.env.dbURI
const port = process.env.PORT

mongoose.connect(dbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log('Database connected')
})

app.use('/posts', postRoutes)

// Listening to the server
app.listen(port, (req, res) => {
    console.log('Server started on port: ' + port)
})