const express = require("express");
const AuthController = require("../controllers/AuthController");
const auth = require("../middleware/auth");
const validateRegister = require("../validations/ValidRegister");
const validateLogin = require("../validations/ValidLogin");


const router = express.Router();

router.post('/register', validateRegister, AuthController.register);
router.post('/login', validateLogin, AuthController.login);
router.get('/me', auth, AuthController.me);
router.post('/logout', auth, AuthController.logout);

module.exports = router;
