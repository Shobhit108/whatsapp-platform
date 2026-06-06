const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  conversation: { type: mongoose.Schema.Types.ObjectId, ref: 'Conversation', required: true },
  contact: { type: mongoose.Schema.Types.ObjectId, ref: 'Contact', required: true },
  direction: { type: String, enum: ['inbound', 'outbound'], required: true },
  type: { type: String, enum: ['human', 'ai'], default: 'human' },
  body: { type: String, required: true },
  whatsappMessageId: { type: String, default: '' },
  status: { type: String, enum: ['sent', 'delivered', 'read', 'failed'], default: 'sent' },
}, { timestamps: true });

module.exports = mongoose.model('Message', messageSchema);