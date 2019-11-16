const { Router } = require("express")
const UserController = require("../controllers/user.controllers")

const router = Router()

router.post("/register", UserController.register)

module.exports = router