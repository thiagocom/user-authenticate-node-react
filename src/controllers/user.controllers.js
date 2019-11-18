const User = require("../models/user.models")
const { generate, validate } = require("../utils")

class UserController {

	static async authenticate(req, res, next) {
		res.json({ success: true })
	}

	static async register(req, res, next) {
		const { username, password } = req.body
		const valid =  await validate(username, password)
		if (!valid.success) {
			return res.json(valid)
		}
		if (await User.findOne({ username })) {
			return next(new Error("USERNAME ALREADY IN USE"))
		}
		const user = await User.create({ username, password })
		const token = await generate(user._id)
		res.json({ success: true, token })
	}

	static async login(req, res, next) {
		const { username, password } = req.body
		const valid = await validate(username, password)
		if (!valid.success) {
			return res.json(valid)
		}
		const user = await User.findOne({ username }).select("+password")
		if (user && await user.compare(password)) {
			const token = await generate(user._id)
			return res.json({ success: true, message: "LOGIN SUCCESSFULLY", token })
		}
		next(new Error("USERNAME OR PASSWORD INVALID"))
	}

}

module.exports = UserController