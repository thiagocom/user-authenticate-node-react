const jwt = require("jsonwebtoken")
const yup = require("yup")

const generate = async (id) => {
	const token = await jwt.sign({ id }, process.env.SECRET_KEY, { expiresIn: "1h" })
	return token
}

const schema = yup.object().shape({
	username: yup.string().min(4).max(8).required(),
	password: yup.string().min(4).max(8).required()
})

const validate = async (username, password) => {
	try {
		const valid = await schema.validate({ username, password })
		return { success: valid }
	} catch (err) {
		return { success: false, errors: err.errors }
	}
}

module.exports = { generate, validate }