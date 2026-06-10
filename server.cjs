const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 5000;

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ 
    status: 'ok',
    message: 'Verdora Server is running'
  });
});

app.listen(PORT, () => {
  console.log(`✅ Verdora Server running on http://localhost:${PORT}`);
});
