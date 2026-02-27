const express = require('express');
const axios = require('axios');
const path = require('path');
const app = express();

// Use Render's assigned port OR 3000 for local testing
const PORT = process.env.PORT || 3000;

// Use the API Key from Render Environment Variables
const GOVEE_API_KEY = process.env.GOVEE_API_KEY;

app.use(express.json());
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Govee API logic goes here...

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
