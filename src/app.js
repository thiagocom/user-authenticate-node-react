const express = require("express")
const logger = require("morgan")
const rfs = require("rotating-file-stream")
const cors = require("cors")
require("dotenv").config()

const userRoutes = require("./routes/user.routes")

const app = express()
app.set("port", process.env.PORT || 8000)

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

app.use(userRoutes)

app.get("/", async (req, res) => {
	res.send("Welcome to development world")
})

module.exports = app
