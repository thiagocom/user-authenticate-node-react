const jwt = require("jsonwebtoken")

const authenticate = async (req, res, next) => {
	const authorization = req.get("Authorization")
	if (authorization) {
		try {
			const decoded = await jwt.verify(authorization, process.env.SECRET_KEY)	
			next()
		} catch (err) {
			err.statusCode = 401
			next(err)
		}
	} else {
		const err = new Error("NOT AUTHORIZATED")
		err.statusCode = 401
		next(err)
	}
}

module.exports = { authenticate }