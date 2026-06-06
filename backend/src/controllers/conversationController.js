const Conversation = require('../models/conversationModel');

// Create conversation
exports.createConversation = async (req, res) => {
  try {
    const conversation =
      await Conversation.create(req.body);

    res.status(201).json(conversation);
  } catch (err) {
    res.status(400).json({
      error: err.message
    });
  }
};

// Get all conversations
exports.getConversations = async (req, res) => {
  try {
    const conversations =
      await Conversation.find()
        .populate('contact')
        .sort({ lastMessageAt: -1 });

    res.json(conversations);
  } catch (err) {
    res.status(500).json({
      error: err.message
    });
  }
};

// Get single conversation
exports.getConversation = async (req, res) => {
  try {
    const conversation =
      await Conversation.findById(req.params.id)
        .populate('contact');

    if (!conversation) {
      return res.status(404).json({
        error: 'Conversation not found'
      });
    }

    res.json(conversation);
  } catch (err) {
    res.status(500).json({
      error: err.message
    });
  }
};

// Delete conversation
exports.deleteConversation = async (req, res) => {
  try {
    const conversation =
      await Conversation.findByIdAndDelete(
        req.params.id
      );

    if (!conversation) {
      return res.status(404).json({
        error: 'Conversation not found'
      });
    }

    res.json({
      message:
        'Conversation deleted successfully'
    });
  } catch (err) {
    res.status(500).json({
      error: err.message
    });
  }
};