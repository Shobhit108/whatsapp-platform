const express = require('express');
const router = express.Router();

const {
  createMessage,
  getMessages,
  getConversationMessages
} = require('../controllers/messageController');

router.post('/', createMessage);
router.get('/', getMessages);

// messages by conversation
router.get(
  "/conversation/:id",
  getConversationMessages
);

module.exports = router;