const Message = require('../models/Message');
const Conversation = require('../models/conversationModel');
// Create message
exports.createMessage = async (req, res) => {
  try {
    const message =
      await Message.create(req.body);

    // update conversation
    await Conversation.findByIdAndUpdate(
      req.body.conversation,
      {
        lastMessage: req.body.body,
        lastMessageAt: new Date()
      }
    );

    res.status(201).json(message);
  } catch (err) {
    res.status(400).json({
      error: err.message
    });
  }
};

// Get all messages
exports.getMessages = async (req, res) => {
  try {
    const messages =
      await Message.find()
        .populate('contact')
        .populate('conversation')
        .sort({ createdAt: 1 });

    res.json(messages);
  } catch (err) {
    res.status(500).json({
      error: err.message
    });
  }
};

// Get messages by conversation
exports.getConversationMessages =
  async (req, res) => {
    try {
      const messages =
        await Message.find({
          conversation: req.params.id
        }).sort({ createdAt: 1 });

      res.json(messages);
    } catch (err) {
      res.status(500).json({
        error: err.message
      });
    }
  };