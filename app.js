require('dotenv').config()

const path = require('path')
const express = require('express')
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser')
const routes = require('./routes')

const port = 3001
const app = express()

app.use(express.static(path.resolve('..', 'build')))
app.use('/uploads', express.static(path.join(__dirname, 'uploads')))
app.use(cookieParser())
app.use(express.json())
app.use('/api', routes)

app.get('*', (req, res) => {
	res.sendFile(path.resolve('..', 'build', 'index.html'))
})

mongoose.connect(process.env.DB_URL).then(() => {
	app.listen(port, () => {
		console.log(`Server started on port ${port}`)
	})
})
