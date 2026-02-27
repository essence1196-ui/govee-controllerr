const express = require('express');
const axios = require('axios');
const path = require('path');
const app = express();

// Render uses a dynamic port, this line is required
const PORT = process.env.PORT || 3000;

// Use the API Key you added in Render's Environment Variables
const GOVEE_API_KEY = process.env.GOVEE_API_KEY;

app.use(express.json());

// Serve the dashboard interface
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// The command center for your lights
app.post('/control', async (req, res) => {
    try {
        const { device, model, cmd } = req.body;
        const response = await axios.put('https://developer-api.govee.com/v1/devices/control', {
            device: device,
            model: model,
            cmd: cmd
        }, {
            headers: {
                'Govee-API-Key': GOVEE_API_KEY,
                'Content-Type': 'application/json'
            }
        });
        res.json({ success: true, data: response.data });
    } catch (error) {
        console.error('Govee Error:', error.response ? error.response.data : error.message);
        res.status(500).json({ error: "Failed to control lights" });
    }
});

app.listen(PORT, () => {
    console.log(`Govee Controller Live on Port ${PORT}`);
});
