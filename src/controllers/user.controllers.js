const User = require("../models/user.models")
const { generate } = require("./utils")

class UserController {

	static async register(req, res) {
		const { username, password } = req.body
		if (!username || !password) {
			res.json({ success: false, message: "username and password is required" })
		}
		if (await User.findOne({ username })) {
			res.json({ success: false, message: "username already in use" })
		}
		const user = await User.create({ username, password })
		const token = await generate(user._id)
		res.json({ success: true, token })
	}

}

module.exports = UserController