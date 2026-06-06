const express = require('express');
const router = express.Router();

const {
  chatReply
} = require('../controllers/chatController');

router.post('/reply', chatReply);

module.exports = router;