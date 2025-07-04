const express = require('express');
const path = require('path');
const app = express();
require('dotenv').config();

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'build')));

// Proxy API requests to Laravel backend
const { createProxyMiddleware } = require('http-proxy-middleware');
const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:8000';
app.use('/api', createProxyMiddleware({
  target: apiUrl,
  changeOrigin: true,
}));

// All other requests return the React app
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}); 