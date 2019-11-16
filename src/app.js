const express = require("express")
const logger = require("morgan")
const rfs = require("rotating-file-stream")
const cors = require("cors")
require("dotenv").config()

const userRoutes = require("./routes/user.routes")

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

// Endpoint protect
app.get("/", async (req, res) => {
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
	res.status(statusCode).json({ error: err.message })
})

module.exports = app
