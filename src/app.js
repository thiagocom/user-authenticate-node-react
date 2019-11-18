const express = require("express")
const logger = require("morgan")
const rfs = require("rotating-file-stream")
const cors = require("cors")
const mongoose = require("mongoose")
require("dotenv").config()

const userRoutes = require("./routes/user.routes")
const { authenticate } = require("./middlewares")

// App
const app = express()

// Configuration
app.set("port", process.env.PORT || 8000)

// Middlewares
if (process.env.NODE_ENV == "production") {
	const accessLogStream = rfs("app.log", {
		size: "10M",
		interval: "1d"
	})
	app.use(logger("combined", { stream: accessLogStream }))
} else {
	app.use(logger("dev"))
}
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cors())

// Routes
app.use(userRoutes)

mongoose.set("useNewUrlParser", true)
mongoose.set("useUnifiedTopology", true)
mongoose.set("useCreateIndex", true)
mongoose.connect(process.env.CONNECT_STRING)
const { connection } = mongoose
connection.on("error", err => console.error(err))

// Endpoint protect
app.get("/", authenticate, async (req, res) => {
	res.send("Welcome to development world")
})

// Catch-all
app.get("*", async (req, res, next) => {
	const err = new Error("endpoint not exist")
	err.statusCode = 404
	next(err)
})

// Error handler
app.use(async (err, req, res, next) => {
	const statusCode = err.statusCode || 500
	res.status(statusCode).json({ success: false, error: err.message })
})

module.exports = app
