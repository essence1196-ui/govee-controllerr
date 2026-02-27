const express = require('express');
const axios = require('axios');
const path = require('path');
const app = express();

const PORT = process.env.PORT || 3000;
const GOVEE_API_KEY = process.env.GOVEE_API_KEY;

app.use(express.json());

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.post('/control', async (req, res) => {
    try {
        const { cmd } = req.body;
        // YOUR ACTUAL DESK LIGHT DATA
        const device = "18:C4:35:33:30:36:94:FF"; 
        const model = "H61C5";

        await axios.put('https://developer-api.govee.com/v1/devices/control', {
            device: device,
            model: model,
            cmd: cmd
        }, {
            headers: {
                'Govee-API-Key': GOVEE_API_KEY,
                'Content-Type': 'application/json'
            }
        });
        res.json({ success: true });
    } catch (error) {
        console.error("Govee Error:", error.response ? error.response.data : error.message);
        res.status(500).json({ error: "Govee Sync Error" });
    }
});

app.listen(PORT, () => {
    console.log(`Desk Controller active on port ${PORT}`);
});
