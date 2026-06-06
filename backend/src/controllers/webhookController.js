const Contact = require("../models/Contact");
const Conversation = require("../models/conversationModel");
const Message = require("../models/Message");

const axios = require("axios");
const { generateReply } = require("../services/aiService");

// Verify webhook
exports.verifyWebhook = (req, res) => {
  const VERIFY_TOKEN = process.env.WEBHOOK_VERIFY_TOKEN;

  const mode = req.query["hub.mode"];
  const token = req.query["hub.verify_token"];
  const challenge = req.query["hub.challenge"];

  if (mode === "subscribe" && token === VERIFY_TOKEN) {
    console.log("Webhook verified");
    return res.status(200).send(challenge);
  }

  res.sendStatus(403);
};

// Receive webhook
exports.receiveWebhook = async (req, res) => {
  try {
    console.log("============= WEBHOOK HIT =============");
    console.log(JSON.stringify(req.body, null, 2));

    const body = req.body;

    const message = body?.entry?.[0]?.changes?.[0]?.value?.messages?.[0];

    // Ignore non-message events
    if (!message) {
      console.log("No incoming message found");
      return res.sendStatus(200);
    }

    const phone = message.from;
    const text = message?.text?.body || "Unsupported message";

    console.log("Incoming:", text);

    // Find or create contact
    let contact = await Contact.findOne({ phone });

    if (!contact) {
      contact = await Contact.create({
        name: phone,
        phone,
      });
    }

    // Find or create conversation
    let conversation = await Conversation.findOne({
      contact: contact._id,
    });

    if (!conversation) {
      conversation = await Conversation.create({
        contact: contact._id,
        lastMessage: text,
        lastMessageAt: new Date(),
      });
    }

    // Save incoming message
    await Message.create({
      conversation: conversation._id,
      contact: contact._id,
      direction: "inbound",
      type: "human",
      body: text,
    });

    // Temporary AI reply (for demo)
    const aiReply = await generateReply(text);

    console.log("AI Reply:", aiReply);

    console.log("AI Reply:", aiReply);

    // Save outgoing message
    await Message.create({
      conversation: conversation._id,
      contact: contact._id,
      direction: "outbound",
      type: "ai",
      body: aiReply,
    });

    // Update conversation
    conversation.lastMessage = aiReply;
    conversation.lastMessageAt = new Date();

    await conversation.save();

    // Send WhatsApp message
    try {
      await axios.post(
        `https://graph.facebook.com/v25.0/${process.env.PHONE_NUMBER_ID}/messages`,
        {
          messaging_product: "whatsapp",
          to: phone,
          text: {
            body: aiReply,
          },
        },
        {
          headers: {
            Authorization: `Bearer ${process.env.WHATSAPP_ACCESS_TOKEN}`,
            "Content-Type": "application/json",
          },
        },
      );

      console.log("Message sent to WhatsApp");
    } catch (err) {
      console.log("WhatsApp Send Failed:", err.response?.data || err.message);
    }

    res.sendStatus(200);
  } catch (error) {
    console.error("Webhook Error:", error);
    res.sendStatus(500);
  }
};
