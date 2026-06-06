const Message = require('../models/Message');
const Conversation = require('../models/conversationModel');
const { generateReply } = require('../services/aiService');

exports.chatReply = async (req, res) => {
  try {
    const { conversationId, contactId, message } =
      req.body;

    // 1. Save human message
    const humanMessage =
      await Message.create({
        conversation: conversationId,
        contact: contactId,
        direction: 'inbound',
        type: 'human',
        body: message
      });

    // 2. Generate AI reply
    const aiReply =
      await generateReply(message);

    // 3. Save AI message
    const aiMessage =
      await Message.create({
        conversation: conversationId,
        contact: contactId,
        direction: 'outbound',
        type: 'ai',
        body: aiReply,
        status: 'sent'
      });

    // 4. Update conversation
    await Conversation.findByIdAndUpdate(
      conversationId,
      {
        lastMessage: aiReply,
        lastMessageAt: new Date()
      }
    );

    // 5. Return response
    res.status(200).json({
      success: true,
      humanMessage,
      aiMessage,
      reply: aiReply
    });
  } catch (err) {
    console.error(err);

    res.status(500).json({
      success: false,
      error: err.message
    });
  }
};