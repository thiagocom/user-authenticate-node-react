const { Router } = require("express")
const UserController = require("../controllers/user.controllers")
const { authenticate } = require("../middlewares")

const router = Router()

router.post("/register", UserController.register)
router.post("/login", UserController.login)
router.get("/authenticate", authenticate, UserController.authenticate)

module.exports = router