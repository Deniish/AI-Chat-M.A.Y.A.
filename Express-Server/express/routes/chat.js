const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { model, sessions } = require('../config/ai');

// AI Chatbot route
router.post('/chat', async (req, res) => {
  try {
    const { username, message, sessionId } = req.body;

    let chat = sessions.get(sessionId);
    if (!chat) {
      chat = model.startChat({ history: [] });
      sessions.set(sessionId, chat);
    }

    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).send('User not found');
    }

    let result = await chat.sendMessage(message);

    const userMessage = { type: 'user', content: message, timestamp: new Date() };
    const aiMessage = { type: 'ai', content: result.response.text(), timestamp: new Date() };

    user.history.push(userMessage, aiMessage);
    await user.save();

    res.json({ message: aiMessage.content });
  } catch (error) {
    console.error('Error processing chat request:', error);
    res.status(500).json({ error: 'Error processing chat request' });
  }
});

module.exports = router;
