const bcrypt = require("bcrypt")
const { Schema, model } = require("mongoose")

const UserSchema = new Schema({
	username: {
		type: String,
		required: true,
		unique: true
	},
	password: {
		type: String,
		select: false
	}
})

// Method for compare password and hash
UserSchema.methods.compare = async function(password) {
	const res = await bcrypt.compare(password, this.password)
	return res
}

// Middleware before save model
UserSchema.pre("save", async function(next) {
	if (this.isNew || this.isModified("password")) {
		try {
			const hash = await bcrypt.hash(this.password, 10)
			this.password = hash
			next()
		} catch (err) {
			next(err)
		}
	} else {
		next()
	}
})

module.exports = model("Users", UserSchema)