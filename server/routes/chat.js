const express = require("express");
const ChatController = require("../controllers/ChatController");
const auth = require("../middleware/auth");

const router = express.Router();

router.get('/getChat', auth, ChatController.getChat);

module.exports = router;
