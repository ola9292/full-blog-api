import express from "express"
import { checkLogin, register, showRegister, login, logout } from "../controllers/authController.js"
const router = express.Router()

router.post('/register', register)
router.post('/login', checkLogin)
router.post('/logout', logout)


export default router