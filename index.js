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
        // Desk Light ID Only
        const device = "9C:80:C1:5E:2F:88:42:F7:A0:78:26:A8:F1:0E:23:95";
        const model = "H6061";

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
        res.status(500).json({ error: "Govee Sync Error" });
    }
});

app.listen(PORT, () => {
    console.log(`Desk Controller active on port ${PORT}`);
});
