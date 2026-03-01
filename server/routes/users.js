const express = require("express");
const { user, loggedIn, allUsers } = require("../controllers/UserController");
const auth = require("../middleware/auth");

const router = express.Router();

router.get('/oneUser', auth, user);
router.get('/allUsers', auth, allUsers);
router.get('/loggedIn', auth, loggedIn);

module.exports = router;