 const OpenAI = require("openai");

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const generateReply = async (message) => {
  try {
    const response =
      await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "user",
            content: message,
          },
        ],
      });

    return response.choices[0].message.content;
  } catch (error) {
    console.error("OpenAI Error:", error);

    // Quota / free trial over
    if (
      error.status === 429 ||
      error.code === "insufficient_quota"
    ) {
    return "Hello! Thanks for your message. Our AI assistant is temporarily unavailable. Our team will respond soon.";
    }

    // Invalid API key
    if (
      error.status === 401 ||
      error.code === "invalid_api_key"
    ) {
      return "AI service configuration issue.";
    }

    // Generic fallback
    return "AI service is temporarily unavailable.";
  }
};

module.exports = {
  generateReply,
};