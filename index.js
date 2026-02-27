const express = require('express');
const app = express();

app.use(express.json());
app.use(express.static('public'));

const GOVEE_API_KEY = process.env.GOVEE_API_KEY;
const GOVEE_URL = 'https://developer-api.govee.com/v1/devices/control';

app.post('/api/control', async (req, res) => {
    const { mac, model, command, value } = req.body;
    try {
        const response = await fetch(GOVEE_URL, {
            method: 'PUT',
            headers: {
                'Govee-API-Key': GOVEE_API_KEY,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ device: mac, model: model, cmd: { name: command, value: value } })
        });
        const data = await response.json();
        console.log("Command sent to light! Response:", data);
        res.json(data);
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ error: 'Failed' });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
