const express = require('express');
const router = express.Router();
const Message = require('../models/Message');

// GET all messages
router.get('/', async (req, res) => {
  try {
    const messages = await Message.find().sort({ createdAt: -1 });
    res.json(messages);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST create message
router.post('/', async (req, res) => {
  try {
    const { name, text } = req.body;
    if (!name || !text) return res.status(400).json({ error: 'name and text required' });
    const message = new Message({ name, text });
    await message.save();
    res.status(201).json(message);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PUT update message
router.put('/:id', async (req, res) => {
  try {
    const { name, text } = req.body;
    const message = await Message.findByIdAndUpdate(
      req.params.id,
      { name, text },
      { new: true, runValidators: true }
    );
    if (!message) return res.status(404).json({ error: 'Message not found' });
    res.json(message);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE message
router.delete('/:id', async (req, res) => {
  try {
    const message = await Message.findByIdAndDelete(req.params.id);
    if (!message) return res.status(404).json({ error: 'Message not found' });
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
