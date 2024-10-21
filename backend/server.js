const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const https = require('https');
const app = express();
const PORT = 3000;
const dns = '' // Your client domain

// Use CORS middleware
app.use(cors({
  origin: `https://${dns}`, 
  methods: 'POST',
  allowedHeaders: 'Content-Type'
}));

// Middleware to parse JSON bodies
app.use(express.json());

app.post('/saveSurveyData', (req, res) => {
  const newData = req.body; // New data to append

  // Read existing data from file
  fs.readFile(path.join(__dirname, 'survey_data.json'), 'utf8', (err, existingData) => {
    if (err) {
      // If file doesn't exist or other read error, treat it as an empty array
      existingData = '[]';
    }

    try {
      // Parse existing data from JSON
      const parsedData = JSON.parse(existingData);

      // Append new data to existing data
      parsedData.push(newData);

      // Write back to file
      fs.writeFile(path.join(__dirname, 'survey_data.json'), JSON.stringify(parsedData, null, 2), (err) => {
        if (err) {
          console.error('Error appending data:', err);
          res.status(500).send('Failed to save data');
        } else {
          res.send('Data appended successfully');
        }
      });
    } catch (error) {
      console.error('Error parsing JSON:', error);
      res.status(500).send('Failed to parse existing data');
    }
  });
});

// Load HTTPS certificate and key
const options = {
  key: fs.readFileSync(`/etc/letsencrypt/live/${dns}/privkey.pem`),
  cert: fs.readFileSync(`/etc/letsencrypt/live/${dns}/fullchain.pem`)
};

// Create HTTPS server
https.createServer(options, app).listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
