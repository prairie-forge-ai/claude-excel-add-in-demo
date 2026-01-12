const express = require('express');
const https = require('https');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;

// Serve static files
app.use(express.static(__dirname));

// CORS headers for Office Add-ins
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'taskpane.html'));
});

// For local development, we'll use HTTP (Office Add-ins require HTTPS in production)
// In production, you'd use proper SSL certificates
app.listen(PORT, () => {
    console.log(`✅ Excel Claude Add-in server running at http://localhost:${PORT}`);
    console.log('');
    console.log('📋 Next steps:');
    console.log('1. Open Excel');
    console.log('2. Go to Insert > Get Add-ins > Upload My Add-in');
    console.log('3. Browse to manifest.xml in this folder');
    console.log('4. Click Upload');
    console.log('');
    console.log('💡 Get your Anthropic API key from: https://console.anthropic.com');
});
