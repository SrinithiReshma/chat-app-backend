require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const messagesRouter = require('./routes/messages');

const app = express();
app.use(cors());
app.use(express.json());

// routes
app.use('/api/messages', messagesRouter);

// connect to MongoDB
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
  console.error('Missing MONGO_URI in environment');
  process.exit(1);
}

mongoose
  .connect(MONGO_URI, { })
  .then(() => {
    console.log('MongoDB connected');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err);
  });
