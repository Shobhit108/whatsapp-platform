const express = require('express');
const router = express.Router();

const {
  createConversation,
  getConversations,
  getConversation,
  deleteConversation
} = require('../controllers/conversationController');

router.post('/', createConversation);
router.get('/', getConversations);
router.get('/:id', getConversation);
router.delete('/:id', deleteConversation);

module.exports = router;