const path = require('path');
const express = require('express');
const { Nuxt } = require('nuxt');
const app = express();

// Import and Set Nuxt.js options
const config = require('../nuxt.config.js');
config.dev = process.env.NODE_ENV !== 'production';

const start = () => {
    // Init Nuxt.js
    const nuxt = new Nuxt(config);
    const { host, port } = nuxt.options.server;

    // Serve the app
    app.use(express.static(path.join(__dirname, '..', 'dist')));

    // Catch-all
    app.get('*', (req, res) => res.sendFile(path.join(__dirname, '..', 'dist', '404.html')));

    // Listen
    app.listen(port, host);
    console.log(`Server listening on http://${host}:${port}`);
};

start();
