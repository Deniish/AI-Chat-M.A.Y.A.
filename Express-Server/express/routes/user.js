const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Delete user route
router.delete('/deleteUser', async (req, res) => {
  const { username } = req.body;
  if (!username) {
    return res.status(400).json({ error: "Username is required." });
  }

  try {
    const result = await User.findOneAndDelete({ username });
    if (!result) {
      return res.status(404).json({ message: "User not found." });
    }
    console.log(`${username} User deleted successfully.`);
    return res.status(200).json({ message: "User deleted successfully." });
  } catch (error) {
    console.error("Error deleting user:", error);
    return res.status(500).json({ error: "Internal server error." });
  }
});

// Reset history route
router.post('/resetHistory', async (req, res) => {
  const { username } = req.body;
  try {
    await User.updateOne({ username }, { $set: { history: [] } });
    res.status(200).json({ message: "Chat history reset successfully." });
  } catch (error) {
    console.error("Error resetting chat history:", error);
    res.status(500).json({ error: "Failed to reset chat history." });
  }
});

module.exports = router;
